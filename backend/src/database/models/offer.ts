import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  goodsType: { type: String, required: true },
  weight: { type: String, required: true },
  description: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  pickupDate: { type: String, required: true },
  contactName: { type: String, required: true },
  contactPhone: { type: String, required: true },
  priority: { type: String, enum: ["standard", "express"], required: true },
  status: {
    type: String,
    enum: ["open", "confirmed", "closed"],
    default: "open",
  },
  acceptedBidId: { type: mongoose.Schema.Types.ObjectId, ref: "Bid", default: null },
  createdAt: { type: Date, default: Date.now },
});

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;
