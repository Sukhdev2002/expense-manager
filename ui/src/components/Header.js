import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
const Header = () => {

    return (
        <div className="header">
            <div><Link to ="/">Dashboard</Link></div>
            <div><Link to = "/expense">Expense</Link></div>
            <div><Link to = "budget">Budget</Link></div>
            <div><Link to ="create-task">create task</Link></div>
            <div><Link to ="tasks">task</Link></div>

        </div>
    )
}

export default Header