import React, { useState } from 'react';
import '../App.css';
type Workout = {
  id: number;
  name: string;
};

const WorkoutPlanner: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState<Workout[]>([]);

  const fetchWorkouts = async (bodyPart: string) => {
    const apiKey = 'd9676c9b30msh91e5c8ffd5cac78p15a938jsn21cfe7eaceb2';
    try {
      const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=10&offset=0`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'd9676c9b30msh91e5c8ffd5cac78p15a938jsn21cfe7eaceb2',
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
      });
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const addToWorkout = (workout: Workout) => {
    setSelectedWorkouts(prevWorkouts => [...prevWorkouts, workout]);
  };

  return (
    <div>
      <div id="body-diagram-container">
     <div id="body-diagram" style={{ position: 'relative', width: '200px', height: '400px' }}>
      <img src="/Anatomical_Position.png" alt="Body Diagram" style={{ width: '100%', height: 'auto' }} />
        <button className="neck-button" onClick={() => fetchWorkouts('neck')}>Neck</button>
        <div className="line neck-line"></div>
        <button className="upper-arms-button"onClick={() => fetchWorkouts('upper arms')}>Upper Arms</button>
        <div className="line upper-arms-line"></div>
        <button className="chest-button"onClick={() => fetchWorkouts('chest')}>Chest</button>
        <div className="line chest-line"></div>
        <button className="lower-arms-button"onClick={() => fetchWorkouts('lower arms')}>Lower Arms</button>
        <div className="line lower-arms-line"></div>
        <button className="lower-legs-button"onClick={() => fetchWorkouts('lower legs')}>Lower legs</button>
        <div className="line lower-legs-line"></div>
        <button className="upper-legs-button"onClick={() => fetchWorkouts('upper legs')}>Upper Legs</button>
        <div className="line upper-legs-line"></div>
      </div>
      </div>
      <div id="workout-list">
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
