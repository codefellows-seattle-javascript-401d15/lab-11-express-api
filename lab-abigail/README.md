![cf](https://i.imgur.com/7v5ASc8.png) Lab 07 Cowsay HTTP
======

# About
This program allows users to store information regarding the name, type, and cost of a food item using the file system. The program utilizes REST principles to POST, GET, DELETE, and update entries, given custom user input. This program runs in the user's terminal on `localhost:3000`. Please enjoy!

# Directions
1. First, `npm i` to download all resources onto the local machine.
2. In terminal, run files using `nodemon server`.
3. In a separate terminal tab, enter entries.
  * To run POST, type into command line:
`http POST :3000/api/food name='<food name>' 'type=<item type>' 'cost=<amount>'`
    * Example: `http POST :3000/api/food name='apple' type='red' cost='5'`
  * To run GET, type into command line: `http GET :3000/api/food?id='<id-number>'`
    * Example: `http GET :3000/api/food?id='24b62d24-39ff-4049-a2bc-a05711e7b449'`
  * To run PUT, type into command line: `http PUT :3000/api/food?id=<id-number> name=<updated food name> type=<updates item type> cost=<updates amount>`
    * Example: `http PUT :3000/api/food id='24b62d24-39ff-4049-a2bc-a05711e7b449' cost='6'`
  * Use one, two, or all of update categories
  * To run DELETE, type into command line: `http DELETE :3000/api/food?id=<id-number>`

* Improper requests will render a 'Bad Request' 400 status, or 404 status.
