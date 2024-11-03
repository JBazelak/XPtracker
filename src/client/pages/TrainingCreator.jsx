import { React, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useAddTraining } from "../hooks/useAddTraining";

const TrainingCreator = () => {
    const { user } = useAuthContext();
    const [selectedSkill, setSelectedSkill] = useState('');
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');
    const [addTraining, isLoading, error] = useAddTraining();


    const addGoal = () => {
        if (newGoal) {
            setGoals([...goals, { goalName: newGoal }]);
            
            setNewGoal('');
        }
    };


    const removeGoal = (index) => {
        const updatedGoals = goals.filter((_, i) => i !== index);
        setGoals(updatedGoals);
    };


    const handleSkillChange = (e) => {
        setSelectedSkill(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const training = await addTraining({ selectedSkill, goals })
            if (training) {
                setSelectedSkill('');
                setDescription('');
                setGoals([]);
            }
        } catch (error) {
            console.log("Błąd podczas dodawania treningu", error)
        }
    };

    return (
        <form>
            <h1>Zaplanuj swój trening!</h1>
            <select value={selectedSkill} onChange={handleSkillChange} required>
                <option value="" disabled>Wybierz umiejętność</option>
                {user.skills.length === 0 ? (
                    <option disabled>Musisz dodać jakąś umiejętność</option>
                ) : (
                    user.skills.map((skill) => (
                        <option key={skill._id} value={skill.name}>
                            {skill.name}
                        </option>
                    ))
                )}
            </select>

            <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Dodaj nowy cel"
            />
            <button type="button" onClick={addGoal}>Dodaj cel</button>

            <h3>Lista celów:</h3>
            <ul>
                {goals.map((goal, index) => (
                    <li key={index}>
                        {goal.goalName} <button type="button" onClick={() => removeGoal(index)}>Usuń</button>
                    </li>
                ))}
            </ul>

            <button type="submit" onClick={handleSubmit} >Zaplanuj trening</button>

        </form>
    )
}

export default TrainingCreator;