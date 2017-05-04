READ ME

This is a single resource API which allows you to create different types of ninjas using the Express server.
Using the POST method in a program like Postman, you can create a new instance of a ninja
by assigning it properties of name, clan, and weapons. Make sure the keys and properties are all contained
within quotes.  
Example: {"name": "Frank", "clan": "Foot", "weapons": "Swords"}
After posting, your ninja will be assigned a unique id.  This id can access you ninja by entering /api/ninja?id="yourid".
Using the GET method, you can recall your ninja using the id.
Using the DELETE method, you can delete your ninja's information.
Using PUT, you can overwrite the attributes of your ninja while keeping your unique ID.  Do this following the format of the above example.
