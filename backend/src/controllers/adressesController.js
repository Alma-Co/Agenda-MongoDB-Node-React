const countriesModel = require('../models/countriesSchema.js');

function adressesController(addressesSchema) {
  function getMethod(req, res) {
    const query = {};
    addressesSchema.find(query)
      .populate({
        path: 'country'
      })
      .exec((errorFindAdresses, findAdresses) => {
        if (errorFindAdresses) {
          return res.send(errorFindAdresses);
        }
        return res.json(findAdresses);
      });
  }


  function putMethod(req, res) {
    const addressToCreate = req.body;
    const postCallback = (error, created) => (error ? res.send(error) : res.send(created));
    addressesSchema.create(addressToCreate, postCallback);
  }

  return { getMethod, putMethod };
}

module.exports = adressesController;
