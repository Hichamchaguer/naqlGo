import router, { Request, Response } from "express";
import Offer from "../models/offer";

const routes = router.Router();

routes.post("/offers", async (req: Request, res: Response) => {
  try {
    const offer = await Offer.create({
      goodsType: req.body.goodsType,
      weight: req.body.weight,
      description: req.body.description,
      origin: req.body.origin,
      destination: req.body.destination,
      pickupDate: req.body.pickupDate,
      contactName: req.body.contactName,
      contactPhone: req.body.contactPhone,
      priority: req.body.priority,
    });

    res.status(201).send(offer);
  } catch (err) {
    console.error("Error creating offer:", err);
    res.status(500).json({ error: "Error creating offer" });
  }
});

routes.get("/offers", async (_req: Request, res: Response) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.send(offers);
  } catch (err) {
    console.error("Error fetching offers:", err);
    res.status(500).json({ error: "Error fetching offers" });
  }
});

export default routes;
