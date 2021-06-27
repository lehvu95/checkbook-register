import React, {useEffect, useState, useReducer} from 'react';

import {DEPOSIT, WITHDRAW, TRANSFER} from './constants';

export const AccountRow = props => {
  const {account, amount, type, to, from, date, total} = props;

  const getLabel = () => {
    if (total) {
      return `Total ${account}`;
    }
    if (from && to) {
      return `${type} from ${from} to ${to}`;
    }
    return type;
  };

  // since budgeting, 0 will be shown as negative
  const isPositive = () => {
    switch (type) {
      case DEPOSIT:
        return true;
      case WITHDRAW:
        return false;
      case TRANSFER:
        return to === account;
      default:
        return amount > 0;
    }
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const getRow = () => {
    const isAmountPositive = isPositive();
    const displayAmount = isAmountPositive ? amount : amount * -1;
    const rowId = isAmountPositive ? 'positive' : 'negative';
    return total ? <>
      <th>{date}</th>
      <th className='message'>{getLabel()}</th>
      <th className={rowId}>{formatter.format(displayAmount)}</th>
    </> : <>
      <td>{date}</td>
      <td className='message'>{getLabel()}</td>
      <td className={rowId}>{formatter.format(displayAmount)}</td>
    </>
  }
  
  return <tr>{getRow()}</tr>;
}

export default AccountRow;