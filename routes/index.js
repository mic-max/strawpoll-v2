const express = require('express')
const Poll = require('../models/Poll')
const util = require('../public/js/util')
const { version } = require('../package')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
	res.render('index', {version})
})

/* GET poll page. */
router.get('/:id', (req, res) => {
	Poll.findById(req.params.id)
		.then((poll) => res.render('poll', Object.assign(poll, {version})))
		.catch(() => res.sendStatus(404))
})

/* GET poll results page. */
router.get('/:id/r', (req, res) => {
	Poll.findById(req.params.id)
		.then((poll) => res.render('result', Object.assign(poll, util, {version})))
		.catch(() => res.sendStatus(404))
})

module.exports = router
