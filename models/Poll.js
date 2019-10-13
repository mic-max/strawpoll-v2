const mongoose = require('mongoose')

const PollSchema = mongoose.Schema({
	_id: Number,
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
}, {
	_id: false
})

module.exports = mongoose.model('Poll', PollSchema)
