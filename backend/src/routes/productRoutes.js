import express from "express";

const productRouter = express.Router();

productRouter.post("/product", (req, res) => {
  res.json({ message: "Customer page" });
});

export default productRouter;
