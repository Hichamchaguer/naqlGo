import router, { Request, Response } from "express";
import Bid from "../models/bid";
import Offer from "../models/offer";

const routes = router.Router();

routes.post("/offers/:offerId/bids", async (req: Request, res: Response) => {
  try {
    const offerId = Array.isArray(req.params.offerId)
      ? req.params.offerId[0]
      : req.params.offerId;
    if (!offerId) {
      return res.status(400).json({ error: "Offer id is required" });
    }

    const bid = await Bid.create({
      offerId,
      price: req.body.price,
      vehicleType: req.body.vehicleType,
      eta: req.body.eta,
      message: req.body.message || "",
      carrierName: req.body.carrierName,
      carrierPhone: req.body.carrierPhone,
    });

    res.status(201).send(bid);
  } catch (err) {
    console.error("Error creating bid:", err);
    res.status(500).json({ error: "Error creating bid" });
  }
});

routes.get("/offers/:offerId/bids", async (req: Request, res: Response) => {
  try {
    const offerId = Array.isArray(req.params.offerId)
      ? req.params.offerId[0]
      : req.params.offerId;
    if (!offerId) {
      return res.status(400).json({ error: "Offer id is required" });
    }

    const bids = await Bid.find({ offerId }).sort({ createdAt: -1 });
    res.send(bids);
  } catch (err) {
    console.error("Error fetching bids:", err);
    res.status(500).json({ error: "Error fetching bids" });
  }
});

routes.patch(
  "/offers/:offerId/bids/:bidId",
  async (req: Request, res: Response) => {
    try {
      const offerId = Array.isArray(req.params.offerId)
        ? req.params.offerId[0]
        : req.params.offerId;
      const bidId = Array.isArray(req.params.bidId) ? req.params.bidId[0] : req.params.bidId;

      if (!offerId || !bidId) {
        return res.status(400).json({ error: "Offer id and bid id are required" });
      }

      const status = req.body.status;
      if (status !== "accepted" && status !== "rejected") {
        return res.status(400).json({ error: "Invalid status" });
      }

      const bid = await Bid.findByIdAndUpdate(bidId, { status }, { new: true });

      if (!bid) {
        return res.status(404).json({ error: "Bid not found" });
      }

      if (status === "accepted") {
        await Offer.findByIdAndUpdate(offerId, {
          status: "confirmed",
          acceptedBidId: bidId,
        });
      }

      res.send(bid);
    } catch (err) {
      console.error("Error updating bid:", err);
      res.status(500).json({ error: "Error updating bid" });
    }
  }
);

export default routes;
