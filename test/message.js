const assert = require('chai').assert
const Message = require('../message.js').TextMessage

describe('Message classes', () => {
	describe('Text message', () => {
		var requestData = {
			'author': 'Roy Hill-Percival',
			'message': 'Hello World'
		}
		// Validating these would be easier if I could use
		// the chai json-schema validator, as I created the
		// message.schema.json file for that purpose
		// but I'm supposed to use the fewest possible libs
		it('Instantiates a message object when given a parsed object', () => {
			let message = new Message(requestData)
			assert.isObject(message)
		})
		it('Sets the correct properties', () => {
			let message = new Message(requestData)
			assert.propertyVal(message, 'author', 'Roy Hill-Percival',
										'message', 'Hello World'
			)
		})
	})
})
