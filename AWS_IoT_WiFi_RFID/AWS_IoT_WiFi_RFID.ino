/*
  AWS IoT WiFi

  This sketch securely connects to AWS IoT using MQTT over WiFi.
  It uses a private key stored in the ATECC508A and a public
  certificate for SSL/TLS authetication.

  It publishes a message every 5 seconds to arduino/outgoing
  topic and subscribes to messages on the arduino/incoming
  topic.

  The circuit:
  - Arduino MKR WiFi 1010 or MKR1000

  The following tutorial on Arduino Project Hub can be used
  to setup your AWS account and the MKR board:

  https://create.arduino.cc/projecthub/132016/securely-connecting-an-arduino-mkr-wifi-1010-to-aws-iot-core-a9f365

  This example code is in the public domain.
*/

/*
 *Typical pin layout used:
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
 *
 */



#include <SPI.h>       //talk to mfrc522 from mkr1010
#include <MFRC522.h>  //access RFID libraries
#include <WiFiNINA.h> //access wifi libraries
#include <utility/wifi_drv.h> //for colour change on mkr LED
#include <ArduinoBearSSL.h>
#include <ArduinoECCX08.h>
#include <ArduinoMqttClient.h>
#include <WiFiNINA.h> // wifi library for mkr1010

#include "arduino_secrets.h"

#define RST_PIN         6          // Configurable, see typical pin layout above
#define SS_PIN          7          // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.

MFRC522::MIFARE_Key key;

/////// Enter your sensitive data in arduino_secrets.h
const char ssid[]        = SECRET_SSID;
const char pass[]        = SECRET_PASS;
const char broker[]      = SECRET_BROKER;
const char* certificate  = SECRET_CERTIFICATE;

WiFiClient    wifiClient;            // Used for the TCP socket connection
BearSSLClient sslClient(wifiClient); // Used for SSL/TLS connection, integrates with ECC508
MqttClient    mqttClient(sslClient); //Mqtt aws connection

unsigned long lastMillis = 0;

void setup() {
  Serial.begin(115200);
 // while (!Serial);
  SPI.begin();        // Init SPI bus
  mfrc522.PCD_Init(); // Init MFRC522 card reader

  // Prepare the key (used both as key A and as key B)
  // using FFFFFFFFFFFFh which is the default at chip delivery from the factory
  for (byte i = 0; i < 6; i++) {
      key.keyByte[i] = 0xFF;
  }

  //Serial.println(F("Scan a MIFARE Classic PICC to demonstrate read and write."));
  //Serial.print(F("Using key (for A and B):"));
  dump_byte_array(key.keyByte, MFRC522::MF_KEY_SIZE);
  Serial.println();

  //Serial.println(F("BEWARE: Data will be written to the PICC, in sector #1"));

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

  // Optional, set the client id used for MQTT,
  // each device that is connected to the broker
  // must have a unique client id. The MQTTClient will generate
  // a client id for you based on the millis() value if not set
  //
  // mqttClient.setId("clientId");

  // Set the message callback, this function is
  // called when the MQTTClient receives a message
  mqttClient.onMessage(onMessageReceived);
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
  }

  if (!mqttClient.connected()) {
    // MQTT client is disconnected, connect
    connectMQTT();
  }

  // poll for new MQTT messages and send keep alives
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
    // failed, retry
    Serial.print(".");
    delay(5000);
  }
  Serial.println();

  Serial.println("You're connected to the network");
  Serial.println();
}

void connectMQTT() {
  Serial.print("Attempting to MQTT broker: ");
  Serial.print(broker);
  Serial.println(" ");

  while (!mqttClient.connect(broker, 8883)) {   //endpoint aws iot core on port 8883
    // failed, retry
    Serial.print(".");
    delay(5000);
  }
  Serial.println();

  Serial.println("You're connected to the MQTT broker");
  Serial.println();

  // subscribe to a topic
  mqttClient.subscribe("arduino/incoming");
}

void publishMessage() {
  Serial.println("Publishing message");

  // send message, the Print interface can be used to set the message contents
  mqttClient.beginMessage("publishCard");

   //mqttClient.print("cardUID:");
   mqttClient.print("{\"cardUID\": \"");
  for (byte i = 0; i < mfrc522.uid.size; i++) {  //
    mqttClient.print(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
    mqttClient.print(mfrc522.uid.uidByte[i], HEX);
  }
  mqttClient.print("\"}\n");
 // mqttClient.print("hello ");
 // mqttClient.print(millis());
 // mqttClient.print(getTime());
  mqttClient.endMessage();

}
    
//}

void onMessageReceived(int messageSize) {
  // we received a message, print out the topic and contents
  Serial.print("Received a message with topic '");
  Serial.print(mqttClient.messageTopic());
  Serial.print("', length ");
  Serial.print(messageSize);
  Serial.println(" bytes:");

  // use the Stream interface to print the contents
  while (mqttClient.available()) {
    Serial.print((char)mqttClient.read());
  }
  Serial.println();
  Serial.println();
}

/**
 * Helper routine to dump a byte array as hex values to Serial.
 */
 //dump array function
void dump_byte_array(byte *buffer, byte bufferSize) {
    for (byte i = 0; i < bufferSize; i++) {
        Serial.print(buffer[i] < 0x10 ? "0" : "");
        Serial.print(buffer[i], HEX);
    }
}

void mfrc522_rfid(){
  String content = "";
  byte letter;
 
    // Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
    if ( ! mfrc522.PICC_IsNewCardPresent())
        return;

    // Select one of the cards
    if ( ! mfrc522.PICC_ReadCardSerial())
        return;

  /*  
    // Show some details of the PICC (that is: the tag/card)
    Serial.print(F("Card UID:"));
    dump_byte_array(mfrc522.uid.uidByte, mfrc522.uid.size);
    Serial.println();
    Serial.print(F("PICC type: "));
    MFRC522::PICC_Type piccType = mfrc522.PICC_GetType(mfrc522.uid.sak);
    Serial.println(mfrc522.PICC_GetTypeName(piccType));

    // Check for compatibility
    if (    piccType != MFRC522::PICC_TYPE_MIFARE_MINI
        &&  piccType != MFRC522::PICC_TYPE_MIFARE_1K
        &&  piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
        Serial.println(F("This sample only works with MIFARE Classic cards."));
        return;
    }
      */
   
    Serial.print("UID Card:");
    for (byte i = 0; i < mfrc522.uid.size; i++) {
      Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
      Serial.print(mfrc522.uid.uidByte[i], HEX);
      content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
      content.concat(String(mfrc522.uid.uidByte[i], HEX));
    }

    Serial.println();
    content.toUpperCase();
    if(content == "A15B8E09" || content == "C7823904" || content == "B7C73904" || content == "1E523904" || content == "FEB63904" ){
      Serial.println("Access Granted");
      Serial.println();
          

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