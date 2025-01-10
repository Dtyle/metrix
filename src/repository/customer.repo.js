class CustomerRepository {

    async create(customerData, Customer) {
        return await Customer.create(customerData);
    }

    async getAllCustomers(Customer) {
        return await Customer.findAll();
    }

    async getCustomerById(id, Customer) {
        return await Customer.findByPk(id);
    }

    async updateCustomer(id, customerData, Customer) {
        return await Customer.update(customerData, { where: { id: id } });
    }

    async deleteCustomer(id, Customer) {
        return await Customer.destroy({ where: { id: id } });
    }
}

module.exports = new CustomerRepository();
