import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 16,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [String],
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = model('users', UserSchema);

export default UserModel;
