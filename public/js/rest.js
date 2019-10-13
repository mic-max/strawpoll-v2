// eslint-disable-next-line no-unused-vars, no-undef
async function create_poll() {
	const data = {
		question: document.querySelector('.question').value,
		options: [...document.querySelectorAll('.option')].map(x => x.value).filter(x => x)
	}

	if (!data.question && !data.options[0] && !data.options[1]) {
		alert('Requires a question and at least two options.')
		return
	}

	try {
		const res = await fetch(`${location.origin}/polls/`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (!res.ok)
			throw new Error('Network response was not ok.')

		const id = await res.json()
		// alert(`Poll created at: ${location.origin}/${id}`)
		// eslint-disable-next-line require-atomic-updates
		location.href += id
	} catch (error) {
		console.error('Error:', error)
	}
}

// eslint-disable-next-line no-unused-vars
async function vote() {
	const radio = document.querySelector('input[name="option"]:checked')

	if (!radio)
		return

	// eslint-disable-next-line no-undef
	const id = get_id_from_url()
	const data = {
		option: radio.value
	}

	try {
		const res = await fetch(`${location.origin}/polls/${id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (!res.ok)
			throw new Error('Network response was not ok.')

		show_results()
	} catch (error) {
		console.error('Error:', error)
	}
}

// eslint-disable-next-line no-unused-vars
function show_results() {
	location.href += '/r'
}
