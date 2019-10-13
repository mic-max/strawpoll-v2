let input_count = 4

function last_input() {
	return [...document.querySelectorAll('input')].pop()
}

function add_input() {
	if (input_count >= 8)
		return
	
	last_input().removeEventListener('input', add_input)
	
	const input = document.createElement('input')
	input.setAttribute('type', 'text')
	input.classList.add('class', 'row')
	input.addEventListener('input', add_input)
	document.getElementById('options').appendChild(input)
	input_count++
}

window.onload = () => {
	last_input().addEventListener('input', add_input)
}
