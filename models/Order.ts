import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  _id: string;
  orderNumber: string;
  userId: string;
  orderType: 'individual' | 'group';
  groupDetails?: {
    departmentId: string;
    departmentName: string;
    groupLeaderId: string;
    memberContributions: Array<{
      userId: string;
      amount: number;
      status: 'pending' | 'paid' | 'failed';
    }>;
  };
  items: Array<{
    productId: string;
    quantity: number;
    size?: string;
    color?: string;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  tracking: {
    status: 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';
    location: string;
    date: Date;
    notes?: string;
  }[];
  deadlineDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>({
  orderNumber: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  orderType: { type: String, enum: ['individual', 'group'], required: true },
  groupDetails: {
    departmentId: String,
    departmentName: String,
    groupLeaderId: String,
    memberContributions: [{
      userId: String,
      amount: Number,
      status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' }
    }]
  },
  items: [{
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    size: String,
    color: String,
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: String,
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  tracking: [{
    status: { type: String, enum: ['packed', 'shipped', 'out_for_delivery', 'delivered'] },
    location: String,
    date: { type: Date, default: Date.now },
    notes: String
  }],
  deadlineDate: Date
}, {
  timestamps: true
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);