import React, { useState, useEffect } from 'react';

import _ from 'lodash';
import FinanceAnalyzer from '../financeAnalyzer/index';


const Expense = () => {

  const moduleName = "expense";

  return (
    <div >
      <FinanceAnalyzer module={moduleName} />
    </div>
  );
};

export default Expense;
