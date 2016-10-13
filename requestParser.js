const Parser = function () {
	/**
	 * Simple JSON.parse wrapper to show how to do this
	 * @method parseRequest
	 * @param property {string} The JSON encoded request string to parse
	 * @return data {object} The decoded JSON object
	 */
	Parser.prototype.parseRequest = string => {
		return JSON.parse(string)
	}
}

const parser = module.exports = new Parser()
