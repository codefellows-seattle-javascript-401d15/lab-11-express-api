# Patrick Sheridan
## Lab-11-express-api

### Overview
Creates an HTTP server using express middlware. Allows for posting, updating, reading and deleting of new cars from the server.

### How to use

Fire up a server using
```
nodemon server.js
```
in a second terminal window, to post a new car, enter 
```
http POST :3000/api/car name=WRX model=Subaru horsepower=265
```
but replace WRX, Subaru, and 265 to whatever you want your new cars attributes to be

To get a car by id, enter
```
http GET :3000/api/car/0023320c-678c-47f7-9b75-a1a43025e42b
```
where 0023320c-678c-47f7-9b75-a1a43025e42b is the cars Id

To delete by car Id, enter
```
http DELETE :3000/api/car/0023320c-678c-47f7-9b75-a1a43025e42b
```
To update a car by Id, enter
```
http PUT :3000/api/car/0023320c-678c-47f7-9b75-a1a43025e42b name=Civic model=Type-R horsepower=240
```
