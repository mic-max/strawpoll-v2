const http = require('http')
const path = require('path')

const express = require('express')
const WebSocket = require('ws')
const mongoose = require('mongoose')

const debug = require('debug')('strawpoll:app')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const favicon = require('serve-favicon')

const index = require('./routes/index')
// const polls = require('./routes/polls')


// Express Setup
const app = express()

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const port = parseInt(process.env.PORT) || 3000

server.listen(port, () => {
	debug('Server listening @', port)
})

wss.on('connection', (ws) => {
	ws.on('message', (data) => {
		debug('Socket connected:', data)
		ws.poll_id = data
	})
})

wss.broadcast = (id, option) => {
	const data = option
	debug('Broadcast:', id, '<--', data)

	wss.clients.forEach((ws) => {
		if (ws.readyState === WebSocket.OPEN && ws.poll_id === id)
			ws.send(data)
	})
}


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(favicon(path.join(__dirname, 'public', 'img/favicon.png')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)

const Poll = require('./models/Poll')
// TODO: move this router to its own file when I figure out how to access wss
const router = express.Router()

// router.get('/random', (req, res, next) => {
// })

router.get('/:id', (req, res, next) => {
	Poll.findById(req.params.id, {}, {_id: false}).exec()
		.then((data) => res.json(data))
		.catch((err) => next(err))
})

router.post('/', (req, res, next) => {
	const data = {
		question: req.body.question,
		options: req.body.options.map((x, i) => {
			return { id: i, text: x, votes: [] }
		})
	}
	
	Poll.create(data)
		.then((data) => res.json(data._id))
		.catch((err) => next(err))
})	

/* Update a poll */
router.put('/:id', async (req, res, next) => {
	const id = req.params.id
	const option = req.body.option
	
	let poll = await Poll.findById(id)
	
	const ipv4 = req.connection.remoteAddress
	const has_voted = poll.options.reduce((x, y) => x |= y.votes.includes(ipv4), false)
	
	// and not multi vote poll
	if (has_voted) {
		console.log('ipv4 already voted:', ipv4)
		// return res.sendStatus(204)
	}
	
	// $addToSet
	Poll.findOneAndUpdate({_id: id, 'options.id': option}, {
		$push: {'options.$.votes': ipv4} 
	})
		.then(() => {
			wss.broadcast(id, option)
			res.sendStatus(200)
		})
		.catch((err) => next(err))
})

app.use('/polls', router)
		
// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}
	
	app.use('/', index)
	// render the error page
	res.status(err.status || 500)
	console.log('here')
	res.render('error')
})

const IS_PROD = process.env.NODE_ENV === 'PROD'

const {DB_USER, DB_PASS, DB_HOST, DB_NAME} = process.env
let dbString = `mongodb://localhost/${DB_NAME}`
if (IS_PROD)
	dbString = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`

mongoose.Promise = global.Promise
mongoose.connect(dbString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	ssl: IS_PROD
})
	.then(() => debug('MongoDB Connected'))
	.catch((err) => console.error('err:', err))
