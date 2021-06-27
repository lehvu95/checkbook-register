import React, {useEffect, useState, useReducer} from 'react';
import ButtonGroup from './ButtonGroup';
import AccountTable from './AccountTable';
import {mockData, ACCOUNT_BTNS, CHECKING, SAVINGS} from './constants';

export const AccountsComponent = props => {
  const [displayedAccount, setDisplayedAccount] = useState(CHECKING);
  
  const selectAccount = account => {
    setDisplayedAccount(account);
  }

  const accountButtons = [
    {
      account: CHECKING,
      label: ACCOUNT_BTNS[CHECKING].label,
      onClick: () => selectAccount(CHECKING),
    },
    {
      account: SAVINGS,
      label: ACCOUNT_BTNS[SAVINGS].label,
      onClick: () => selectAccount(SAVINGS),
    },
  ];

  return <div>
    <ButtonGroup
      activeButton={displayedAccount}
      items={accountButtons}
    />
    <AccountTable
      account={displayedAccount}
    />
  </div>;
}

export default AccountsComponent;