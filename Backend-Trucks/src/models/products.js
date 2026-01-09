const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  brand: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },

  group: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },

  image: {
    type: String,
    required: true,
    trim: true
  }

}, { timestamps: true });

/* Bloquea productos realmente iguales aunque cambie el code */
productSchema.index(
  { name: 1, brand: 1, group: 1 },
  { unique: true }
);

module.exports = model("Products", productSchema);
