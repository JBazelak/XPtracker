import User from "../models/UserModel.js";
import mongoose from "mongoose";

const addTraining = async (req, res) => {
    const { userId, time, goals, skillId } = req.body;

    try {
        const training = await Training.createTraining(userId, time, goals, skillId);
        res.status(201).json(training);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export {
    addTraining
}