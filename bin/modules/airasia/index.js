const express = require('express');
const router = express.Router();
const validatePayload = require('../../helpers/schema');
const domain = require('./domain');

router.get('/airAsia', async (req, res) => {
	const validate = validatePayload.validate(req.query, validatePayload.retrieveBooking)
	if (!validate.err) {
		const checkInvoice = await domain.retrieveBooking(req.query)
		res.status(checkInvoice.status).send(checkInvoice)
	} else {
		res.status(400).send(validate.data)
	}
});

module.exports = router;