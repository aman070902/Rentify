import express, { Request, Response } from 'express';
import Item from '../models/itemModel'; // Import the item schema/model

const router = express.Router();

// Search route
router.get('/search', async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string; // Extract the search query parameter

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Query the database using regex for case-insensitive search
    const results = await Item.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Search in the `name` field
        { description: { $regex: query, $options: 'i' } }, // Search in the `description` field
      ],
    });

    if (results.length === 0) {
      return res.status(404).json({ message: 'No items found matching the query' });
    }

    res.status(200).json(results); // Send the search results back to the client
  } catch (error) {
    res.status(500).json({ message: 'Error while performing search', error: (error as Error).message });
  }
});

export default router;

