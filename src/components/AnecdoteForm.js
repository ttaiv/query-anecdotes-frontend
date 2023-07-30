import { useMutation, useQueryClient } from 'react-query';
import { addAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

const generateId = () => (Math.random() * 1000000).toFixed(0);

const AnecdoteForm = () => {

  const dispatch = useNotificationDispatch();
  let newAnecdoteContent = null;

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(addAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
      dispatch({ type: 'CREATE', payload: newAnecdoteContent });
    },
    onError: () => {
      dispatch({ type: 'ERROR', payload: 'Too short anecdote, minium length is 5 characters.' });
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    newAnecdoteContent = event.target.anecdote.value;
    console.log(newAnecdoteContent);
    newAnecdoteMutation.mutate({ content: newAnecdoteContent, votes: 0, id: generateId() });
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
