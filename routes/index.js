const express = require('express')
const Poll = require('../models/Poll')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
	res.render('index')
})

/* GET poll page. */
router.get('/:id', (req, res) => {
	Poll.findById(req.params.id)
		.then((poll) => res.render('poll', poll))
		.catch(() => res.sendStatus(404))
})

/* GET poll results page. */
router.get('/:id/r', (req, res) => {
	Poll.findById(req.params.id)
		.then((poll) => res.render('result', poll))
		.catch(() => res.sendStatus(404))
})

module.exports = router
