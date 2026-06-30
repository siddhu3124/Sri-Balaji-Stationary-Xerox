import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import File from '../models/File.js';

const router = express.Router();

// Ensure uploads directory exists (use writeable /tmp on Vercel)
const isVercel = process.env.VERCEL === '1';
const uploadDir = isVercel ? '/tmp/uploads' : 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Configure upload parameters
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx|jpg|jpeg|png/;
    // Extract file extension and check
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file format. Please upload PDF, Word document, or image files.'));
    }
  },
});

// POST /api/upload
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Save record to MongoDB with a full clickable web download link
    const downloadUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const newFile = new File({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: downloadUrl,
    });

    const savedFile = await newFile.save();

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        _id: savedFile._id,
        filename: savedFile.filename,
        originalname: savedFile.originalname,
        size: savedFile.size,
        url: `/uploads/${savedFile.filename}`,
      },
    });
  } catch (error) {
    console.error(`File upload error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

export default router;
