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
const express_1 = __importDefault(require("express"));
const itemModel_1 = __importDefault(require("../models/itemModel")); // Import the item schema/model
const router = express_1.default.Router();
// Search route
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.query; // Extract the search query parameter
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }
        // Query the database using regex for case-insensitive search
        const results = yield itemModel_1.default.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Search in the `name` field
                { description: { $regex: query, $options: 'i' } }, // Search in the `description` field
            ],
        });
        if (results.length === 0) {
            return res.status(404).json({ message: 'No items found matching the query' });
        }
        res.status(200).json(results); // Send the search results back to the client
    }
    catch (error) {
        res.status(500).json({ message: 'Error while performing search', error: error.message });
    }
}));
exports.default = router;
