# Lab-11 Simple Data Storage using express


## Used for saving the information of a videogame console using the console's name, manufacturer, and release year.

## Data will be saved in a data/consoles directory in a JSON file

### Commands include a
* Post: stores data
* Get: uses the id to retrieve data
* Put: uses the id to update the data being stored
* Delete: removes the data file

### Sample command using httpie

http POST :{PORT}/api/consoles name={name} manufacturer{manufacturer} releaseYear={releaseYear}

***

## Packages used for functionality
* Bluebird
* Body-parser
* FS
* uuid

## Packages used for development
* chai
* chai-http
* mocha
* morgan
