const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: false,
      minlength: 5,
      maxlength: 1024,
    },
    city: {
      type: String,
      minlength: 3,
      maxlength: 50,
    },
    role: {
      type: String,
      minlength: 5,
      maxlength: 10,
    },
    avatar: {
      type: String,
    },
    companylogo: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  },
)

const User = mongoose.model('User', UserSchema)
module.exports = User
