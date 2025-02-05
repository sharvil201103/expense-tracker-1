import mongoose, { Schema } from "mongoose";

const totalAmountSchema = new Schema({
    amount: { type: mongoose.Types.Decimal128, default: 0.0 } // Supports large numbers
});

// Ensure correct formatting when retrieving data
totalAmountSchema.methods.toJSON = function () {
    return {
        amount: parseFloat(this.amount.toString()) // Convert Decimal128 to a readable number
    };
};

const TotalAmount = mongoose.models.TotalAmount || mongoose.model("TotalAmount", totalAmountSchema);

export default TotalAmount;
