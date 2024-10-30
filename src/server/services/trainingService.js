const trainingService = (User) => {
    return {
        async addTraining(userId, trainingData) {
            try {
                const user = await User.findById(userId);
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
        },
    }
}

export default trainingService;