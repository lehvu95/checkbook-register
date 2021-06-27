// account types
export const CHECKING = 'checking';
export const SAVINGS = 'savings';
export const EXTERNAL = 'external account';

// action types
export const DEPOSIT = 'deposit';
export const WITHDRAW = 'withdraw';
export const TRANSFER = 'transfer';

// mock data
export const mockData = {
  checking: {
    total: 500,
    transactions: [
      {
        type: DEPOSIT,
        amount: 500,
        date: "2021-06-25",
      },
      {
        type: WITHDRAW,
        amount: 75,
        date: "2021-06-26",
      },
      {
        type: TRANSFER,
        amount: 75,
        from: SAVINGS,
        to: CHECKING,
        date: "2021-06-27",
      },
    ],
  },
  savings: {
    total: 4000,
    transactions: [
      {
        type: DEPOSIT,
        amount: 5000,
        date: "2021-06-25",
      },
      {
        type: WITHDRAW,
        amount: 1000,
        date: "2021-06-26",
      },
      {
        type: TRANSFER,
        amount: 75,
        from: SAVINGS,
        to: CHECKING,
        date: "2021-06-27",
      },
      {
        type: TRANSFER,
        amount: 75,
        from: EXTERNAL,
        to: SAVINGS,
        date: "2021-06-28",
      },
    ],
  },
}

// button maps
export const ACCOUNT_BTNS = {
  [CHECKING]: {
    label: 'Checking',
  },
  [SAVINGS]: {
    label: 'Savings',
  }
};

export const ACTION_BTNS = {
  [DEPOSIT]: {
    label: 'Deposit',
  },
  [WITHDRAW]: {
    label: 'Withdraw',
  },
  [TRANSFER]: { 
    label: 'Transfer',
  }
};