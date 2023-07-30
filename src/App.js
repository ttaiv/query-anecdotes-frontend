import { useNotificationDispatch } from './NotificationContext';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, updateAnecdote } from './requests';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const App = () => {

  const anecdoteFetchResult = useQuery('anecdotes', getAnecdotes);
  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => queryClient.invalidateQueries('anecdotes')
  });

  const dispatch = useNotificationDispatch();

  if (anecdoteFetchResult.isLoading) {
    return (
      <div> loading data... </div>
    );
  }
  if (anecdoteFetchResult.isError) {
    return (
      <div> Anecdote service not available due to problems in server </div>
    );
  }
  const anecdotes = anecdoteFetchResult.data;

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    updateAnecdoteMutation.mutate(updatedAnecdote);
    dispatch({ type: 'VOTE', payload: anecdote.content });
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
