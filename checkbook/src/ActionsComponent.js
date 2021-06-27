import React, {useEffect, useState, useReducer} from 'react';
import ButtonGroup from './ButtonGroup';
import { DEPOSIT, WITHDRAW, TRANSFER, ACTION_BTNS } from './constants';
import InputForm from './InputForm';

export const ActionsComponent = props => {
  const [selectedAction, setSelectedAction] = useState(DEPOSIT);

  const selectAction = action => {
    setSelectedAction(action);
  }

  const actionButtons = [
    {
      account: DEPOSIT,
      label: ACTION_BTNS[DEPOSIT].label,
      onClick: () => selectAction(DEPOSIT),
    },
    {
      account: WITHDRAW,
      label: ACTION_BTNS[WITHDRAW].label,
      onClick: () => selectAction(WITHDRAW),
    },
    {
      account: TRANSFER,
      label: ACTION_BTNS[TRANSFER].label,
      onClick: () => selectAction(TRANSFER),
    },
  ]

  return <div>
    <ButtonGroup
      activeButton={selectedAction}
      items={actionButtons}
    />
    <InputForm
      type={selectedAction}
    />
  </div>;
}

export default ActionsComponent;