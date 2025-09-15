import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'dept_head' | 'admin';
  department?: string;
  phoneNumber?: string;
  addresses: Array<{
    type: 'home' | 'office';
    street: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  }>;
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    orderReminders: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ['user', 'dept_head', 'admin'], default: 'user' },
  department: { type: String },
  phoneNumber: { type: String },
  addresses: [{
    type: { type: String, enum: ['home', 'office'], default: 'home' },
    street: String,
    city: String,
    state: String,
    pincode: String,
    isDefault: { type: Boolean, default: false }
  }],
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: true },
    orderReminders: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);