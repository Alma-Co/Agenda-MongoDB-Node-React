const addressesSchema = require('../models/adressesSchema');
const countriesSchema = require('../models/countriesSchema.js');
const usersSchema = require('../models/usersSchema.js');

function usersController(usersSchema, adressesSchema, countriesSchema) {
  function getMethod(req, res) {
    const query = {};
    usersSchema.find(query)
      .populate({
        path: 'address',
        populate: {
          path: 'country',
        },
      })
      .exec((errorFindPersons, findPersons) => {
        if (errorFindPersons) {
          return res.send(errorFindPersons);
        }
        return res.json(findPersons);
      });
  }

  function putMethod(req) {
    const { info } = req.body;
    debugger;
    const userInfo = {
      name: info.newName,
      age: info.newAge
    };
    const addressInfo = {
      street: info.newAddress,
      number: info.newNumber,
      city: info.newCity
    };
    const countryInfo = {
      code: info.newCode,
      name: info['country-name'],
    };
    const addressCallback = (errorAddress, newAddress) => {
      userInfo.address = newAddress._id;
      usersSchema.create(userInfo);
    };
    const countryCallback = (errorCountry, newCountry) => {
      addressInfo.country = newCountry._id;
      adressesSchema.create(addressInfo, addressCallback);
    };

    countriesSchema.create(countryInfo, countryCallback);
  }

  return { getMethod, putMethod };
}

module.exports = usersController;
