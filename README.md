<img width="288" alt="Logo1" src="https://user-images.githubusercontent.com/115069068/234639763-7e2fa9df-27b1-4626-8ce6-f2b6fadf2e5d.png">



Welcome to the Scan & Go Github Repo! 

Here's a link to the Scan & Go Systems web app which is deployed using AWS Amplify: 

https://main.dshngqz5l8v9y.amplifyapp.com

## What's included in the Repository

### C++ code 
The C++ code in this project is written for the functionality of the project's hardware elements, the MKR1010 WiFi Board and the MFRC/RC-522 module. This code is located in the AWS_IoT_WiFi_RFID folder. This code controls WiFi connection, LED functionality, RFID module/cards functionality and connection to AWS IoT Core.

<img width="469" alt="image" src="https://user-images.githubusercontent.com/115069068/236557127-c0b883af-d8bb-422a-a8d3-de6d9f494ba1.png">


### Full Stack web app code
The code for the Next.js full stack web application is in this section. This is where the bulk of the Javascript code is written and where all the CSS code is located. This code covers the backend and frontend for the webapp, this includes authentication, CRUD operations, protecting routes, MySQL database connection and more. This is all accomplished with the use of node.js. The files and folders in the image below are for the next.js web app.

<img width="488" alt="image" src="https://user-images.githubusercontent.com/115069068/236556811-b30a04f6-b668-4216-ab70-33e3795451d1.png">


### Lambda function code
This section holds the JavaScript code used in the AWS Lambda function. The code is a short JavaScript programme which connects to a MySQL database and inserts two fields of information into a database table. the first field being a timestamp generated in the lambda code, and a card ID which is pulled from AWS IoT Core with the aid of lambda triggers. The lambda function also makes use of node.js. This code can be found in the AWS Lambda Programme.

<img width="444" alt="image" src="https://user-images.githubusercontent.com/115069068/236556895-8f07595d-0432-45fc-8948-63d7b642e919.png">


### Scan & Go poster, presentation and report pdf files
The files for the Scan & Go project poster, presentation and report are available to view or download in the ScanGoPdfDocs folder.

<img width="439" alt="image" src="https://user-images.githubusercontent.com/115069068/236557809-853d16a8-3b35-4604-8bf4-249e9c9b757c.png">



