const TripRepository = require("../../repository/trip.repo");

exports.getTripDetailsById = async (req, res) => {
    try {
        const { id } = req.params; // Get trip ID from request parameters

        // Fetch trip details using the repository function
        const trip = await TripRepository.findTripById(id,req.models.Trip);

        if (!trip) {
            return res.status(404).json({ error: "Trip not found." });
        }

        // Calculate profit
        const { boughtAmount, driverSalary, hotFullOil, tollExpense, fuelExpense, soldAmount } = trip;
        const profit = (soldAmount - (boughtAmount + driverSalary + hotFullOil + tollExpense + fuelExpense)).toFixed(2);

        return res.status(200).json({
            status: true,
            message: "Trip details retrieved successfully.",
            data: {
                ...trip.get(), // Spread the trip details
                profit,       // Add profit to the response
            },
        });
    } catch (error) {
        console.error("Error in getTripDetailsById:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};