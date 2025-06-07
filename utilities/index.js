const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul class='main-nav'>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* ************************
 * Constructs the Classification and Car Form Links
 ************************** */
Util.getClassifAndCarLinks = async function (req, res, next) {
  return `
    <div>
    <a href="/inv/addclassification"/>Add Classification</a>
    <a href="/inv/addcar"/>Add Car</a>
    </div>`
}

/* ************************
 * Constructs the Car creation Form
 ************************** */
Util.getAddingCarForm = async function (req, res, next) {
  return `
    <div>
    <h1>Add Car form</h1>
    </div>
    `
}

/* ************************
 * Constructs the Classification creation Form
 ************************** */
Util.getAddingClassificationForm = async function (req, res, next) {
  return `
    <div>
    <h1>Add Classification form</h1>
    </div>
    `
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += "<li class='car-box'>"
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += "<span class='price-value'>$" 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}



/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildVehicleGrid = async function(data){
  console.log("Data near backticks: ", data)
  if (data){
    return `
    <div class='single-car-details'>
    <img src="${data.inv_image}" alt=""/>
    <h3>${data.inv_make} ${data.inv_model} Details</h3>
    <p>Price: ${data.inv_price}</p>
    <p>Description: <span>${data.inv_description}</span></p>
    <p>Color: ${data.inv_color}</p>
    <p>Miles: ${data.inv_miles}</p>
    </div>
    `
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicle could be found.</p>'
  }
  return grid
}

// Build drop-down list
Util.buildClassificationList = async function (classification_id = null) {
    let data = await invModel.getClassifications()
    let classificationList =
      '<select name="classification_id" id="classificationList" required>'
    classificationList += "<option value=''>Choose a Classification</option>"
    data.rows.forEach((row) => {
      classificationList += '<option value="' + row.classification_id + '"'
      if (
        classification_id != null &&
        row.classification_id == classification_id
      ) {
        classificationList += " selected "
      }
      classificationList += ">" + row.classification_name + "</option>"
    })
    classificationList += "</select>"
    return classificationList
  }


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util