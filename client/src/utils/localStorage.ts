export const getSavedWorkoutIds = () => {
  const savedWorkoutIds = localStorage.getItem('saved_workouts')
    ? JSON.parse(localStorage.getItem('saved_workouts')!)
    : [];

  return savedWorkoutIds;
};

export const savedWorkoutIds = (workoutIdArr: string[]) => {
  if (workoutIdArr.length) {
    localStorage.setItem('saved_workouts', JSON.stringify(workoutIdArr));
  } else {
    localStorage.removeItem('saved_workouts');
  }
};

export const removeWorkoutId = (workoutId: string) => {
  const savedWorkoutIds = localStorage.getItem('saved_workouts')
    ? JSON.parse(localStorage.getItem('saved_workouts')!)
    : null;

  if (!savedWorkoutIds) {
    return false;
  }

  const updatedSavedWorkoutIds = savedWorkoutIds?.filter((savedWorkoutId: string) => savedWorkoutId !== workoutId);
  localStorage.setItem('saved_workouts', JSON.stringify(updatedSavedWorkoutIds));

  return true;
};
