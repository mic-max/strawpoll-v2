function user_view(data) {
	return {
		id: data._id,
		question: data.question,
		options: data.options.map(x => {
			return {
				text: x.text,
				votes: x.votes.length,
			}
		})
	}
}

module.exports = {
	user_view
}
