### Weapon Maker API
This API generates a weapon for you.

### Directions for use
1. In terminal, run
```
nodemon server.js
```

2. After nodemon is running, use the following commands for POST, GET, DELETE and PUT

3. http POST localhost:3000/api/weapon name="<name>" type="<type>"   
```
http POST localhost:3000/api/weapon name="new name" type="new_type"
```

4. http GET localhost:3000/api/weapon?id=(id)
```
http GET localhost:3000/api/weapon?id=121231313123123
```

5. http DELETE localhost:3000/api/weapon?id=(id)
```
http DELETE localhost:3000/api/weapon?id=121231313123123  
```

6. http PUT localhost:3000/api/weapon?id=(id) name="<name>" type="<type>"

```
http PUT localhost:3000/api/weapon?id=121231313123123 name="new name" type="new_type"
```
