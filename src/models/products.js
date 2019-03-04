'use-strict';

import mongoose, { Schema } from 'mongoose';

mongoose.set('useCreateIndex', true);

const schema = new Schema({

  title: {
    type: String,
    required: true,
    trim: true,
  },

  slug: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
  },

  active: {
    type: Boolean,
    required: true,
    default: true,
  },

  tags: [{
    type: String,
    required: true,
  }],

});

export default mongoose.model('Product', schema);
