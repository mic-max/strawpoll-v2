// http://localhost:9001/5d91d1dc15b1674720953001/r
// eslint-disable-next-line no-unused-vars, no-undef
get_id_from_url = () => {
	return location.href.split('/')[3]
}

// eslint-disable-next-line no-unused-vars, no-undef
get_first_as_int = (str) => parseInt(str.split(' ')[0])

// eslint-disable-next-line no-unused-vars, no-undef
percent_as_str = (x, total) => {
	let percent = (x / total * 100)

	return total === 0
		? '00.00'
		: (percent < 10 ? '0' : '') + percent.toFixed(2)
}
