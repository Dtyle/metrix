const CustomerRepository = require("../../repository/customer.repo");

exports.deleteCustomer = async (req, res) => {
    try {
        const response = await CustomerRepository.deleteCustomer(req.params.id, req.models.Customer);
        if (!response) {
            return res.status(404).send({ message: "Customer not found." });
        }
        res.status(200).send({ message: "Customer deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error deleting customer." });
    }
};
