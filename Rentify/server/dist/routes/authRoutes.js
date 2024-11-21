"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// Route for registration
router.post('/register', (req, res) => {
    (0, authController_1.registerUser)(req, res);
});
// Route for login
//router.post('/login', (req: Request, res: Response) => {
//    loginUser(req, res);
//});
router.get('/login', (req, res) => {
    res.send('This is the login endpoint. Please use POST to log in.');
});
exports.default = router;
