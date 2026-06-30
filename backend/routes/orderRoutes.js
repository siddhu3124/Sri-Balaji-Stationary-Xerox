import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// POST /api/orders - Create a new order
router.post('/', async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    if (!customer || !items || items.length === 0 || !total) {
      return res.status(400).json({ error: 'Missing required order details' });
    }

    // Map order items, resolving fileId references if present
    const formattedItems = items.map(item => {
      const formattedItem = {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        isPrintJob: !!item.isPrintJob,
      };

      if (item.isPrintJob && item.config) {
        formattedItem.config = {
          fileName: item.config.fileName,
          fileSize: item.config.fileSize,
          colorMode: item.config.colorMode,
          printSides: item.config.printSides,
          pages: item.config.pages,
          binding: item.config.binding,
          instructions: item.config.instructions,
          fileId: item.config.fileId || null, // Reference to MongoDB File ObjectId
        };
      }

      return formattedItem;
    });

    const newOrder = new Order({
      customer,
      items: formattedItems,
      total,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: savedOrder,
    });
  } catch (error) {
    console.error(`Error creating order: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/orders - List all orders (with populated file details)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.config.fileId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(`Error fetching orders: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

export default router;
