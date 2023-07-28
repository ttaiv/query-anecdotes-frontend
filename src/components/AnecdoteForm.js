import { useMutation, useQueryClient } from 'react-query';
import { addAnecdote } from '../requests';

const generateId = () => (Math.random() * 1000000).toFixed(0);

const AnecdoteForm = () => {

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(addAnecdote, {
    onSuccess: () => queryClient.invalidateQueries('anecdotes')
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    newAnecdoteMutation.mutate({ content, votes: 0, id: generateId() });
    event.target.anecdote.value = '';
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
