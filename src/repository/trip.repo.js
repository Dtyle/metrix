class TripRepository {
  
    async create(tripData,Trip) {
        return await Trip.create(tripData);
    }
    async getLastTrip(Trip){
        return await Trip.findOne(
            {
                order: [['createdAt', 'DESC']], // Order by creation date
                attributes: ['id'] // Get only the ID
            }
        )
    }
    async getTripById(id, Trip) {
        return await Trip.findOne({ where: { id } });
    }

    // Method to calculate the profit based on trip details
    calculateProfit(trip) {
        const {
            boughtAmount,
            driverSalary,
            hotFullOil,
            tollExpense,
            fuelExpense,
            soldAmount,
        } = trip;

        // Profit formula
        const profit = soldAmount - (boughtAmount + driverSalary + hotFullOil + tollExpense + fuelExpense);
        return profit;
    }

    async findTripById(id,Trip) {
        // Fetch trip by ID, exclude createdAt and updatedAt fields
        return Trip.findOne({
            where: { id },
            attributes: [
                'id', 'truckNumber', 'materialName', 'materialQuantity', 'boughtAmount', 
                'vendor', 'pickUpDate', 'customer', 'deliveryDate', 'soldAmount', 
                'paidAmountUntilNow', 'paymentStatus', 'driverName', 'driverSalary', 
                'driverSalaryStatus', 'hotFullOil', 'tollExpense', 'totalKilometers', 'fuelExpense', 'createdBy'
            ]
        });
    }
}

module.exports = new TripRepository();
