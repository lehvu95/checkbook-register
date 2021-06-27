import React, {useEffect, useState, useReducer} from 'react';
import Button from './Button';

export const ButtonGroup = props => {
  const {items = [], activeButton} = props;

  const renderButton = (item) => {
    const {account, action} = item;
    const type = account ? account : action;
    const isActive = activeButton === type;
    return <Button item={item} isActive={isActive} />
  }
  
  return <div>
    {items.map((item) => {
      return renderButton(item);
    })}
  </div>;
}

export default ButtonGroup;