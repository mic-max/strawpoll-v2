const mongoose = require('mongoose')

const PollSchema = mongoose.Schema({
	question: String,
	options: [{
		id: Number,
		text: String,
		votes: [String]
	}],
	created: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Poll', PollSchema)