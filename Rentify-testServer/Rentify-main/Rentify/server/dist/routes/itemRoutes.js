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
const itemModel_1 = __importDefault(require("../models/itemModel"));
const router = express_1.default.Router();
//create item endpoint
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, category, price } = req.body;
        //validate required fields
        if (!title || !description || !category || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }
        //validate price is a positive number
        if (typeof price !== "number" || price <= 0) {
            return res.status(400).json({ message: "Price must be a positive number" });
        }
        //log the incoming request body
        console.log("Incoming request body:", req.body);
        //create new item
        const newItem = new itemModel_1.default({ title, description, category, price });
        console.log("New item to save:", newItem);
        //save the item to the database
        const savedItem = yield newItem.save();
        console.log("Saved item in database:", savedItem);
        //respond with success
        res.status(201).json({
            message: "Item created successfully",
            item: savedItem,
        });
    }
    catch (error) {
        console.error("Error while creating item:", error);
        //respond with an error
        res.status(500).json({
            message: "Failed to create item",
            error: error instanceof Error ? error.message : error,
        });
    }
}));
//fetch all items from the database
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Fetching all items from the database...");
        const items = yield itemModel_1.default.find(); 
        console.log("Fetched items:", items);
        res.status(200).json(items); 
    }
    catch (error) {
        console.error("Error while fetching items:", error);
        res.status(500).json({
            message: "Failed to fetch items",
            error: error instanceof Error ? error.message : error,
        });
    }
}));
exports.default = router;