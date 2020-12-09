const api = require('../../helpers/api/airAsia');
const wrapper = require('../../helpers/utils/wrapper');

const retrieveBooking = async (params) => {
    try {
        let result;

        const getToken = await api.getToken();

        const paramsGetKey = {
            originCode:params.departure,
            recordLocator:params.bookingNumber,
            lastName:params.lastName,
            id: getToken.id,
            apiKey: getToken.apiKey
        };

        const getKey = await api.getKey(paramsGetKey);
        const getBookingData = await api.getBookingData(getKey);
        const getItineryID = await api.getItineryID(getBookingData);

        if (!getItineryID.ItineryID) {
            return wrapper.responseCode();
        }

        result = {
			pdfUrl: `https://webitinerary.airasia.com/GetWebItinerary/${getItineryID.ItineryID}`,
			date: new Date().toISOString().slice(0, 10)
		}

        return wrapper.responseAirAsia(200, result)
    } catch (error) {
        console.log(error)
        return wrapper.responseCode();
    }
};

module.exports = {
    retrieveBooking
};