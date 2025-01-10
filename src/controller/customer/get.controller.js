const CustomerRepository = require("../../repository/customer.repo");

exports.getCustomers = async (req, res) => {
    try {
        const customers = await CustomerRepository.getAllCustomers(req.models.Customer);
        res.status(200).send(customers);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error retrieving customers." });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await CustomerRepository.getCustomerById(req.params.id, req.models.Customer);
        if (!customer) {
            return res.status(404).send({ message: "Customer not found." });
        }
        res.status(200).send(customer);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error retrieving customer." });
    }
};