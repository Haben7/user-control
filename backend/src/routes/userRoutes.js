import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/super-admin", verifyToken,(req, res) => {
  res.json({ message: "Super Admin page" });
});
userRouter.post("/admin", (req, res) => {
  res.json({ message: "Admin page" });
});
userRouter.post("/delivery-boy", (req, res) => {
  res.json({ message: "Delivery boy page" });
});
userRouter.post("/merchant", (req, res) => {
  res.json({ message: "MErchant page" });
});
userRouter.post("/customer", (req, res) => {
  res.json({ message: "Customer page" });
});


export default userRouter;
