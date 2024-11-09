const trainingService = (User) => {

    const findUserById = async (userId) => {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Użytkownik nie znaleziony');
        }
        return user;
    };

    return {
        async planTraining(userId, trainingData) {
            const user = await findUserById(userId);

            if (!trainingData.selectedSkill || !trainingData.goals) {
                throw new Error("Dane treningu są niekompletne");
            }

            const goals = trainingData.goals.map(goal => ({
                goalName: goal.goalName,
                isAchived: false,
            }));

            const totalExp = goals.length * 100;

            user.trainings.push({
                selectedSkill: trainingData.selectedSkill,
                goals: goals,
                totalExp: totalExp,
            });

            await user.save();
            return user;
        },

        async getAllTrainings(userId) {
            const user = await findUserById(userId);
            return user.trainings;
        },

        async removeTraining(userId, trainingId) {
            const user = await findUserById(userId);
            user.trainings = user.trainings.filter(training => training._id.toString() !== trainingId);
            await user.save();
            return user;
        },

        async updateGoalStatus(userId, trainingId, goalId, isAchived, progress) {
            const updatedUser = await User.findOneAndUpdate(
                {
                    _id: userId,
                    "trainings._id": trainingId,
                    "trainings.goals._id": goalId
                },
                {
                    $set: {
                        "trainings.$[training].goals.$[goal].isAchived": isAchived,
                        "trainings.$[training].progress": progress
                    }
                },
                {
                    new: true,
                    arrayFilters: [
                        { "training._id": trainingId },
                        { "goal._id": goalId }
                    ]
                }
            );

            if (!updatedUser) {
                throw new Error("Nie znaleziono użytkownika, treningu lub celu");
            }

            return updatedUser;
        },

        async updateTrainingStatus(userId, trainingId, selectedSkill) {
            const user = await findUserById(userId);
            const trainingIndex = user.trainings.findIndex(training => training._id.toString() === trainingId);
            if (trainingIndex === -1) {
                throw new Error("Trening nie został znaleziony.");
            }

            const completedTraining = user.trainings[trainingIndex];
            user.trainings.splice(trainingIndex, 1); 

            const skill = user.skills.find(skill => skill.name === selectedSkill);
            if (skill) {
                skill.experience += completedTraining.totalExp; 
            } else {
                throw new Error("Umiejętność nie została znaleziona.");
            }

            await user.save();

            return user;
        }
    };
};

export default trainingService;
