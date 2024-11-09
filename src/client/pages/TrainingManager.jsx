import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import TrainingList from "../components/TrainingList";

const TrainingManager = () => {
    const { user } = useAuthContext();
    if (!user) { return <div>Ładowanie....</div>; }
    return (
        <div className="training-box-wrapper">
            <TrainingList trainings={user.trainings} />
        </div>
    );
};

export default TrainingManager;
