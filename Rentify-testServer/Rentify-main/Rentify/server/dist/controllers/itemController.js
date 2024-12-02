"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchItems = void 0;
const itemModel_1 = __importDefault(require("../models/itemModel"));
const searchItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Search route hit'); // Log when the route is accessed
    console.log('Query params:', req.query); // Log the query parameters
    try {
        const query = req.query.query; // Extract the query parameter
        console.log('Query string:', query); // Log the search string
        // Search the database
        const items = yield itemModel_1.default.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Case-insensitive match
                { description: { $regex: query, $options: 'i' } },
            ],
        });
        console.log('Search results:', items); // Log the search results
        res.status(200).json(items); // Send results to the client
    }
    catch (error) {
        console.error('Error in searchItems:', error); // Log any errors
        res.status(500).json({ message: 'Error searching items', error }); // Send error response
    }
});
exports.searchItems = searchItems;
