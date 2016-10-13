/** Class representing a message */
class Message {
	/**
     * Creates a base message object
	 * We assume that all message types we are going to implement
	 * will have an author
     * @param {string} author - The author of the message
     */
	constructor (author) {
		this.author = author
	}
}

/** Subclass representing a text message */
class TextMessage extends Message {
	/**
     * Creates a posted TextMessage object
	 * @param {object} data Message data
     * @param {string} data.author  The author of the message
	 * @param {string} data.message The text content of the message
     */
	constructor (data) {
		super(data.author)
		this.message = data.message
	}
}

module.exports.Message = Message
module.exports.TextMessage = TextMessage
