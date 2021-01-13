function countriesController(countriesSchema) {
  function getMethod(req, res) {
    const query = {};
    countriesSchema.find(query, (errorFindCountries, findCountries) => {
      if (errorFindCountries) {
        return res.send(errorFindCountries);
      }
      return res.json(findCountries);
    });
  }

  function putMethod(req, res) {
    const countryToCreate = req.body;
    const postCallback = (error, created) => (error ? res.send(error) : res.send(created));
    countriesSchema.create(countryToCreate, postCallback);
  }

  return { getMethod, putMethod };
}

module.exports = countriesController;
