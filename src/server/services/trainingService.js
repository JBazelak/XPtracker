const trainingService = (User) => {
    return {
        async planTraining(userId, trainingData) {
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
                    isAchived: false,
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
        async getAllTrainings(userId){
            const user = User.findById(userId);
            if (!user) {
                throw new Error('Użytkownik nie znaleziony');
            }
            return user.trainings;
        }
    }
}

export default trainingService;