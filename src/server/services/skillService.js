const skillService = (User) => {
    return {
        async addSkill(userId, name) {

            const user = await User.findById(userId);
            if (!user) { return Error("Nie znaleziono użytkownika") };

            const existingSkill = user.skills.find(skill => skill.name === name);
            if (existingSkill) { return Error("Umiejętność o tej nazwie już istnieje.") };

            user.skills.push({ name });
            await user.save();

            return user;
        },
        async deleteSkill(userId, skillName) {

            const user = await User.findById(userId);
            if (!user) { return Error("Nie znaleziono użytkownika") };

            user.skills = user.skills.filter(skill => skill.name !== skillName);
            await user.save();

            return user;
        }
    }
}

export default skillService;