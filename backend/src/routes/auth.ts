import { Router, Request, Response } from 'express';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // TODO: Validate input with Zod
    // TODO: Hash password with bcryptjs
    // TODO: Create user in database
    // TODO: Generate JWT token

    res.status(201).json({
      message: 'User registered successfully',
      // token,
      // user
    });
  } catch (error) {
    throw new AppError(400, 'Registration failed');
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // TODO: Validate input
    // TODO: Check user exists
    // TODO: Verify password
    // TODO: Generate JWT token

    res.json({
      message: 'Login successful',
      // token,
      // user
    });
  } catch (error) {
    throw new AppError(401, 'Invalid credentials');
  }
});

export default router;