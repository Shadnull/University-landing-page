import mongoose, { Schema, Document } from 'mongoose';

export interface IDocente extends Document {
  name: string;
  employeeNumber: string;
  department?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

const docenteSchema = new Schema<IDocente>(
  {
    name: { type: String, required: true, trim: true },
    employeeNumber: { type: String, required: true, unique: true, trim: true },
    department: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Docente || mongoose.model<IDocente>('Docente', docenteSchema);
