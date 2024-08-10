// models/Form.ts
import { Schema, model, models, Document } from 'mongoose';

interface FormDocument extends Document {
  user: Schema.Types.ObjectId;
  sections: {
    [key: string]: Record<string, any>; // Allows for nested objects
  };
}

const FormSchema = new Schema<FormDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  sections: { type: Map, of: Schema.Types.Mixed, required: true },
});

const Forms = models.Forms || model<FormDocument>('Forms', FormSchema);

export default Forms;
