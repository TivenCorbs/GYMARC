**Clone the Repository:**
```sh
git clone <https://github.com/TivenCorbs/GYMARC.git>
cd my-web-application
```

Endpoint: /products
Method: POST
Description: Creates a new product.
Request Body:
{
"name": "Product Name" (string, required),
"description": "Product description" (string, optional),
"price": 99.99 (number, required)
}
Response Body:
{
"message": "Product created",
"product": { ... } (The newly created product object)
}
Status Codes:
• 201 Created: Product successfully created.
• 400 Bad Request: Invalid or missing data in the request body.
• 500 Internal Server Error: Unexpected error occurred on the server.