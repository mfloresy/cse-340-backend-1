// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/inv/type/:classificationId", invController.buildByClassificationId);

// Route to build vehicle by inventory id, as well as vehicle id
router.get("/inv/detail/:inventoryId", invController.buildByVehicleId);

// Route to the view that allow us to create a classification or car
router.get("/inv", invController.buildAddClassificationsAndCars);

// Route to the form that allow us to add a classification to the database
router.get("/inv/addclassification", invController.buildAddingClassificationForm);

// Route to the form that allow us to add a car to the database
router.get("/inv/addcar", invController.buildAddingCarForm);

// Route to confirmation of process to save a classification
router.post("/inv/successclassification", invController.buildSuccessConfirmationClassif);

// Route to confirmation of process to save an inventory item
router.post("/inv/successcar", invController.buildSuccessConfirmationcar);

module.exports = router;
