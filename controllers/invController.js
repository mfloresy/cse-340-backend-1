const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  console.log("req.params: ", req.params)
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  console.log("classification_id: ", req.params)

  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.buildAddingClassificationForm = async function (req, res, next) {
  let nav = await utilities.getNav()
  let form = await utilities.getAddingClassificationForm()
  req.flash("notice", "Name cannot contain a space or special characters.")
  res.render("./inventory/addclassification", {
    title: "Add Classification",
    nav,
    form,
  })
}

invCont.buildAddingCarForm = async function (req, res, next) {
  let nav = await utilities.getNav()
  let form = await utilities.getAddingCarForm()
  const dropDown = await utilities.buildClassificationList()
  res.render("./inventory/addinventory", {
    title: "Add Inventory",
    nav,
    form,
    dropDown,
  })
}

invCont.buildSuccessConfirmationClassif = async function (req, res) {
  console.log("req.boby: ", req.body)
  const response = await invModel.registerClassification(req.body.classification_name)
  let nav = await utilities.getNav()
  res.render("./inventory/successclassification", {
    title: "Classification Successfully recorded",
    nav
  })
}

invCont.buildSuccessConfirmationcar = async function (req, res) {
  console.log("req.boby: ", req.body)
  const {
    inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color, 
    classification_id
  } = req.body
  const response = await invModel.registerCar(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
  let nav = await utilities.getNav()
  res.render("./inventory/successcar", {
    title: "Inventory Successfully recorded",
    nav
  })
}

/* ***************************
 *  Build vehicle by classification view
 * ************************** */
invCont.buildByVehicleId = async function (req, res, next) {
  console.log("req.params for vehicle id: ", req.params)
  const inventoryId = req.params.inventoryId
  const data = await invModel.getVehicleByInventoryId(inventoryId)

  const grid = await utilities.buildVehicleGrid(data[0])
  let nav = await utilities.getNav()
  res.render("./inventory/vehicle", {
    title: `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`,
    nav,
    grid,
  })
}


invCont.buildAddClassificationsAndCars = async function (req, res, next) {
  let nav = await utilities.getNav()
  let links = await utilities.getClassifAndCarLinks()
  res.render("./inventory/management", {
    title: `Management Site`,
    nav,
    links
  })
}

module.exports = invCont
