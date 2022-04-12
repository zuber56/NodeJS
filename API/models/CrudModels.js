const mongoose = require('mongoose')
const { Schema } = mongoose

const CrudSchema = new Schema(
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
    zipcode: {
      type: Number,
      minlength: 3,
      maxlength: 50,
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

const Crud = mongoose.model('Crud', CrudSchema)
module.exports = Crud
