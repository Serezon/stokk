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

## Posts:

### GET /api/posts

#### Example Params: 
```
{
  "page": 1,
  "limit": 5,
  "orderBy": "id",
  "order": "asc",
  "q": "cool"
}
```


#### Example Response: 
```
{
  "total": 1,
  "perPage": 10,
  "page": 1,
  "lastPage": 1,
  "data": [
    {
      "id": 1,
      "category_id": 2,
      "title": "cool image 33",
      "description": null,
      "image": 1,
      "created_by": 3,
      "created_at": "2020-04-25 20:43:17",
      "updated_at": "2020-04-25 20:57:31",
      "category": {
        "id": 2,
        "title": "space",
        "created_at": "2020-04-12 01:25:05",
        "updated_at": "2020-04-12 01:25:05"
      },
      "img": {
        "id": 1,
        "filename": "DkbWVeYImSEiBqpeCzfuc8sNuHdml5Sl.png",
        "original": "861901.png",
        "size": 2125558,
        "type": "image/png",
        "created_by": 3,
        "created_at": "2020-04-25 20:43:17",
        "updated_at":  "2020-04-25 20:43:17"
      }
    },
  ]
}
```

### GET /api/posts/:id

#### Example Response: 
```
{
  "model": {
      "id": 1,
      "category_id": 2,
      "title": "cool image 33",
      "description": null,
      "image": 1,
      "created_by": 3,
      "created_at": "2020-04-25 20:43:17",
      "updated_at": "2020-04-25 20:57:31",
      "category": {
        "id": 2,
        "title": "space",
        "created_at": "2020-04-12 01:25:05",
        "updated_at": "2020-04-12 01:25:05"
      },
      "img": {
        "id": 1,
        "filename": "DkbWVeYImSEiBqpeCzfuc8sNuHdml5Sl.png",
        "original": "861901.png",
        "size": 2125558,
        "type": "image/png",
        "created_by": 3,
        "created_at": "2020-04-25 20:43:17",
        "updated_at":  "2020-04-25 20:43:17"
      }
    }
}
```

### POST /api/posts

#### Example Input: 
```
{
  "title": "some image 2233",
  "category_id": 2,
  "image": Image
}
```

#### Example Response: 
```
{
  "model": {
      "id": 1,
      "category_id": 2,
      "title": "some image 2233",
      "description": null,
      "image": 1,
      "created_by": 3,
      "created_at": "2020-04-25 20:43:17",
      "updated_at": "2020-04-25 20:57:31",
      "category": {
        "id": 2,
        "title": "space",
        "created_at": "2020-04-12 01:25:05",
        "updated_at": "2020-04-12 01:25:05"
      },
      "img": {
        "id": 1,
        "filename": "DkbWVeYImSEiBqpeCzfuc8sNuHdml5Sl.png",
        "original": "861901.png",
        "size": 2125558,
        "type": "image/png",
        "created_by": 3,
        "created_at": "2020-04-25 20:43:17",
        "updated_at":  "2020-04-25 20:43:17"
      }
    }
}
```

### PUT /api/posts/:id

#### Example Input: 
```
{
  "title": "some image 2",
  "category_id": 2,
  "image": 1
}
```

#### Example Response: 
```
{
  "model": {
      "id": 1,
      "category_id": 2,
      "title": "some image 2",
      "description": null,
      "image": 1,
      "created_by": 3,
      "created_at": "2020-04-25 20:43:17",
      "updated_at": "2020-04-25 20:57:31",
      "category": {
        "id": 2,
        "title": "space",
        "created_at": "2020-04-12 01:25:05",
        "updated_at": "2020-04-12 01:25:05"
      },
      "img": {
        "id": 1,
        "filename": "DkbWVeYImSEiBqpeCzfuc8sNuHdml5Sl.png",
        "original": "861901.png",
        "size": 2125558,
        "type": "image/png",
        "created_by": 3,
        "created_at": "2020-04-25 20:43:17",
        "updated_at":  "2020-04-25 20:43:17"
      }
    }
}
```
### DELETE /api/posts/:id

#### Example Response: 
```
{
  "model": {
      "id": 1,
      "category_id": 2,
      "title": "some image 2",
      "description": null,
      "image": 1,
      "created_by": 3,
      "created_at": "2020-04-25 20:43:17",
      "updated_at": "2020-04-25 20:57:31",
      "category": {
        "id": 2,
        "title": "space",
        "created_at": "2020-04-12 01:25:05",
        "updated_at": "2020-04-12 01:25:05"
      },
      "img": {
        "id": 1,
        "filename": "DkbWVeYImSEiBqpeCzfuc8sNuHdml5Sl.png",
        "original": "861901.png",
        "size": 2125558,
        "type": "image/png",
        "created_by": 3,
        "created_at": "2020-04-25 20:43:17",
        "updated_at":  "2020-04-25 20:43:17"
      }
    }
}
```
### DELETE /api/posts

#### Example Params: 
```
{
  "ids": [8]
}
```
#### Example Response: 
```
{
  "data": [
    {
      "id": 8,
      "category_id": 2,
      "title": "some image 2",
      "description": null,
      "image": 1,
      "created_by": 3,
      "created_at": "2020-04-25 20:43:17",
      "updated_at": "2020-04-25 20:57:31",
      "category": {
        "id": 2,
        "title": "space",
        "created_at": "2020-04-12 01:25:05",
        "updated_at": "2020-04-12 01:25:05"
      },
      "img": {
        "id": 1,
        "filename": "DkbWVeYImSEiBqpeCzfuc8sNuHdml5Sl.png",
        "original": "861901.png",
        "size": 2125558,
        "type": "image/png",
        "created_by": 3,
        "created_at": "2020-04-25 20:43:17",
        "updated_at":  "2020-04-25 20:43:17"
      }
    }
  ]
}
```


