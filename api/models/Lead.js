/**
 * Lead.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    phone: {
        type: 'string',
        required: true,
        unique: true
    },
    email: {
        type: 'string',
        required: true
    },
    terms: {
        type: 'string', 
        required: true
    },
    privacy: {
        type: 'string', 
        required: true
    },
    dateRegister: {
        type: 'string',
        required: false
    },
    hourRegister: {
        type: 'string',
        required: false
    }

  },

};

