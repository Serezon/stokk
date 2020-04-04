# Stokk

Made for Wetelo React courses


## Setup

Copy .env.example to .env, then execute these commands one by one(You need to have @adonisjs/cli installed):

```bash

npm i
adonis migration:run

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
