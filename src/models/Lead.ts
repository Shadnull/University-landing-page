import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  email: string;
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    source: { type: String, trim: true, default: 'hero' },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', leadSchema);
