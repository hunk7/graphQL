Getting ALL Data Sets       
---Query--                 
```
{
  developers {
    id,
    name,
    patchs {
      id,
      name,
      devID
    }
  }
}
```
--Output--
```
{
  "data": {
    "developers": [
      {
        "id": 1,
        "name": "A M Shah",
        "patchs": [
          {
            "id": 1,
            "name": "GraphQLString manipulation",
            "devID": 1
          },
          {
            "id": 2,
            "name": "Show JS Clocks",
            "devID": 1
          },
          {
            "id": 3,
            "name": "FireStore",
            "devID": 1
          },
          {
            "id": 12,
            "name": "Google maps",
            "devID": 1
          }
        ]
      },
      {
        "id": 2,
        "name": "Chan Ling",
        "patchs": [
          {
            "id": 4,
            "name": "Thein Base code",
            "devID": 2
          },
          {
            "id": 5,
            "name": "Tic tac toe game",
            "devID": 2
          },
          {
            "id": 6,
            "name": "Mongodb Schemas",
            "devID": 2
          },
          {
            "id": 7,
            "name": "ixel Arts studio",
            "devID": 2
          },
          {
            "id": 8,
            "name": "Bootsrap lib",
            "devID": 2
          }
        ]
      },
      {
        "id": 3,
        "name": "Adam Eves",
        "patchs": [
          {
            "id": 9,
            "name": "Mongodb hash password",
            "devID": 3
          },
          {
            "id": 10,
            "name": "android studio",
            "devID": 3
          },
          {
            "id": 11,
            "name": "Sass Compiler",
            "devID": 3
          }
        ]
      }
    ]
  }
}
```
Adding Patch to the Dataset          
---Query--                 
```
mutation {
  addpatch(name:"Google maps",devID:1){
    name,
    devID
    
  }
}
```
--Output--       
```
{
  "data": {
    "addpatch": {
      "name": "Google maps",
      "devID": 1
    }
  }
}
```