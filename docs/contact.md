# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
	"first_name": "Vicky",
	"last_name": "Pratama",
	"email": "vicky@gmail.com",
	"phone": "0987654321"
}
```

Response Body (Success) :

```json
{
	"data": {
		"first_name": "Vicky",
		"last_name": "Pratama",
		"email": "vicky@gmail.com",
		"phone": "0987654321"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:contactId

Headers :

- Authorization : token

Request Body :

```json
{
	"first_name": "Vicky",
	"last_name": "Pratama",
	"email": "vicky@gmail.com",
	"phone": "0987654321"
}
```

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
		"first_name": "Vicky",
		"last_name": "Pratama",
		"email": "vicky@gmail.com",
		"phone": "0987654321"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Contact is not found"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:contactId

Headers :

- Authorization : token

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
		"first_name": "Vicky",
		"last_name": "Pratama",
		"email": "vicky@gmail.com",
		"phone": "0987654321"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Query Params :

- name : Search by first_name or last_name using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body (Success) :

```json
{
	"data": [
		{
			"id": 1,
			"first_name": "Vicky",
			"last_name": "Pratama",
			"email": "vicky@gmail.com",
			"phone": "0987654321"
		},
		{
			"id": 2,
			"first_name": "Setia",
			"last_name": "Mahardika",
			"email": "setia@gmail.com",
			"phone": "0987654321"
		}
	],
	"paging": {
		"page": 1,
		"total_page": 3,
		"total_item": 30
	}
}
```

Response Body (Failed) :

## Remove Contact API

Endpoint : DELETE /api/contacts/:contactId

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
	"errors": "Contact is not found"
}
```
