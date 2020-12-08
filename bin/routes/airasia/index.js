const express = require('express');
const router = express.Router();

const api = require('./api')

router.get('/airAsia', async (req, res) => {
	const getToken = await api.getToken()

	const paramsGetKey = {
		originCode: req.query.departure,
		recordLocator: req.query.bookingNumber,
		lastName: req.query.lastName,
		id: getToken.id,
		apiKey: getToken.apiKey
	}

	const getKey = await api.retrieveBooking(paramsGetKey);
	console.log(getKey)
	res.send('waw');
});

module.exports = router;