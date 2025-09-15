import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  _id: string;
  productId: string;
  userId: string;
  orderId: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  status: 'pending' | 'approved' | 'rejected';
  moderatedBy?: string;
  moderatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>({
  productId: { type: String, required: true },
  userId: { type: String, required: true },
  orderId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  comment: { type: String, required: true },
  images: [{ type: String }],
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  moderatedBy: String,
  moderatedAt: Date
}, {
  timestamps: true
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);