import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';


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
              default: false,
            }
          },
        ],
        totalExp: {
          type: Number
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

// Metody do rejestracji i logowania użytkownika

userSchema.statics.addSkill = async function (userId, name) {

  const user = await this.findById(userId);
  if (!user) { return Error("Nie znaleziono użytkownika") };

  const existingSkill = user.skills.find(skill => skill.name === name);
  if (existingSkill) { return Error("Umiejętność o tej nazwie już istnieje.") };

  user.skills.push({ name });
  await user.save();

  return user;
};

userSchema.statics.deleteSkill = async function (userId, skillName) {

  const user = await this.findById(userId);
  if (!user) { return Error("Nie znaleziono użytkownika") };

  user.skills = user.skills.filter(skill => skill.name !== skillName);
  await user.save();

  return user;
}

userSchema.statics.addTraining = async function (userId, trainingData) {
  try {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error('Użytkownik nie znaleziony');
    }

    if (!trainingData.selectedSkill || !trainingData.goals) {
      throw new Error("Dane treningu są niekompletne");
    }

    const goals = trainingData.goals.map(goal => ({
      goalName: goal.goalName,
    }));

    const totalExp = goals.length * 100;

    user.trainings.push({
      selectedSkill: trainingData.selectedSkill,
      goals: goals,
      totalExp: totalExp
    });

    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};


const User = mongoose.model('User', userSchema);

export default User;
