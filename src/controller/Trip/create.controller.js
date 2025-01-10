const TripRepository = require("../../repository/trip.repo");

// Create and Save a new Trip
exports.createTrip = async (req, res) => {
    // Validate request body
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    try {
        // Retrieve the last trip to generate the new trip ID
        const lastTrip = await TripRepository.getLastTrip(req.models.Trip);
        const lastTripId = lastTrip ? parseInt(lastTrip.id.split("-")[1]) : 0; // Extract numeric part of last ID

        // Generate the new trip ID
        const newTripId = `#T-${String(lastTripId + 1).padStart(3, '0')}`; // Ensure padding to 3 digits

        // Create a Trip object based on request body
        const trip = {
            id: newTripId, // Setting the generated trip ID
            truckNumber: req.body.truckNumber,
            materialName: req.body.materialName,
            materialQuantity: req.body.materialQuantity,
            boughtAmount: req.body.boughtAmount,
            vendor: req.body.vendor,
            pickUpDate: req.body.pickUpDate,
            customer: req.body.customer,
            deliveryDate: req.body.deliveryDate,
            soldAmount: req.body.soldAmount,
            paidAmountUntilNow: req.body.paidAmountUntilNow,
            paymentStatus: req.body.paymentStatus,
            driverName: req.body.driverName,
            driverSalary: req.body.driverSalary,
            driverSalaryStatus: req.body.driverSalaryStatus,
            hotFullOil: req.body.hotFullOil,
            tollExpense: req.body.tollExpense,
            totalKilometers: req.body.totalKilometers,
            fuelExpense: req.body.fuelExpense,
            createdBy: req.user_data.user_id
        };

        // Save Trip in the database
        let response = await TripRepository.create(trip, req.models.Trip);
        if (!response) {
            return res.status(404).json({ error: 'Cannot create the trip' });
        }
        res.status(201).send({
            status: true,
            message: "Trip Created Successfully!!",
            data: response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
