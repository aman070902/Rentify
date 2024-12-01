import { Request, Response } from 'express';
import Item from '../models/itemModel';

export const searchItems = async (req: Request, res: Response) => {
  console.log('Search route hit'); // Log when the route is accessed
  console.log('Query params:', req.query); // Log the query parameters

  try {
    const query = req.query.query as string; // Extract the query parameter
    console.log('Query string:', query); // Log the search string

    // Search the database
    const items = await Item.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive match
        { description: { $regex: query, $options: 'i' } },
      ],
    });

    console.log('Search results:', items); // Log the search results
    res.status(200).json(items); // Send results to the client
  } catch (error) {
    console.error('Error in searchItems:', error); // Log any errors
    res.status(500).json({ message: 'Error searching items', error }); // Send error response
  }
};

