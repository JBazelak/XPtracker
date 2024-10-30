import User from "../models/UserModel.js";
import createTrainingService from "../services/trainingService.js";
const trainingService = createTrainingService(User);

const addTraining = async (req, res) => {
    const { userId } = req.params;
    const trainingData = req.body;

    try {
        const training = await trainingService.addTraining(userId, trainingData);
        res.status(201).json(training);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export {
    addTraining,
}