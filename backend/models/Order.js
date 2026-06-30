import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  isPrintJob: {
    type: Boolean,
    default: false,
  },
  config: {
    fileName: String,
    fileSize: String,
    colorMode: String,
    printSides: String,
    pages: Number,
    binding: String,
    instructions: String,
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    },
  },
});

const orderSchema = new mongoose.Schema({
  customer: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    delivery: {
      type: String,
      enum: ['pickup', 'delivery'],
      required: true,
    },
    address: {
      type: String,
      // Required only if delivery type is home delivery
      required: function() {
        return this.customer.delivery === 'delivery';
      },
    },
  },
  items: [orderItemSchema],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Ready', 'Completed'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
