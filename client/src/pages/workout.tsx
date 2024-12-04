import React, { useState } from 'react';

type Workout = {
  id: number;
  name: string;
};

const WorkoutPlanner: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState<Workout[]>([]);

  const fetchWorkouts = async (bodyPart: string) => {
    const apiKey = '0bd3a00f1emsh6b870611819c60dp131924jsn2fd109f2a6e1';
    try {
      const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=10&offset=0`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '0bd3a00f1emsh6b870611819c60dp131924jsn2fd109f2a6e1',
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
      <div id="body-diagram" style={{ position: 'relative', width: '200px', height: '400px' }}>
        <img src="" alt="Body Diagram" style={{ width: '100%', height: 'auto' }} />
        {/* Add buttons around the image */}
        <button style={{ position: 'absolute', left: '0px', top: '20px' }} onClick={() => fetchWorkouts('neck')}>Neck Workouts</button>
        <button style={{ position: 'absolute', left: '0px', top: '100px' }} onClick={() => fetchWorkouts('chest')}>Chest</button>
        <button style={{ position: 'absolute', right: '0px', top: '100px' }} onClick={() => fetchWorkouts('upper arms')}>Upper Arms</button>
        <button style={{ position: 'absolute', left: '0px', top: '200px' }} onClick={() => fetchWorkouts('lower arms')}>Lower Arms</button>
        <button style={{ position: 'absolute', right: '0px', top: '200px' }} onClick={() => fetchWorkouts('lower legs')}>Lower Legs</button>
        <button style={{ position: 'absolute', left: '0px', top: '300px' }} onClick={() => fetchWorkouts('upper legs')}>Upper Legs</button>
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
