import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  locationUrl: { type: String, required: false },
  contact: { type: String, required: true },
  machineType: { type: String, required: true },
  date: { type: Date, required: true },
  // Other user fields...
});

const Users = models.Users || model('Users', UserSchema);

export default Users;
