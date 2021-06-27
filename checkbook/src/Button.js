import React, {useEffect, useState, useReducer} from 'react';

export const Button = props => {
  const {item: {
    account, action, label, onClick
  }, isActive,} = props;

  const id = account ? account : action;
  const buttonId = isActive ? `active ${id}` : `${id}`;

  return <button className={buttonId} onClick={onClick} disabled={isActive}>
    {label}
  </button>;
}

export default Button;