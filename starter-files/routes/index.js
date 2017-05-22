const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const { catchErrors, myError } = require('../handlers/errorHandlers')

router.get('/', catchErrors(storeController.getStores))
router.get('/stores', catchErrors(storeController.getStores))

router.get('/add', authController.isLoggedIn, storeController.addStore)
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
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug))

router.get('/tags', catchErrors(storeController.getStoresByTag))
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag))

router.get('/register', userController.registerRender)
router.post('/register', userController.validateRegister, userController.register, authController.login) // validate registration data, register the user and then log them in

router.get('/login', userController.loginRender)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

router.get('/account', authController.isLoggedIn, userController.accountRender)
router.post('/account', catchErrors(userController.updateAccount))
router.post('/account/forgot', catchErrors(authController.forgot))
router.get('/account/reset/:token', catchErrors(authController.reset))
router.post('/account/reset/:token', authController.confirmedPasswords, catchErrors(authController.update))

router.get('/map', storeController.mapPage)

// API
router.get('/api/v1/search', catchErrors(storeController.searchStores))
router.get('/api/v1/stores/near', catchErrors(storeController.mapStores))
router.post('/api/v1/stores/:id/heart', catchErrors(storeController.heartStore))

module.exports = router;
