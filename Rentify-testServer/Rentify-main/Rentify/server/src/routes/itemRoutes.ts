import express, { Request, Response } from "express";
import Item from "../models/itemModel";

const router = express.Router();

// Create item endpoint
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description, category, price } = req.body;

    // Validate required fields
    if (!title || !description || !category || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate price is a positive number
    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({ message: "Price must be a positive number" });
    }

    // Log the incoming request body
    console.log("Incoming request body:", req.body);

    // Create new item
    const newItem = new Item({ title, description, category, price });
    console.log("New item to save:", newItem);

    // Save the item to the database
    const savedItem = await newItem.save();
    console.log("Saved item in database:", savedItem);

    // Respond with success
    res.status(201).json({
      message: "Item created successfully",
      item: savedItem,
    });
  } catch (error) {
    console.error("Error while creating item:", error);

    // Respond with an error
    res.status(500).json({
      message: "Failed to create item",
      error: error instanceof Error ? error.message : error,
    });
  }
});

// Fetch all items from the database
router.get("/", async (req: Request, res: Response) => {
  try {
    console.log("Fetching all items from the database...");
    const items = await Item.find(); // Fetch all items
    console.log("Fetched items:", items);
    res.status(200).json(items); // Respond with the items
  } catch (error) {
    console.error("Error while fetching items:", error);
    res.status(500).json({
      message: "Failed to fetch items",
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default router;

