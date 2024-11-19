import User from "../models/UserModel.js";
import createSkillService from "../services/skillService.js";

const skillService = createSkillService(User);

const addUserSkill = async (req, res) => {
    const { skillName, userId } = req.params;

    try {
        const updatedUser = await skillService.addSkill(userId, skillName);
        res.status(201).json({ updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUserSkill = async (req, res) => {
    const { skillName, userId } = req.params;

    try {
        const updatedUser = await skillService.deleteSkill(userId, skillName);
        res.status(200).json({ updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export {
    addUserSkill,
    deleteUserSkill,
};
