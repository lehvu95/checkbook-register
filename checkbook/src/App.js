import './App.css';
import React, {useEffect, useState, useReducer} from 'react';
import ActionsComponent from './ActionsComponent';
import AccountsComponent from './AccountsComponent';
import {mockData, WITHDRAW, DEPOSIT, TRANSFER, EXTERNAL} from './constants';

const dataReducer = (state = mockData, action = {}) => {
  const {type, data} = action;
  if (data) {
    const {to, from, amount} = data;
    switch (type) {
      case WITHDRAW:
        state.current = from;
        state[from].transactions.shift(data);
        state[from].total = state[from].total - amount;
        break;
      case DEPOSIT:
        state.current = to;
        state[to].transactions.push(data);
        state[to].total = state[to].total + amount;
        break;
      case TRANSFER:
        data.to = to;
        data.from = from;
        if (from !== EXTERNAL) {
          state.current = from;
          state[from].transactions.push(data);
          state[from].total = state[from].total - amount;
        }
        if (to !== EXTERNAL) {
          state.current = to;
          state[to].transactions.push(data);
          state[to].total = state[to].total + amount;
        }
        break;
      default:
        return state;
    }
  }
  return state;
}

export const App = () => {
  const [state, dispatch] = useReducer(dataReducer, mockData);
  const [newEntry, setNewEntry] = useState();

  useEffect(() => {
    setNewEntry();
  }, [newEntry])

  const addEntry = (type, data) => {
    setNewEntry(data);
    dispatch({type, data});
  };

  return (
    <div className="App">
      <header className="App-header">
        Checkbook Register
      </header>
      <ActionsComponent addEntry={addEntry}/>
      <AccountsComponent data={state}/>
    </div>
  );
}

export default App;
