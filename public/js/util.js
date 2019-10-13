/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

get_id_from_url = () => {
	return location.href.split('/')[3]
}

get_first_as_int = (str) => parseInt(str.split(' ')[0])

percent_as_str = (x, total) => {
	let percent = (x / total * 100)

	return total === 0
		? '00.00'
		: (percent < 10 ? '0' : '') + percent.toFixed(2)
}
