const CustomerRepository = require("../../repository/customer.repo");

exports.createCustomer = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }

    const customer = {
        customerName: req.body.customerName,
        date: req.body.date,
        contactNumber: req.body.contactNumber,
        emailId: req.body.emailId,
        address: req.body.address
    };

    try {
        let response = await CustomerRepository.create(customer, req.models.Customer);
        if (!response) {
            return res.status(404).json({ error: 'Cannot create the customer' });
        }
        res.status(201).send({ status: true, message: "Customer Created Successfully!!", data: response });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};




