const CustomerRepository = require("../../repository/customer.repo");

exports.updateCustomer = async (req, res) => {
    try {
        const response = await CustomerRepository.updateCustomer(req.params.id, req.body, req.models.Customer);
        if (!response[0]) {
            return res.status(404).send({ message: "Customer not found or no update made." });
        }
        res.status(200).send({ message: "Customer updated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating customer." });
    }
};
