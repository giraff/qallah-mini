import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/index';

const router = express.Router();

// @route   POST api/auth/
// @desc    Auth user
// @access  public

router.post('/', (req, res) => {
  
});

export default router;