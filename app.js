const http = require('http')
const path = require('path')

const express = require('express')
const WebSocket = require('ws')
const mongoose = require('mongoose')
const logger = require('morgan')
const favicon = require('serve-favicon')

const index = require('./routes/index')
const middleware = require('./middleware')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const IS_DEV = process.env.NODE_ENV === 'DEV'

server.listen(8080, () => {
	console.log('Server listening @', 8080)
})

wss.on('connection', (ws) => {
	ws.on('message', (data) => {
		console.log('Socket connected:', data)
		ws.poll_id = data
	})
})

wss.broadcast = (id, option) => {
	const data = option
	console.log('Broadcast:', id, '<--', data)

	wss.clients.forEach((ws) => {
		if (ws.readyState === WebSocket.OPEN && ws.poll_id === id)
			ws.send(data)
	})
}

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(favicon(path.join(__dirname, 'public', 'img/favicon.png')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)

const Poll = require('./models/Poll')
const router = express.Router()

router.get('/:id', (req, res, next) => {
	Poll.findById(req.params.id, {}, {_id: false})
		.then((data) => res.json(middleware.user_view(data)))
		.catch((err) => next(err))
})

router.post('/', async (req, res, next) => {
	const data = {
		_id: await Poll.countDocuments(),
		question: req.body.question,
		options: req.body.options.map((x, i) => {
			return { id: i, text: x, votes: [] }
		})
	}

	Poll.create(data)
		.then((data) => res.json(data._id))
		.catch((err) => next(err))
})

router.put('/:id', async (req, res, next) => {
	const id = req.params.id
	const option = req.body.option

	let poll = await Poll.findById(id)

	const ip = req.connection.remoteAddress
	const has_voted = poll.options.reduce((x, y) => x |= y.votes.includes(ip), false)

	if (has_voted) {
		console.log('ip already voted:', ip)
		return res.sendStatus(204)
	}

	Poll.findOneAndUpdate({_id: id, 'options.id': option}, {
		$addToSet: {'options.$.votes': ip}
	})
		.then(() => {
			wss.broadcast(id, option)
			res.sendStatus(200)
		})
		.catch((err) => next(err))
})

app.use('/polls', router)

app.use((err, req, res) => {
	res.locals.message = err.message
	res.locals.error = IS_DEV ? err : {}

	app.use('/', index)
	res.status(err.status || 500)
	res.render('error')
})

mongoose.Promise = global.Promise
mongoose.connect(IS_DEV ? 'mongodb://localhost/strawpoll' : 'mongodb://mango:yPThEQLWVkIFd53T6FYfQq05jFK1W1P39sQXxt89p2891FGUGjJhtbwk1EeVFoq1NcZ2qJw92V0AQdNZ5dVLZw==@mango.documents.azure.com:10255/strawpoll?ssl=true&replicaSet=globaldb', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})
	.then(() => console.log('MongoDB Connected'))
	.catch(console.error)
