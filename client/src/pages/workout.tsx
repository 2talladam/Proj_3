import React, { useState } from 'react';
import '../App.css';
import { useMutation } from '@apollo/client'; 
import { SAVE_WORKOUT } from '../utils/mutations'; 
import { savedWorkoutIds, getSavedWorkoutIds } from '../utils/localStorage';
import AuthService from '../utils/auth'; 

type Workout = {
  id: number;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  sets: number;
  reps: number;
};

const WorkoutPlanner: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saveWorkout] = useMutation(SAVE_WORKOUT);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  const [isSelectedModalOpen, setIsSelectedModalOpen] = useState<boolean>(false); 
  const [searchTerm, setSearchTerm] = useState<string>(''); 

  const fetchWorkouts = async (bodyPart: string) => {
    try {
      const response = await fetch(`/api/workouts/exercises/${bodyPart}`);
      if (!response.ok) {
        throw new Error(`Error fetching workouts: ${response.status}`);
      }
      const data = await response.json();

      if (data.length === 0) {
        setError(null);
        setIsModalOpen(true);
        setWorkouts([]);
      } else {
        setWorkouts(data);
        setError(null);
        setIsModalOpen(true);
      }
    } catch (err: any) {
      console.error('Error fetching workouts:', err);
      setError(err.message || 'An unknown error occurred.');
      setWorkouts([]);
      setIsModalOpen(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (searchTerm.trim()) {
      fetchWorkouts(searchTerm.trim()); 
    }
  };

  const addToWorkout = (workout: Workout) => {

    if (!selectedWorkouts.find((w) => w.id === workout.id)) {
      setSelectedWorkouts(prevWorkouts => [
        ...prevWorkouts,
        { ...workout, sets: 1, reps: 5 }, 
      ]);
    }};

  const handleSaveWorkout = async (workoutId: number) => { 
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

  const deleteWorkout = (id: number) => {
    setSelectedWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout.id !== id));
  };

  const updateSets = (id: number, change: number) => {
    setSelectedWorkouts(prevWorkouts =>
      prevWorkouts.map(workout =>
        workout.id === id ? { ...workout, sets: workout.sets + change } : workout
      )
    );
  };

  const updateReps = (id: number, reps: number) => {
    setSelectedWorkouts(prevWorkouts =>
      prevWorkouts.map(workout =>
        workout.id === id ? { ...workout, reps } : workout
      )
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeSelectedModal = () => {
    setIsSelectedModalOpen(false);
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

      <div className='caption-container'>
        <p>Can't find the body part you're wanting to workout? Search here instead:</p> 
      </div>

      <div className="search-bar-container">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for body part..."
            className="search-bar"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

      {error && <div className="error">{error}</div>}

      {isModalOpen && (
        <div>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal2">
            <div className="modal2-content">
              <button className="close-button2" onClick={closeModal}>X</button>
              <h3>Workouts</h3>
              {workouts.length > 0 ? (
                workouts.map(workout => (
                  <div key={workout.id}>
                    {workout.name}
                    <button
                      className="add-to-workout-btn"
                      onClick={() => {
                        addToWorkout(workout);
                        closeModal();
                      }}
                    >
                      Add to Workout
                    </button>
                  </div>
                ))
              ) : (
                <p>Sorry, no exercises for this body part yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <button className="selected-workouts-button" onClick={() => setIsSelectedModalOpen(true)}>
        View Selected Workouts
      </button>

      {isSelectedModalOpen && (
        <div className="modal2">
          <div className="modal2-content">
            <button className="close-button2" onClick={closeSelectedModal}>X</button>
            <h3>Selected Workouts</h3>
            {selectedWorkouts.length > 0 ? (
              selectedWorkouts.map(workout => (
                <div key={workout.id} style={{ marginBottom: '10px' }}>
                  <div>
                    {workout.name} (Sets: {workout.sets}, Reps: {workout.reps})
                    <button className='save-workout-btn' onClick={() => handleSaveWorkout(workout.id)}>Save Workout</button>
                    <button className='delete-btn' onClick={() => deleteWorkout(workout.id)}>
                      Delete
                    </button>
                  </div>
                  <div>
                    <span>Sets: </span>
                    <button onClick={() => updateSets(workout.id, -1)}>-</button>
                    <span style={{ margin: '0 10px' }}>{workout.sets}</span>
                    <button onClick={() => updateSets(workout.id, 1)}>+</button>
                  </div>
                  <div>
                    <span>Reps: </span>
                    <select
                      value={workout.reps}
                      onChange={e => updateReps(workout.id, parseInt(e.target.value))}
                    >
                      {Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map(value => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))
            ) : (
              <p>No selected workouts yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanner;
