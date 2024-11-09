import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    strength: {
      type: Number,
      default: 0,
    },
    agility: {
      type: Number,
      default: 0,
    },
    intelligence: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    isLogged: {
      type: Boolean,
      default: false,
    },
    ifConfigured: {
      type: Boolean,
      default: false,
    },
    skills: [
      {
        name: {
          type: String,
        },
        level: {
          type: Number,
          default: 1,
        },
        experience: {
          type: Number,
          default: 0,
        },
        requiredExperience: {
          type: Number,
          default: 100,
        },
      },
    ],
    trainings: [
      {
        selectedSkill: {
          type: String,
        },
        goals: [
          {
            goalName: {
              type: String,
            },
            isAchived: {
              type: Boolean,
            }
          },
        ],
        totalExp: {
          type: Number
        },
        progress: {
          type: Number,
          default: 0,
        },
        isCompleated: {
          type: Boolean,
          default: false,
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
