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


/* ***************************
 *  Build vehicle by classification view
 * ************************** */
invCont.buildByVehicleId = async function (req, res, next) {
  console.log("req.params for vehicle id: ", req.params)
  const inventoryId = req.params.inventoryId
  const data = await invModel.getVehicleByInventoryId(inventoryId)

  const grid = await utilities.buildVehicleGrid(data[0])
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

module.exports = invCont
