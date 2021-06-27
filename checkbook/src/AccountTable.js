import React, {useEffect, useState, useReducer} from 'react';
import AccountRow from './AccountRow';
import {mockData} from './constants';

export const AccountTable = props => {
  const {account} = props;

  useEffect(() => {}, [
    mockData[account].total,
  ]);
  
  const {total, transactions} = mockData[account];

  return <table>
    <AccountRow account={account} amount={total} total/>
    {transactions.map((row) => {
      const {amount, type, to, from, date} = row;
      return <AccountRow account={account} amount={amount} type={type} to={to} from={from} date={date}/>;
    })}
  </table>;
}

export default AccountTable;