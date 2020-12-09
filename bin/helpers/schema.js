const Joi = require('joi');
const validateJoi = require('validate.js');
const wrapper = require('./utils/wrapper')

const validate = (param, schema) => {
    const { value, error } = Joi.validate(param, schema)
    if (!validateJoi.isEmpty(error)) {
        return {
            err: true,
            data: wrapper.responseCode(400, { reason: error.details[0].message }).result
        }
    }
    return { err: false, data: value }
};

const retrieveBooking = Joi.object().keys({
    departure: Joi.string().required(),
    bookingNumber: Joi.string().required(),
    lastName: Joi.string().required()
});

module.exports = {
    validate,
    retrieveBooking
}
