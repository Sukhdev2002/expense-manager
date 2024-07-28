import React from 'react'
import FinanceAnalyzer from '../financeAnalyzer/index';
function Investment() {
  const moduleName = "investment";
  return (
    <div >
      <FinanceAnalyzer module={moduleName} />
    </div>
  )
}

export default Investment