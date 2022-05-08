const { Schema, model } = require('mongoose');
const moment = require('moment');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid e-mail address.']
    },
      
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Thought"
        }
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
      },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});  

const User = model('User', userSchema);

module.exports = User;
