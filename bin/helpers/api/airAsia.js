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

const getKey = (params) => new Promise((resolve, reject) => {
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
			'Content-Type': 'application/json',
			'x-aa-client-id': params.id,
            'x-api-key': params.apiKey
		},
		body: JSON.stringify(payload)
	})
	.then(async response => {
		const result = response.json();
		resolve(result)
	})
	.catch(error => reject(error))
});

const getBookingData = (params) => new Promise((resolve, reject) => {
	const key = params.respStatus.split('?key=')[1]
	fetch('https://p.apiairasia.com/payment/deeplink/api/getbookingdata', {
		method: 'GET',
		headers: {
			'Key': key
		}
	})
	.then(async response => {
		const result = response.json();
		resolve(result)
	})
	.catch(error => reject(error))
});

const getItineryID = (params) => new Promise((resolve, reject) => {
	const payload = {
		dotrezsignature: params.DecodedKey.DotrezSignature,
		usersession: 'cc=en-gb&mcc=IDR&rc=WWWA&ad=&p=&st=null&rsc=0'
	};
	fetch('https://p.apiairasia.com/payment/booking/info', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	})
	.then(async response => {
		const result = response.json();
		resolve(result)
	})
	.catch(error => reject(error))
});

module.exports = {
    getToken,
    getKey,
	getBookingData,
	getItineryID
}