const mongoose = require('mongoose');
const { Schema } = mongoose;

const { User } = require('./user');

const ItemSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: [1, 'Please enter item title!'],
      maxlength: [30, 'Title must be max 30 characters long!'],
      required: true,
    },
    condition: {
      type: String,
      enum: ['unused', 'used', 'defective'],
      required: [true, 'Please choose item condition!'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description must be max 500 characters long!'],
      required: [true, 'Description should be entered!'],
    },
    photos: [
      {
        url: String,
        fileName: String,
        originalname: String,
        mimetype: String,
        thumbnail: {
          url: String,
          fileName: String,
          originalname: String,
          mimetype: String,
        },
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    viewed: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'in progress'],
      default: 'active',
    },
    archived: Date,
    deleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    itemRequester: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    commentedByUser: {
      type: Boolean,
      default: false,
    },
    commentedByItemRequester: {
      type: Boolean,
      default: false,
    },
    search: {
      type: String,
    },
    latestMessageDate: {
      type: Date,
    },
    unreadMessagesCounter: {
      type: Number,
      default: 0,
    },
    giftedDate: {
      type: Date,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    location: String,
  },
  {
    timestamps: true,
  }
);

ItemSchema.pre('save', async function (next) {
  const user = await User.findById(this.user);
  this.location = user.location;
  next();
});

module.exports = {
  Item: mongoose.model('Item', ItemSchema),
};
