const authJwt = require("../utils/auth.js");
const customerCreate = require("../controller/customer/create.controller.js");
const customerGet = require("../controller/customer/get.controller.js");
const customerUpdate = require("../controller/customer/update.contoller.js");
const customerDelete = require("../controller/customer/delete.controller.js");

// Customer routes
module.exports = (app) => {
    // Create a new customer
    app.post("/customer", [authJwt.verifyToken], customerCreate.createCustomer);

    // Get all customers
    app.get("/customer", [authJwt.verifyToken], customerGet.getCustomers);

    // Get a single customer by ID
    app.get("/customer/:id", [authJwt.verifyToken], customerGet.getCustomerById);

    // Update a customer by ID
    app.put("/customer/:id", [authJwt.verifyToken], customerUpdate.updateCustomer);

    // Delete a customer by ID
    app.delete("/customer/:id", [authJwt.verifyToken], customerDelete.deleteCustomer);
};
