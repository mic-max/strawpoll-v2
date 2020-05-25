/* eslint no-undef: 0 */

let ws = null
let options = []
let total = null
let votes = []
let total_votes = 0

function receive(event) {
	const data = event.data
	total_votes += 1

	for (let i in options) {
		let {meter, span} = options[i]
		votes[i] += (i === data ? 1 : 0)
		meter.value = (votes[i] / total_votes)
		span.textContent = `${votes[i]} votes, ${percent_as_str(votes[i], total_votes)} %`
	}

	total.textContent = `${total_votes} total votes`
}

function open() {
	const data = get_id_from_url()
	ws.send(data)
}

window.onload = () => {
	ws = new WebSocket(`wss://${location.hostname}:8081`)
	total = document.getElementById('total')
	options = [...document.querySelectorAll('.option')].map(x => {
		return {
			meter: x.childNodes[0],
			span: x.childNodes[1]
		}
	})
	votes = options.map(x => get_first_as_int(x.span.textContent))
	total_votes = get_first_as_int(total.textContent)

	ws.onmessage = receive
	ws.onopen = open
}
