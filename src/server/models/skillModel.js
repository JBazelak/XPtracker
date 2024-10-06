import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    expPoints: {
        type: Number,
        default: 0,
    },
    currentLevel: {
        type: Number,
        default: 1
    },
  });
  
  skillSchema.virtual('nextLevelExp').get(function(){
    const baseExp = 100;
    const factor = 1.5;
    return Math.floor(baseExp * Math.pow(factor, this.currentLevel - 1));
  });
  
  skillSchema.virtual('progress').get(function(){
    const nextLevelExp = this.nextLevelExp;
    return (this.expPoints / nextLevelExp) * 100;
  });

  const Skill = mongoose.model("Skill", skillSchema);

  export default Skill;