import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useAddSkill } from '../hooks/useAddSkill'; 
import { useDeleteSkill } from '../hooks/useDeleteSkill'; 


const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <p>{message}</p>
                <button onClick={onConfirm}>Potwierdź</button>
                <button onClick={onCancel}>Anuluj</button>
            </div>
        </div>
    );
};

const SkillManager = () => {
    const [newSkill, setNewSkill] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [skillToDelete, setSkillToDelete] = useState(null);
    const { user } = useAuthContext();
    const { addSkill, error: addSkillError } = useAddSkill(); 
    const { deleteSkill, error: deleteSkillError, isLoading } = useDeleteSkill();

    const handleNewSkillChange = (e) => {
        setNewSkill(e.target.value);
    };

    const handleAddSkill = async () => {

        try {
            const addedSkill = await addSkill(newSkill, user._id);  
            if (addedSkill) {
                setNewSkill('');
            }
        } catch (error) {
            console.error('Błąd dodawania umiejętności', error);
        }
    };


    const confirmDeleteSkill = (skill) => {
        setSkillToDelete(skill);
        setShowDialog(true);
    };


    const handleDeleteSkill = async () => {
        try {
            await deleteSkill(skillToDelete.name);
            setSkillToDelete(null);
            setShowDialog(false);
        } catch (error) {
            console.error('Błąd usuwania umiejętności', error);
        }
    };


    const cancelDeleteSkill = () => {
        setSkillToDelete(null);
        setShowDialog(false);
    };

    return (
        <div>
            <h2>Zarządzaj Umiejętnościami</h2>

            <div>
                <input
                    type="text"
                    value={newSkill}
                    onChange={handleNewSkillChange}
                    placeholder="Dodaj nową umiejętność"
                />
                <button onClick={handleAddSkill}>Dodaj Umiejętność</button>
                {addSkillError && <p style={{ color: 'red' }}>{addSkillError}</p>} 
            </div>

            <ul>
                {user.skills.map((skill) => (
                    <li key={skill._id}>
                        {skill.name}
                        <button onClick={() => confirmDeleteSkill(skill)} disabled={isLoading}>
                            Usuń
                        </button>
                    </li>
                ))}
            </ul>

            {deleteSkillError && <p style={{ color: 'red' }}>{deleteSkillError}</p>}

            {showDialog && (
                <ConfirmationDialog
                    message={`Czy na pewno chcesz usunąć umiejętność "${skillToDelete.name}"?`}
                    onConfirm={handleDeleteSkill}
                    onCancel={cancelDeleteSkill}
                />
            )}
        </div>
    );
};

export default SkillManager;
