import React, { createContext, useReducer } from 'react';
import UseReducerChildTask from './UseReducerChildTask'
import UseReducerList from './UseReducerChildTask';


// Create context
export const Listcontext=createContext()

// Define initial state
const initialState = {
  num: 0,
  history: []
};

// Define reducer
function reducer(state, action) {
  switch (action.type) {
    case 'INCREASE':
      
      
      return {
        ...state,
        history: [...state.history, state.num],
        num: state.num + 1
      };
    case 'SET_NUM':
      return {
        ...state,
        num: action.payload
      };
    case 'DELETE_FROM_HISTORY':
      return {
        ...state,
        history: state.history.filter((_, i) => i !== action.payload)
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Define the provider component
function UseReducerTask() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const increase = () => dispatch({ type: 'INCREASE' });
  const handleInputChange = (e) => dispatch({ type: 'SET_NUM', payload: Number(e.target.value) });
  const deleteFromHistory = (index) => dispatch({ type: 'DELETE_FROM_HISTORY', payload: index });
  console.log(state.history);

  return (
    <Listcontext.Provider value={{ state, increase, deleteFromHistory }}>
      <div>
        <input
          type='number'
          value={state.num}
          placeholder='Enter the number'
          onChange={handleInputChange}
        />
        <br />
        <button onClick={increase}>Add</button>
        
      </div>
      <UseReducerList />
      
    </Listcontext.Provider>
  );
}

export default UseReducerTask;