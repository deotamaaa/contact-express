# USER API SPEC

## Register User API

Endpoint: POST /api/users

Request Body:

```json
{
  "name": "string",
  "username": "string",
  "password": "string",
  "email": "string"
}
```

Response Body Success:

```json
{
  "data": {
    "id": "string",
    "name": "string",
    "username": "string",
    "email": "string",
    "created_at": "string",
    "updated_at": "string"
  }
}
```

Response Body Error:

```json
{
  "error": {
    "message": "Username already registered"
  }
}
```

## - Login User API -

Endpoint: POST /api/users/login

Request Body:

```json
{
  "username": "johnDoe",
  "password": "password"
}
```

Response Body Success:

```json
{
  "data": {
    "token": "uniqe-token"
  }
}
```

Response Body Error:

```json
{
  "error": {
    "message": "Username or password is incorrect"
  }
}
```

## - Update User API -

Endpoint: PATCH /api/users/current

Headers:

- Authorization: token

Request Body:

```json
{
  "name": "johnDoeNew", // optional
  "password": "newpassword" // optional
}
```

Response Body Success:

```json
{
  "data": {
    "name": "johnDoeNew", // optional
    "password": "newpassword" // optional
  }
}
```

Response Body Failed:

```json
{
  "error": "error message".
}
```

## - GET User API -

Headers:

- Authorization: token

Response Body Success:

```json
{
  "data": {
    "id": "string",
    "username": "string",
    "name": "string"
  }
}
```

Response Body Error:

```json
{
  "error": "error message"
}
```

## - Logout User API -

Endpoint: DELETE /api/users/logout

Headers:

- Authorization: token

Response Body Success:

```json
{
  "data": "You have been logout"
}
```

Response Body Error:

```json
{
  "error": "Unauthorized"
}
```
