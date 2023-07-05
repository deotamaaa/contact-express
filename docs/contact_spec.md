# CONTACT API Spec

## - Create Contact API -

Endpoint: POST /api/contacts

Headers:

- Authorization: token

Request Body:

```json
{
  "first_name": "John",
  "last_Name": "Doe",
  "email": "johndoe@email.com",
  "phone": "1234567890"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "first_name": "John",
    "last_Name": "Doe",
    "email": "johndoe@email.com",
    "phone": "1234567890"
  }
}
```

Response Body Error:

```json
{
  "error": {
    "message": "Email already registered"
  }
}
```

## - UPDATE Contact API -

Endpoint: PUT /api/contacts/:id

Headers:

- Authorization: token

Request Body:

```json
{
  "first_name": "John",
  "last_Name": "Doe",
  "email": "johndoe@email.com",
  "phone": "1234567890"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "first_name": "John",
    "last_Name": "Doe",
    "email": "johndoe@email.com",
    "phone": "1234567890"
  }
}
```

Response Body Error:

```json
{
  "error": {
    "message": "Email already registered"
  }
}
```

## - GET Contact by id API -

Endpoint: GET /api/contacts/:id

Headers:

- Authorization: token

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "first_name": "John",
    "last_Name": "Doe",
    "email": "johndoe@email.com",
    "phone": "1234567890"
  }
}
```

Response Body Error:

```json
{
  "error": {
    "message": "Contact not found"
  }
}
```

## - Search Contact API -

Endpoint: GET /api/contacts

Headers:

- Authorization: token

Query params:

- name: Search by first_name or last_Name // optional
- email: Search by email // optional
- phone: Search by phone // optional
- page: page number, default 1
- size: size per Page, default 10

Response Body Success:

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "John",
      "last_Name": "Doe",
      "email": "johndoe@email.com",
      "phone": "1234567890"
    },
    {
      "id": 2,
      "first_name": "John",
      "last_Name": "Doe",
      "email": "johndoe@email.com",
      "phone": "1234567890"
    }
  ]
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30,
  }
}
```

Response Body Error:

## - DELETE Contact API -

Endpoint: DELETE /api/contacts/:id

Headers:

- Authorization: token

Response Body Success:

```json
{
  "data": "Contact has been deleted"
}
```

Response Body Error:

```json
{
  "data": "Contact not found"
}
```
