# vice-code-test
The api.paw file is the more definitive means of testing the API
## Features
- Stores messages on the heap with author
- Provides all messages to users upon request and keeps the connection open in order to broadcast any future messages
- Naive testing of internal classes
- JSON schema for the message object included
- Paw file included to test the API (you should do the GET request in chrome and use Paw or Postman to send off the POST requests)

### API Documentation (fast)
Normally I would create a table breakdown of parameters, types, headers, etc.
#### GET /messages
Messages are returned as individual JSON strings. This request will initially provide you with all of the messages in the system and will keep the connection open for future messages.

##### Example Response
```json
{
	"message": "Hello World",
	"author": "Roy"
}
{
	"message": "Hello World 2",
	"author": "Roy"
}

```
### Posting a message
Messages can be stored by posting the following JSON payload
#### POST /message
##### Example Payload
```json
{
	"message": "Hello World",
	"author": "Roy"
}
```
##### JSON Schema
```json
{
	"$schema": "http://json-schema.org/draft-04/schema#",
	"title": "TextMessage",
	"description": "Text message object for VICE code test",
	"type": "object",
	"properties": {
		"message": {
			"description": "The message content",
			"type": "string"
		},
		"author": {
			"description": "Name of the message author",
			"type": "string"
		}
	},
	"required": ["message", "author"]
}
```
