import React, {useEffect, useState} from 'react';
import ButtonGroup from './ButtonGroup';
import AccountTable from './AccountTable';
import {ACCOUNT_BTNS, CHECKING, SAVINGS} from './constants';

export const AccountsComponent = props => {
  const {data} = props;
  const {current} = data;
  const [displayedAccount, setDisplayedAccount] = useState(current);

  useEffect(() => {
    setDisplayedAccount(current);
  }, [data, current]);
  
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
      data={data}
      account={displayedAccount}
    />
  </div>;
}

export default AccountsComponent;