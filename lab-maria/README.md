#About
Small Node.js App for Codefellows Coding Bootcamp.

Keep *Better* track of your DeathNotes and their Death Gods with this primitive storage express app (only we're actually using the official Express.js dependency) by using the filesystem node module!

##Installation:

1. clone this repository and ``cd`` into it
2. run ``npm i``

## To Use:

1. Start the server using ``npm start`` in one terminal
2. In separate terminal, use [HTTPie][https://httpie.org/] to perform the following CRUD operations:

* POST: ``http POST localhost:3000/api/note  owner='Light Yagami' shinigami='Ryuuk' deathCount='Over 90000'``
  ⋅⋅⋅ When making a POST request, you should get the created DeathNote object as a response where you will find an id has been created for it
  ⋅⋅⋅ In the repo directory, a new directory called 'Data', in that will be another directory named "Note" where json files with the id of your newly created DeathNote are stored.
* GET: ``http GET localhost:3000/api/note?id=id ``
  ⋅⋅⋅ Again you will get the entire body of the object you've requested
  ⋅⋅⋅ making the same GET request without an ID will return an array of all currently existing DeathNotes
* PUT: ``http PUT localhost:3000/api/note?id=id owner='Misa'``
* DELETE: ``http DELETE localhost:3000/api/note?id=id``
