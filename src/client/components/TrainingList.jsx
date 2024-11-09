import Training from "./Training";
import { useTrainings } from "../hooks/useTrainings";


const TrainingList = ({ trainings = [] }) => {
    const { removeTraining, updateTrainingsStatus, isLoading, error } = useTrainings();
    return (
        <>  
            {trainings.map((training, index) => (
                <Training
                    key={training._id}
                    selectedSkill={training.selectedSkill}
                    totalExp={training.totalExp}
                    goals={training.goals}
                    index={index}
                    onDelete={() => removeTraining(training._id.toString())}
                    onCompleate={() => updateTrainingsStatus(training._id.toString(), training.selectedSkill)}
                    trainingId={training._id.toString()}
                    progress={training.progress} />
            ))}
            {isLoading && <p>Usuwanie treningu...</p>}
            {error && <p>{error}</p>}
        </>
    );
}

export default TrainingList;
