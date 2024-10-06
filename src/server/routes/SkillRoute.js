import express from 'express';
// import Skill from '../models/Skill.js';
import { requireAuth } from '../middleware/requireAuth.js';
const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/add-exp', requireAuth, async (req, res) => { // poprawiono ścieżkę
    const { skillId, expPoints } = req.body;

    try {
        const skill = await Skill.findById(skillId);
        if (!skill) {
            return res.status(404).send('Skill not found');
        }

        skill.expPoints += expPoints;

        while (skill.expPoints >= skill.nextLevelExp) {
            skill.expPoints -= skill.nextLevelExp;
            skill.currentLevel += 1;
        }

        await skill.save();
        res.status(200).send('Experience added successfully');
    } catch (error) {
        res.status(500).send('Failed to add experience');
    }
});

export default router;
