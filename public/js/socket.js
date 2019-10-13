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
		// eslint-disable-next-line no-undef
		span.textContent = `${votes[i]} votes, ${percent_as_str(votes[i], total_votes)} %`
	}

	total.textContent = `${total_votes} total votes`
}

function open() {
	// eslint-disable-next-line no-undef
	const data = get_id_from_url()
	ws.send(data)
}

window.onload = () => {
	ws = new WebSocket(`ws://${location.hostname}:8080`)
	total = document.getElementById('total')
	options = [...document.querySelectorAll('.option')].map(x => {
		return {
			meter: x.childNodes[0],
			span: x.childNodes[1]
		}
	})
	// eslint-disable-next-line no-undef
	votes = options.map(x => get_first_as_int(x.span.textContent))
	// eslint-disable-next-line no-undef
	total_votes = get_first_as_int(total.textContent)

	ws.onmessage = receive
	ws.onopen = open
}
