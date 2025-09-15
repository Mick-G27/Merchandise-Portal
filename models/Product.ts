import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  stockQuantity: number;
  specifications: Record<string, any>;
  tags: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }],
  sizes: [{ type: String }],
  colors: [{ type: String }],
  inStock: { type: Boolean, default: true },
  stockQuantity: { type: Number, default: 0 },
  specifications: { type: Schema.Types.Mixed },
  tags: [{ type: String }],
  featured: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);