import React, { useState } from 'react';
import '../App.css';

type Workout = {
  id: number;
  name: string;
};

const WorkoutPlanner: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<string | null>(null);

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
    if (!selectedWorkouts.find(w => w.id === workout.id)) {
      setSelectedWorkouts(prevWorkouts => [...prevWorkouts, workout]);
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
        {workouts.map(workout => (
          <div key={workout.id}>
            {workout.name}
            <button onClick={() => addToWorkout(workout)}>Add to Workout</button>
          </div>
        ))}
      </div>

      <div id="selected-workouts">
        <h3>Selected Workouts</h3>
        {selectedWorkouts.map(workout => (
          <div key={workout.id}>{workout.name}</div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlanner;
