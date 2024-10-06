import React from 'react';

function SkillList({ skills }) {
    return (
        <ul>
            {skills.map(skill => (
                <li key={skill._id}>
                    {skill.name}: Level {skill.currenLevel} - {skill.expPoints} XP
                    (Next Level: {skill.nextLevelExp} XP)
                    <progress value={skill.expPoints} max={skill.nextLevelExp}></progress>
                    <span> ({skill.progress.toFixed(2)}%)</span>
                </li>
            ))}
        </ul>
    );
}

export default SkillList;
