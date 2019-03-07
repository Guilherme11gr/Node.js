'use-strict';

import mongoose, { Schema } from 'mongoose';

mongoose.set('useCreateIndex', true);

const schema = new Schema({

  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  roles: [{
    type: String,
    required: true,
  }],

});

export default mongoose.model('Customer', schema);
