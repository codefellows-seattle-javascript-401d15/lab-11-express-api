## Lab 11: Express API

## About This Project

* Build an HTTP server utilizing the Express NodeJS module.
* Create an Object constructor used to produce instances of a resource.
* Create a Router constructor to manage GET, POST, PUT and DELETE requests to the server.
* Implement file system (FS) persistence

## Project Dependencies

* npm install -S bluebird
* npm install -S body-parser
* npm install -S chai
* npm install -S chai-http
* npm install -S eslint
* npm install -S express
* npm install -S morgan
* npm install -S uuid

## Developer Dependencies

* npm install -D mocha

## Making Requests

* Example GET request
  * In terminal (assuming httPie installed): http get :3000/api/note/someUuid
  * Expected output:
    {
      "date": "April 30",
      "id": "someUuid",
      "name": "ToDo"
    }
  * Expected status code: 200

* Example POST request
  * In terminal (assuming httPie installed): http post :3000/api/note name="Groceries" date="April 20"
  * Expected output:
    {
      "date": "April 20",
      "id": "someUuid",
      "name": "Groceries"
    }
  * Expected status code: 200

* Example PUT request
  * In terminal (assuming httPie installed): http put :3000/api/note/someUuid name="newName" date="newDate"
  * Expected output:
    {
      "date": "newDate",
      "id": "someUuid",
      "name": "newName"
    }
  * Expected status code: 200


* Example DELETE request
  * In terminal (assuming httPie installed): http delete :3000/api/note/someUuid
  * Expected output: none
  * Expected status code: 200


## Biggest Roadblocks

* The PUT method in storage.js!
