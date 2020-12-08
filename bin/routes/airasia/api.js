const fetch = require('node-fetch');

const getToken = () => new Promise((resolve, reject) => {
	fetch("https://ssor.airasia.com/config/v2/clients/by-origin", {
		method: 'GET',
		headers: {
			'origin': 'https://www.airasia.com',
			'accept': 'application/json, text/plain, */*'
		}
	})
	.then(async response => {
		const result = response.json();
		resolve(result)
	})
	.catch(error => reject(error))
});

const retrieveBooking = (params) => new Promise((resolve, reject) => {
    const payload = {
        originCode: params.originCode,
        recordLocator: params.recordLocator,
        lastName: params.lastName,
        cultureCode: 'en-GB',
        isLoggedIn: 0,
		device: 0
    };
	fetch('https://ssor.airasia.com/um/v2/bookings/validate-and-link', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'x-aa-client-id': params.id,
            'x-api-key': params.apiKey
		},
		body: payload
	})
	.then(async response => {
		const result = response.json();
		resolve(result)
	})
	.catch(error => reject(error))
});

const getBookingData = (params) => new Promise((resolve, reject) => {
	const key = params.respStatus.split('?key=')[1]
	console.log(key)
	fetch('https://p.apiairasia.com/payment/deeplink/api/getbookingdata', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json, text/plain, */*', 
			'Key': '7fb982c7-399b-11eb-b3bd-cd9f443bd5db1607462559.05'
		}
	})
	.then(async response => {
		console.log(response)
		const result = response.json();
		resolve(result)
	})
	.catch(error => reject(error))
});

module.exports = {
    getToken,
    retrieveBooking,
    getBookingData
}