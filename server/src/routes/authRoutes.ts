import express, { Request, Response } from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = express.Router();

// Route for registration
router.post('/register', (req: Request, res: Response) => {
    registerUser(req, res);
});

// Route for login
//router.post('/login', (req: Request, res: Response) => {
//    loginUser(req, res);
//});


router.get('/login', (req: Request, res: Response) => {
    res.send('This is the login endpoint. Please use POST to log in.');
});


export default router;

