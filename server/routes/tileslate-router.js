const auth = require('../auth')
const express = require('express')
const UserController = require('../controllers/user-controller')
const MapController = require('../controllers/map-controller')
const MapInfoController = require('../controllers/mapInfo-controller')

const router = express.Router()

router.post('/registerUser', UserController.registerUser)
router.get('/loggedIn', UserController.getLoggedIn)
router.post('/login', UserController.login)
router.get('/logout', UserController.logout)
router.put('/updateUser', UserController.updateUser)

router.post('/registerMap', MapController.registerMap)
router.post('/deleteMap', MapController.deleteMap)
router.post('/updateMap', MapController.updateMap)
router.post('/getMap', MapController.getMap)

router.get('/registerMapInfo', MapInfoController.registerMapInfo)
router.post('/deleteMapInfo', MapInfoController.deleteMapInfo)
router.post('/updateMapInfo', MapInfoController.updateMapInfo)
router.post('/updateMapgetMapInfo', MapInfoController.getMapInfo)
router.post('/getAllMapInfoByUser', MapInfoController.getAllMapInfoByUser)

module.exports = router