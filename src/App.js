import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes } from './requests';
import { useQuery } from 'react-query';

const App = () => {

  const anecdoteFetchResult = useQuery('anecdotes', getAnecdotes);

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
    console.log('vote');
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
