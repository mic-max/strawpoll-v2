/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */
/* eslint require-atomic-updates: 0 */

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
		location.href += id
	} catch (error) {
		console.error('Error:', error)
	}
}

async function vote() {
	const radio = document.querySelector('input[name="option"]:checked')

	if (!radio)
		return

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

function show_results() {
	location.href += '/r'
}
