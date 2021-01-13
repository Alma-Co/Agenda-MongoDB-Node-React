const { Router } = require('express');
const usersController = require('../controllers/usersController');

function usersRouter(usersSchema, addressesSchema, countriesSchema) {
  const router = Router();
  const agenda = usersController(usersSchema, addressesSchema, countriesSchema);

  router.route('/')
    .get(agenda.getMethod)
    .put(agenda.putMethod);

  return router;
}

module.exports = usersRouter;
