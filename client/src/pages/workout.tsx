import React, { useState } from 'react';
import '../App.css';
import { useMutation } from '@apollo/client'; 
import { SAVE_WORKOUT } from '../utils/mutations'; 
import { savedWorkoutIds, getSavedWorkoutIds } from '../utils/localStorage';
import AuthService from '../utils/auth'; 

type Workout = {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
};

const WorkoutPlanner: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saveWorkout] = useMutation(SAVE_WORKOUT);

  const fetchWorkouts = async (bodyPart: string) => {
    try {
      const response = await fetch(`/api/workouts/exercises/${bodyPart}`); // Connects to your backend
      if (!response.ok) {
        throw new Error(`Error fetching workouts: ${response.status}`);
      }
      const data = await response.json();
      setWorkouts(data);
      setError(null); // Clear any previous errors
    } catch (err: any) {
      console.error('Error fetching workouts:', err);
      setError(err.message || 'An unknown error occurred.');
    }
  };

  const addToWorkout = (workout: Workout) => {
    if (!selectedWorkouts.find((w) => w.id === workout.id)) {
      setSelectedWorkouts((prevWorkouts) => [...prevWorkouts, workout]);
    }
  };

  const handleSaveWorkout = async (workoutId: string) => { 
    const workoutToSave: Workout = selectedWorkouts.find((workout: Workout) => workout.id === workoutId)!;
    console.log(workoutToSave);
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const parsedWorkoutToSave = {id:workoutToSave.id, name:workoutToSave.name, bodyPart:workoutToSave.bodyPart, equipment:workoutToSave.equipment, gifUrl:workoutToSave.gifUrl}
      await saveWorkout({
        variables: { workoutInput: { ...parsedWorkoutToSave } },
      });
  
      const saveWorkoutIds = getSavedWorkoutIds();
      savedWorkoutIds([...saveWorkoutIds, workoutToSave.id]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div id="body-diagram-container">
        <div id="body-diagram" style={{ position: 'relative', width: '200px', height: '400px' }}>
          <img src="/Anatomical_Position.png" alt="Body Diagram" style={{ width: '100%', height: 'auto' }} />
          <button className="neck-button" onClick={() => fetchWorkouts('neck')}>Neck</button>
          <div className="line neck-line"></div>
          <button className="upper-arms-button" onClick={() => fetchWorkouts('upper arms')}>Upper Arms</button>
          <div className="line upper-arms-line"></div>
          <button className="chest-button" onClick={() => fetchWorkouts('chest')}>Chest</button>
          <div className="line chest-line"></div>
          <button className="lower-arms-button" onClick={() => fetchWorkouts('lower arms')}>Lower Arms</button>
          <div className="line lower-arms-line"></div>
          <button className="lower-legs-button" onClick={() => fetchWorkouts('lower legs')}>Lower Legs</button>
          <div className="line lower-legs-line"></div>
          <button className="upper-legs-button" onClick={() => fetchWorkouts('upper legs')}>Upper Legs</button>
          <div className="line upper-legs-line"></div>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div id="workout-list">
        <h3>Workouts</h3>
        {workouts.map((workout) => (
          <div key={workout.id}>
            {workout.name}
            <button onClick={() => addToWorkout(workout)}>Add to Workout</button>
          </div>
        ))}
      </div>

      <div id="selected-workouts">
        <h3>Selected Workouts</h3>
        {selectedWorkouts.map((workout) => (
          <div key={workout.id}>
            {workout.name}
            <button onClick={() => handleSaveWorkout(workout.id)}>Save Workout</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlanner;
