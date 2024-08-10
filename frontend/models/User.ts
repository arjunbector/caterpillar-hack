import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Other user fields...
});

const Users = models.Users || model('Users', UserSchema);

export default Users;
