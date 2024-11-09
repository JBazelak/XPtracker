import User from "../models/UserModel.js";
import createTrainingService from "../services/trainingService.js";
import generateToken from "../utils/generateToken.js";
const trainingService = createTrainingService(User);

const addTrainingController = async (req, res) => {
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

const getTrainingsController = async (req, res) => {
    const { userId } = req.params;

    try {
        const trainings = await trainingService.getAllTrainings(userId); 
        res.status(200).json(trainings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTrainingController = async (req, res) => {
    const {userId, trainingId} = req.params;

    try{
        const updatedUser =  await trainingService.removeTraining(userId, trainingId);
        const token = generateToken(userId);
        res.status(200).json({updatedUser, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }

}

const updateGoalStatusController = async (req, res) => {
    const { userId, trainingId, goalId } = req.params;
    const { isAchived, progress} = req.body;
    console.log("inside controller")
    try{
        const updatedUser =  await trainingService.updateGoalStatus(userId, trainingId, goalId, isAchived, progress);
        const token = generateToken(userId);
        res.status(200).json({updatedUser, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }

}

const updateTrainingStatusController = async (req, res) => {
    const {userId, trainingId} = req.params;
    const {selectedSkill} = req.body;
    try{
        const updatedUser =  await trainingService.updateTrainingStatus(userId, trainingId, selectedSkill);
        const token = generateToken(userId);
        res.status(200).json({updatedUser, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export {
    addTrainingController,
    getTrainingsController,
    deleteTrainingController,
    updateGoalStatusController,
    updateTrainingStatusController,
}