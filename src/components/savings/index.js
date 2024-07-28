import React from 'react'
import FinanceAnalyzer from '../financeAnalyzer/index';
function Savings() {
  const moduleName = "saving";
  return (
    <div >
      <FinanceAnalyzer module={moduleName} />
    </div>
  )
}

export default Savings