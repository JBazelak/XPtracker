import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SkillList from './components/SkillList';

function App() {
    const [skills, setSkills] = useState([]);
    const [skillId, setSkillId] = useState('');
    const [expPoints, setExpPoints] = useState(0);

    useEffect(() => {
        async function fetchSkills() {
            const response = await axios.get('http://localhost:5000/api/skills');
            setSkills(response.data);
        }
        fetchSkills();
    }, []);

    const handleAddExperience = async () => {
        await axios.post('http://localhost:5000/api/skills/add-exp', { skillId, expPoints });
        setExpPoints(0);
        setSkillId('');
        const response = await axios.get('http://localhost:5000/api/skills');
        setSkills(response.data);
    };

    return (
        <div>
            <h1>XP Tracker</h1>
            <SkillList skills={skills} />
            <h2>Add Experience</h2>
            <input
                type="text"
                placeholder="Skill ID"
                value={skillId}
                onChange={e => setSkillId(e.target.value)}
            />
            <input
                type="number"
                placeholder="Experience Points"
                value={expPoints}
                onChange={e => setExpPoints(Number(e.target.value))}
            />
            <button onClick={handleAddExperience}>Add Experience</button>
        </div>
    );
}

export default App;