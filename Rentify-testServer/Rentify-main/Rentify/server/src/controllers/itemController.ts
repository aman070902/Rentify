import { Request, Response } from 'express';
import Item from '../models/itemModel';

export const searchItems = async (req: Request, res: Response) => {
  console.log('Search route hit'); //log when the route is accessed
  console.log('Query params:', req.query); //log the query parameters

  try {
    const query = req.query.query as string; //extract the query parameter
    console.log('Query string:', query); 

    // Search the database
    const items = await Item.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, 
        { description: { $regex: query, $options: 'i' } },
      ],
    });

    console.log('Search results:', items); 
    res.status(200).json(items); 
  } catch (error) {
    console.error('Error in searchItems:', error); 
    res.status(500).json({ message: 'Error searching items', error }); 
  }
};
