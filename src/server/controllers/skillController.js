import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

const addUserSkill = async (req, res) => {
    const { skillName, userId } = req.params;
  
    try {
        const updatedUser = await User.addSkill(userId, skillName);
        const token = generateToken(userId);
        res.status(201).json({ updatedUser, token});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  };
  
  const deleteUserSkill = async (req, res) => {
    const {skillName, userId} = req.params;
  
    try{
        const updatedUser =  await User.deleteSkill(userId, skillName);
        const token = generateToken(userId);
        res.status(200).json({updatedUser, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
  }

export {
    addUserSkill,
    deleteUserSkill,
}