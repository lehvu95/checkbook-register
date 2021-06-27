import React from 'react';
import AccountRow from './AccountRow';

export const AccountTable = props => {
  const {data, account} = props;
  const {total, transactions} = data[account];

  return <table>
    <AccountRow account={account} amount={total} total/>
    {transactions.map((row) => {
      const {amount, type, to, from, date} = row;
      return <AccountRow account={account} amount={amount} type={type} to={to} from={from} date={date}/>;
    })}
  </table>;
}

export default AccountTable;