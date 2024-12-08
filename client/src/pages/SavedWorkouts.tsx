import { useQuery, useMutation } from '@apollo/client';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { GET_ME } from '../utils/queries';
import { DELETE_WORKOUT } from '../utils/mutations';
import Auth from '../utils/auth';
import type { User } from '../models/User';

const SavedWorkouts = () => {
  const { loading, error, data } = useQuery(GET_ME);
  console.log("Data from GET_ME:", data);
  const [deleteWorkout] = useMutation(DELETE_WORKOUT);

  const userData: User | undefined = data?.me;

  const handleDeleteWorkout = async (id: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    console.log("Deleting workout with ID:", id);
    try {
      await deleteWorkout({ variables: { id } });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error.message}</h2>;

  // Filter out duplicates if needed
  const uniqueWorkouts = Array.from(
    new Map(userData?.savedWorkouts.map((workout) => [workout.id, workout])).values()
  );

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          <h1>Saved Workouts</h1>
        </Container>
      </div>
      <Container>
        <Row>
          {uniqueWorkouts.map((workout) => (
            <Col md='4' key={workout.id}>
              <Card border='dark'>
                {workout.gifUrl ? (
                  <Card.Img src={workout.gifUrl} alt={`The gif for ${workout.name}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{workout.name}</Card.Title>
                  <p className='small'>Targets: {workout.bodyPart}</p>
                  <Card.Text>Equipment needed: {workout.equipment}</Card.Text>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => handleDeleteWorkout(workout._id)}
                  >
                    Delete this workout
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedWorkouts;
