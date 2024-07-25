import { Schema, model } from "mongoose";


const UserSchema = Schema( {

  name: {
    type: String,
    required: [true, 'Tha name is required']
  },
  lastname: {
    type: String,
    required: [true, 'The lastname is required']
  },
  phone: {
    type: String,
    require: [true, 'The phone number is required']
  },
  password: {
    type: String,
    required: [true, 'The password is required']
  },
  rol: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  wasValidated: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user } = this.toObject();
  user.id = _id;
  return user;
};

const UserModel = model("User", UserSchema);

export { UserModel };