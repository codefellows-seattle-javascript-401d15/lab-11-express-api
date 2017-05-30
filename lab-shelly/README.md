![cf](https://i.imgur.com/7v5ASc8.png) lab 11 single resource express api
======

# Description
* Created a HTTP Server using `express`
* Create a Object Constructor that creates a cat with 3 properties (name, mood, id)
* Data is saved using the storage module with file system persistence
* Used the `body-parser` express middleware to on `POST` and `PUT` routes

# Installation
* Clone this repo and navigate to the lab-shelly directory
* Download the dependencies
* Run nodemon server in terminal
* Use server endpoints for requests

## Server Endpoints

### `/api/cat`
 * `POST` request
   * Create a resource by specifying the name and mood.
   ```
   HTTP POST :3000/api/cat name="milo" mood="hungry"
   ```
### `/api/cat/id`

 * `GET` request
   * Get a resource by passing an id in the query string
   ```
   HTTP GET :3000/api/cat/12345
   ```
 * `DELETE` request
   * Delete a resource by passing in an id in the query string. It should return 204 status with no content in the body
   ```
   HTTP DELETE :3000/api/cat/12345
   ```
 * `PUT` request
   * Update a resource by passing in a valid id in the query string and specifying the new name and mood.
   ```
   HTTP PUT :3000/api/cat/12345 name="eva" mood="grumpy"

## Tests
* Tests were written to ensure that the endpoints respond as described for each condition below::
 * `GET` - test 404, responds with 'not found' for valid request made with an id that was not found
 * `GET` - test 400, responds with 'bad request' if no id was provided in the request
 * `GET` - test 200, response body like `{<data>}` for a request made with a valid id
 * `PUT` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
 * `PUT` - test 200, response body like  `{<data>}` for a post request with a valid body
 * `POST` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
 * `POST` - test 200, response body like  `{<data>}` for a post request with a valid body
