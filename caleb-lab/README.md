## Single Source API

### Goals:

Create a basic single sourced api, that will be able to perform a full cycle of CRUD operations.

________________________________________________
### Setup:

1. Fork or clone the repo
2. Run ```npm i``` in your console. [You can find specific dependencies in the package.json file]
3. Run ```npm start``` to start the local server
  * Refer to your preferred method of running the routes for instructions on inputting each endpoint
4. Run ```npm test``` to check the automated tests
________________________________________________

### Routes:
#### * POST: ```/api/note```
Will create a new note
  * Include a name and details in the body of the request
  * If you're missing the name or details properties, it will respond with a 400

#### * GET: ```/api/note/:id```
Will retrieve a single note
  * Include the auto-generated id in the params

#### * PUT: ```/api/note/:id```
Will update a previously existing note.
  * Include a name and details in the body of the request
  * If you're missing the name, details, or ID properties, it will respond with a 400

#### * DELETE: ```/api/note/:id```
Will delete a single pre-existing note.
  * Include the auto-generated id in the params
  * If you're missing the ID parameter, it will return a 400.
