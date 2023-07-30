import { createContext, useReducer, useContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'CREATE':
    return `New anecdote "${action.payload}" added.`;
  case 'VOTE':
    return `Anecdote "${action.payload}" voted.`;
  case 'BLANK':
    return null;
  case 'ERROR':
    return `${action.payload}`;
  default:
    return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const notificationAndDispatch = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={notificationAndDispatch} >
      {props.children}
    </NotificationContext.Provider>
  );
};

// Dispatch is modified to automatically dispatch also null after 5 seconds of orginal dispatch.
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  const dispatch = notificationAndDispatch[1];
  const set5secNotification = ({ type, payload }) => {
    dispatch({ type, payload });
    setTimeout(() => dispatch({ type: 'BLANK' }), 5000);
  };
  return set5secNotification;
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};