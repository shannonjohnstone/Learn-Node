const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController/storeController')
const newStoreController = require('../controllers/storeController')
const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', catchErrors(newStoreController.getStores))
router.get('/stores', newStoreController.getStores)

router.get('/add', storeController.addStore)
router.post('/add',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
)
router.post('/add/:id',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.updateStore)
)

router.get('/stores/:id/edit', catchErrors(storeController.editStore))
router.get('/stores/:slug', catchErrors(storeController.store))

module.exports = router;
