/*
  AWS IoT WiFi RFID

  This code securely connects to AWS IoT using MQTT over WiFi.
  It uses a private key stored in the ATECC508A and a public
  certificate for SSL/TLS authetication.

  The code will handle WiFi connection to the desired network
  and connection to IoT Core MQTT broker from 
  arduino_secrets.h
  
  This code publishes RFID card data to AWS IoT core, this data will then
  be sent to a aws Lambda function and then stored into a cloud hosted AWS
  relational database.    

  This code signals access granted or access denied based on cards that 
  with green for granted or red for denied LED indication.
  
  This code is influenced by the referenced arduino sample libraries below:
  https://github.com/arduino-libraries/ArduinoECCX08
  https://github.com/miguelbalboa/rfid/tree/master/examples/ReadAndWrite
  https://github.com/arduino/ArduinoCloudProviderExamples/tree/master/examples/AWS%20IoT/AWS_IoT_WiFi

  The circuit:
  - Arduino MKR WiFi 1010
*/

/*
 *Pin layout used:
 * ----------------------------------
 *             MFRC522      Arduino       
 *             Reader/PCD   MKR1010       
 * Signal      Pin          Pin          
 * ----------------------------------
 * RST/Reset   RST          6            
 * SPI SS      SDA(SS)      7            
 * SPI MOSI    MOSI         8
 * SPI MISO    MISO         10 
 * SPI SCK     SCK          9 
 */

#include <SPI.h>      //mfrc522 to mkr1010
#include <MFRC522.h>  //access RFID libraries
#include <WiFiNINA.h> //access wifi libraries
#include <utility/wifi_drv.h> //for colour change on mkr LED
#include <ArduinoBearSSL.h> // encryption
#include <ArduinoECCX08.h> //encryption
#include <ArduinoMqttClient.h> // coonection to mqtt broker
#include "arduino_secrets.h" //WiFi info, CSR key, IoT MQTT Broker

#define RST_PIN   6   // Configurable, see typical pin layout above
#define SS_PIN    7   // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.
MFRC522::MIFARE_Key key;

//Sensitive data in arduino_secrets.h
const char ssid[]        = SECRET_SSID;
const char pass[]        = SECRET_PASS;
const char broker[]      = SECRET_BROKER;
const char* certificate  = SECRET_CERTIFICATE;

WiFiClient    wifiClient;            //Used for the TCP socket connection
BearSSLClient sslClient(wifiClient); //Secure SSL/TLS connection, integrates with ECC508
MqttClient    mqttClient(sslClient); //Mqtt AWS connection


void setup() {
  Serial.begin(115200);
 // while (!Serial);
  SPI.begin();        // Init SPI bus
  mfrc522.PCD_Init(); // Init MFRC522 card reader

  // set all key bytes to 0xFF
  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }
  
  WiFiDrv:: pinMode(25, OUTPUT); //GREEN LED
  WiFiDrv:: pinMode(26, OUTPUT); //RED LED
  WiFiDrv:: pinMode(27, OUTPUT); //BLUE LED

  if (!ECCX08.begin()) {
    Serial.println("No ECCX08 present!");
    while (1);
  }
  // Set a callback to get the current time
  // used to validate the servers certificate
  ArduinoBearSSL.onGetTime(getTime);

  // Set the ECCX08 slot to use for the private key
  // and the accompanying public certificate for it
  sslClient.setEccSlot(0, certificate);
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
  }

  if (!mqttClient.connected()) {
    // MQTT client is disconnected, connect
    connectMQTT();
  }

  // poll for new MQTT messages & send keep alives
  mqttClient.poll();
  mfrc522_rfid();
  getTime();
}

unsigned long getTime() {
  // get the current time from the WiFi module  
  return WiFi.getTime();
}

void connectWiFi() {
  Serial.print("Attempting to connect to SSID: ");
  Serial.print(ssid);
  Serial.print(" ");

  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    Serial.print(".");
    delay(5000);
  }
  Serial.println();
  Serial.println("You're connected to the network");
  Serial.println();
}

void connectMQTT() {
  Serial.print("Connect to MQTT broker: ");
  Serial.print(broker);
  Serial.println(" ");

  //endpoint of aws iot core on port 8883
  while (!mqttClient.connect(broker, 8883)) {   
    Serial.print(".");
    delay(5000);
  }
  Serial.println();
  Serial.println("You're connected to the MQTT broker");
  Serial.println();
}

void publishMessage() {
  Serial.println("Publishing message");

  //Start message to be published to IoT
  //publishCard is message name to connect with AWS IoT
  mqttClient.beginMessage("publishCard");

  // The JSON String sent up to IoT Core which will be sent to AWS Lambda
  mqttClient.print("{\"cardUID\": \"");
  for (byte i = 0; i < mfrc522.uid.size; i++) {  //
    mqttClient.print(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
    mqttClient.print(mfrc522.uid.uidByte[i], HEX);
  }
  mqttClient.print("\"}\n");
  mqttClient.endMessage();
}

void mfrc522_rfid(){
  String content = "";
 
  // Reset the loop If no new card is present.
  if ( ! mfrc522.PICC_IsNewCardPresent())
    return;

  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial())
    return;

  Serial.print("UID Card:");
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
    Serial.print(mfrc522.uid.uidByte[i], HEX);
    content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
    content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }

  Serial.println();
  content.toUpperCase();
  if(content == "A15B8E09" || content == "C7823904" ||
     content == "B7C73904" || content == "1E523904" || content == "FEB63904" ){
    Serial.println("Access Granted");
    Serial.println();
          
    //signal access granted 
    //green LED displaying for 1 second
    WiFiDrv:: analogWrite(25, 0);
    WiFiDrv:: analogWrite(26, 255);
    WiFiDrv:: analogWrite(27, 0);

    delay(1000);

    WiFiDrv:: analogWrite(25, 0);
    WiFiDrv:: analogWrite(26, 0);
    WiFiDrv:: analogWrite(27, 0);

    publishMessage();
  }
    
  else{
    Serial.println("Access Denied");
    Serial.println();

    //signal access denied 
    //red LED displaying for 1 second
    WiFiDrv:: analogWrite(25, 255);
    WiFiDrv:: analogWrite(26, 0);
    WiFiDrv:: analogWrite(27, 0);

    delay(1000);

    WiFiDrv:: analogWrite(25, 0);
    WiFiDrv:: analogWrite(26, 0);
    WiFiDrv:: analogWrite(27, 0);

    publishMessage();
  }

  // Halt PICC
  mfrc522.PICC_HaltA();
  // Stop encryption on PCD
  mfrc522.PCD_StopCrypto1();
}