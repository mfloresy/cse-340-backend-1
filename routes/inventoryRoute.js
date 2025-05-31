// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/inv/type/:classificationId", invController.buildByClassificationId);

// Route to build vehicle by inventory id, as well as vehicle id
router.get("/inv/detail/:vehicleId", invController.buildByVehicleId);

module.exports = router;
