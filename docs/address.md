# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Request Body :

```json
{
	"street": "Jalan apa",
	"city": "Kota apa",
	"province": "Provinsi apa",
	"country": "Negara apa",
	"postal_code": "Kode Pos"
}
```

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
		"street": "Jalan apa",
		"city": "Kota apa",
		"province": "Provinsi apa",
		"country": "Negara apa",
		"postal_code": "Kode Pos"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Country is required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Request Body :

```json
{
	"street": "Jalan apa",
	"city": "Kota apa",
	"province": "Provinsi apa",
	"country": "Negara apa",
	"postal_code": "Kode Pos"
}
```

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
		"street": "Jalan apa",
		"city": "Kota apa",
		"province": "Provinsi apa",
		"country": "Negara apa",
		"postal_code": "Kode Pos"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Country is required"
}
```

## Get Address API

Endpoint : GET /api/contacts/:contactId/addresses:addressId

Headers :

- Authorization : token

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
		"street": "Jalan apa",
		"city": "Kota apa",
		"province": "Provinsi apa",
		"country": "Negara apa",
		"postal_code": "Kode Pos"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Contact is not found"
}
```

## List Address API

Endpoint : GET /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Response Body (Success) :

```json
{
	"data": [
		{
			"id": 1,
			"street": "Jalan X",
			"city": "Kota X",
			"province": "Provinsi X",
			"country": "Negara X",
			"postal_code": "Kode Pos X"
		},
		{
			"id": 2,
			"street": "Jalan Y",
			"city": "Kota Y",
			"province": "Provinsi Y",
			"country": "Negara Y",
			"postal_code": "Kode Pos Y"
		}
	]
}
```

Response Body (Failed) :

```json
{
	"errors": "Contact is not found"
}
```

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

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
	"errors": "Address is not found"
}
```
