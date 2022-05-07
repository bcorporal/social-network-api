const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const thoughtSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId
    },
    reactionBody: {
      type: String,
      required: "Please enter a reaction",
      maxlength: 280,
      minlength: 4,
      trim: true,
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (dateValue) => moment(dateValue).format('MM Do, YYY [at] hh:mm a')
    }
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

thoughtSchema.virtual("reactionCount").get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
