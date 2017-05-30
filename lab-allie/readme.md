## Single-Resource API

The purpose of this project is to create a custom API using REST methods: POST, GET, PUT, and DELETE. Rather than implementing promises (as in lab 8), this lab uses Bluebird to promisify file system (fs) read and write methods.


#### Command Line Interface
The lab uses the following commands in the terminal command line for these methods.

To POST a new musical album:

`http POST :3000/api/album artist=billy+joel title=piano+man year=1984`

To GET an existing musical album:

`http GET :3000/api/album/ac977e02-7b36-4bb6-a200-64335716d8a5`

To PUT (update) an existing musical album:

`http PUT :3000/api/album artist=billy+joel title=piano+man year=1986`

To DELETE an existing musical album:

`http DELETE :3000/api/album/ac977e02-7b36-4bb6-a200-64335716d8a5`


### Developer Dependencies: 
* Chai
* Chai-HTTP
* Debug
* Mocha
* Bluebird
* UUID (used to randomly generate a unique ID number for each entry)
