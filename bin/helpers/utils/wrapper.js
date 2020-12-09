/* eslint-disable no-unreachable */
const moment = require('moment')

const dateNow = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss')
}

const response = (status, code, msg, result) => {
    return {
        status: status,
        result: {
            resultCode: code,
            resultDesc: msg,
            url: result,
            timeStamp: dateNow()
        }
    }
}

const responseCode = (code, value, message = '') => {
    switch (code) {
        case 0:
            return response(200, '00', 'Success', value ? value : true)
            break;
        case 400:
            return response(400, 400, 'Bad Request', value ? value : false)
            break;
        case 401:
            return response(401, 401, 'UnauthorizedError', value ? value : false)
            break;
        case 503:
            return response(503, 503, 'Service Unavailable', value ? value : false)
            break;
        case 'MI-001':
            return response(200, 'MI-001', `"partnerTrxId" was registered`, false)
            break;
        case 'MI-002':
            return response(200, 'MI-002', `Transaction not found`, false)
            break;
        case 'MI-003':
            return response(200, 'MI-003', `There was a disturbance in Pasar Polis`, false)
            break;
        case 'MI-004':
            return response(200, 'MI-004', `Not able to process the request`, value)
            break;
        case 'MI-005':
            return response(200, 'MI-005', `Insurance was registered`, value)
            break;
        case 'BP-003':
            return response(200, 'BP-003', `Status nomor tagihan yang anda masukkan telah terbayar.`, value)
            break;
        case 'MI-006':
            return response(200, 'MI-006', value, false)
            break;
        case '500-1':
            return response(500, 500, message, value ? value : false)
        default:
            return response(500, 500, 'Internal Server Error!', value ? value : false)
    }
}

const data = (code, msg, value) => {
    return response(200, code, msg, value)
}

const responseAirAsia = (status, msg) => {
    return {
        status: status,
        err: false,
        data: msg,
        timeStamp: dateNow()
    }
}

module.exports = {
    responseCode,
    data,
    responseAirAsia,
    
}