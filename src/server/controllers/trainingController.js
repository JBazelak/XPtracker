import User from "../models/UserModel.js";
import createTrainingService from "../services/trainingService.js";
import generateToken from "../utils/generateToken.js";
const trainingService = createTrainingService(User);

const addTraining = async (req, res) => {
    const { userId } = req.params;
    const trainingData = req.body;
    try {
        const token = generateToken(userId);
        const updatedUser = await trainingService.planTraining(userId, trainingData);
        res.status(201).json({updatedUser, token});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTrainings = async (req, res) => {
    const { userId } = req.params;

    try {
        const trainings = await trainingService.getAllTrainings(userId); 
        res.status(200).json(trainings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export {
    addTraining,
    getTrainings,
}