# Stokk

Made for Wetelo React courses


## Setup

Copy .env.example to .env, then execute these commands one by one(You need to have @adonisjs/cli installed):

```bash

npm i
adonis migration:run
adonis seed

```


## Start project
Just run ```adonis serve ```

# API:

## Auth:

### POST /api/auth/register

#### Example Input: 
```
{
  "username": "glokxx",
  "password": "SuperPassword12345",
  "first_name": "Gleb",
  "last_name": "Boghenkin",
  "phone": "+380991231478"
}
```


#### Example Response: 
```
{
  "token": {
    "type": "bearer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU4NTkzNzE5OH0.B3MlR8uNnD_pQ7Isi1F4B-KpgQ8n1BVTuYjxNHM22oc",
    "refreshToken": null
  },
  "user": {
    "username":"glokxx",
    "password":"$2a$10$zaNWGeoR0OPmrIpYRl9MxO2FFUOgDmum91kvxxsRiqIKINpDWAauW",
    "first_name": "Gleb",
    "last_name": "Boghenkin",
    "phone": "+380991231478"
    "created_at":"2020-04-03 21:06:38",
    "updated_at":"2020-04-03 21:06:38",
    "id": 1
  }
}
```


### POST /api/auth/login

#### Example Input: 
```
{
  "username": "glokxx",
  "password": "SuperPassword12345"
}
```


#### Example Response: 
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU4NTkzNzE5OH0.B3MlR8uNnD_pQ7Isi1F4B-KpgQ8n1BVTuYjxNHM22oc",
  "user": {
    "username":"glokxx",
    "password":"$2a$10$zaNWGeoR0OPmrIpYRl9MxO2FFUOgDmum91kvxxsRiqIKINpDWAauW",
    "first_name": "Gleb",
    "last_name": "Boghenkin",
    "phone": "+380991231478"
    "created_at":"2020-04-03 21:06:38",
    "updated_at":"2020-04-03 21:06:38",
    "id": 1
  }
}
```

## Categories:

### GET /api/categories

#### Example Params: 
```
{
  "page": 1,
  "limit": 5,
  "orderBy": "id",
  "order": "asc",
  "q": "animals"
}
```


#### Example Response: 
```
{
  "total": 7,
  "perPage": 3,
  "page": 1,
  "lastPage": 3,
  "data": [
    {
      "id":1, 
      "title":"animals",
      "created_at":"2020-04-12 01:25:05",
      "updated_at":"2020-04-12 01:25:05"
    }
  ]
}
```

### GET /api/categories/all

#### Example Params: 
```
{
  "orderBy": "id",
  "order": "asc",
  "q": "animals"
}
```


#### Example Response: 
```
[
  {
    "id":  1,
    "title":  "animals",
    "created_at":  "2020-04-12 01:25:05",
    "updated_at":  "2020-04-12 01:25:05"
    },
]
```

### GET /api/categories/:id

#### Example Response: 
```
{
  "model": {
    "id":  1,
    "title":  "animals",
    "created_at":  "2020-04-12 01:25:05",
    "updated_at":  "2020-04-12 01:25:05"
    },
}
```

### POST /api/categories

#### Example Input: 
```
{
  "title": "cars"
}
```

#### Example Response: 
```
{
  "model": {
    "id":  5,
    "title":  "cars",
    "created_at":  "2020-04-12 01:25:05",
    "updated_at":  "2020-04-12 01:25:05"
    },
}
```

### PUT /api/categories/:id

#### Example Input: 
```
{
  "title": "sky"
}
```

#### Example Response: 
```
{
  "model": {
    "id":  5,
    "title":  "sky",
    "created_at":  "2020-04-12 01:25:05",
    "updated_at":  "2020-04-12 08:25:05"
    },
}
```
### DELETE /api/categories/:id

#### Example Response: 
```
{
  "model": {
    "id":  1,
    "title":  "animals",
    "created_at":  "2020-04-12 01:25:05",
    "updated_at":  "2020-04-12 01:25:05"
    },
}
```
### DELETE /api/categories

#### Example Params: 
```
{
  "ids": [2,3]
}
```
#### Example Response: 
```
{
  "data": [
    {
      "id":  2,
      "title":  "animals",
      "created_at":  "2020-04-12 01:25:05",
      "updated_at":  "2020-04-12 01:25:05"
    },
    {
      "id":  3,
      "title":  "nature",
      "created_at":  "2020-04-12 01:25:05",
      "updated_at":  "2020-04-12 01:25:05"
    }
  ]
}
```

