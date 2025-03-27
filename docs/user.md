# User API Spec

## Register User API

Endpoint : POST /api/users/register

Request Body :

```json
{
	"username": "vickymahardyka",
	"password": "rahasia",
	"name": "Vicky Pratama Setia Mahardika"
}
```

Response Body (Success) :

```json
{
	"data": {
		"username": "vickymahardyka",
		"name": "Vicky Pratama Setia Mahardika"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
	"username": "vickymahardyka",
	"password": "rahasia"
}
```

Response Body (Success) :

```json
{
	"data": {
		"token": "unique-token"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Username or password is wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
	"name": "Vicky Edited", // optional
	"password": "rahasia edit" // optional
}
```

Response Body (Success) :

```json
{
	"data": {
		"username": "vickymahardyka",
		"name": "Vicky Edited"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :

- Authorization : token

Response Body (Success) :

```json
{
	"data": {
		"username": "vickymahardyka",
		"name": "Vicky Pratama Setia Mahardika"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

- Authorization : token

Response Body (Success) :

```json
{
	"data": "OK"
}
```

Response Body (Failed) :

```json
{
	"errors": "Unathorized"
}
```
