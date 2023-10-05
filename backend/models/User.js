const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
    },
    password: {
      type: String,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    
    followers: {
      type: Array,
      default: [],
    },
    
    followings: {
      type: Array,
      default: [],
    },

    birthday: {
        type: Date,
        require: true,
    },

    interests: {
        type: String,
        max: 50,
    },

    circlesFollowed: {
      type: Array,
      default: [],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);