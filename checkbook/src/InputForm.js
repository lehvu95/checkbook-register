import React, {useEffect, useState, useReducer} from 'react';
import {mockData, DEPOSIT, TRANSFER, WITHDRAW, CHECKING, SAVINGS, EXTERNAL} from './constants';

const inputReducer = (state, event) => {
  if (event.reset) {
    return {
      amount: '',
      from: '',
      to: '',
      type: '',
    };
  }
  return {
    ...state,
    [event.name]: event.value
  }
}

export const InputForm = props => {
  const {type: actionType} = props;

  const [inputData, setInputData] = useReducer(inputReducer, {type: actionType});

  useEffect(() => {
    setInputData({name: 'type', value: actionType});
  }, [actionType]);

  const getDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy  + '-' + mm + '-' + dd;
  }
  
  const updateTxns = (txn) => {
    const {amount, from, to, type} = txn;

    const newAmount = Number(amount);
    const today = getDate();

    const item = {
      type,
      amount: newAmount,
      date: today,
    }

    switch (type) {
      case WITHDRAW:
        mockData[from].transactions.push(item);
        mockData[from].total = mockData[from].total - newAmount;
        break;
      case DEPOSIT:
        mockData[to].transactions.push(item);
        mockData[to].total = mockData[to].total + newAmount;
        break;
      default:
        item.to = to;
        item.from = from;
        if (from !== EXTERNAL) {
          mockData[from].transactions.push(item);
          mockData[from].total = mockData[from].total - newAmount;
        }
        if (to !== EXTERNAL) {
          mockData[to].transactions.push(item);
          mockData[to].total = mockData[to].total + newAmount;
        }
    }
    console.log(mockData);
  }

  const handleSubmit = event => {
    event.preventDefault();
    updateTxns(inputData);
    setInputData({reset: true});
    setInputData({name: 'type', value: actionType});
  };

  const handleChange = event => {
    setInputData({
      name: event.target.name,
      value: event.target.value,
    })
  }

  const getDropdown = (to, from) => {
    switch (actionType) {
      case DEPOSIT:
        return <th>
          into <select name="to" onChange={handleChange} value={to || ''}>
              <option value="">--Select Account--</option>
              <option value={CHECKING}>{CHECKING}</option>
              <option value={SAVINGS}>{SAVINGS}</option>
          </select>
        </th>;
      case WITHDRAW:  
        return <th>
          from <select name="from" onChange={handleChange} value={from || ''}>
              <option value="">--Select Account--</option>
              <option value={CHECKING}>{CHECKING}</option>
              <option value={SAVINGS}>{SAVINGS}</option>
          </select>
        </th>;
      default:
        return <>
          <th>
            from <select name="from" onChange={handleChange} value={from || ''}>
                <option value="">--Select Account--</option>
                <option value={CHECKING}>{CHECKING}</option>
                <option value={SAVINGS}>{SAVINGS}</option>
                <option value={EXTERNAL}>{EXTERNAL}</option>
            </select>
          </th>
          <th>
            to <select name="to" onChange={handleChange} value={to || ''}>
                <option value="">--Select Account--</option>
                <option value={CHECKING}>{CHECKING}</option>
                <option value={SAVINGS}>{SAVINGS}</option>
                <option value={EXTERNAL}>{EXTERNAL}</option>
            </select>
          </th>
        </>;
    }
  }

  const getDisableButton = (amount, to, from) => {
    switch (actionType) {
      case WITHDRAW:
        return amount === '' || from === '';
      case DEPOSIT:
        return amount === '' || to === '';
      default:
        return amount === '' || (to === '' || from === '') || to === from;
    }
  }

  const getForm = () => {
    const {amount, to, from} = inputData;

    const shouldDisable = getDisableButton(amount, to, from);

    return <form onSubmit={handleSubmit}>
      <fieldset>
        <table>
          <th>
            {actionType} <input name='amount' onChange={handleChange} value={amount || ''} />
          </th>
          {getDropdown(to, from)}
          <th><button type='submit' disabled={shouldDisable}>{actionType} Amount</button></th>
        </table>
      </fieldset>
    </form>
  };
  
  return <>{getForm()}</>;
}

export default InputForm;