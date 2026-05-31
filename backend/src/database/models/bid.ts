import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  offerId: { type: mongoose.Schema.Types.ObjectId, ref: "Offer", required: true },
  price: { type: Number, required: true },
  vehicleType: { type: String, required: true },
  eta: { type: String, required: true },
  message: { type: String, default: "" },
  carrierName: { type: String, required: true },
  carrierPhone: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Bid = mongoose.model("Bid", bidSchema);

export default Bid;
