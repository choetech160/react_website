import React, {useState} from 'react'
import { EN_MenuItems, FR_MenuItems } from './MenuItems';
import { Link } from 'react-router-dom';
import './Dropdown.css';


function Dropdown(props) {
    let MenuItems = EN_MenuItems
    if (props.lang === 'EN'){
        MenuItems = EN_MenuItems;
    }
    else if (props.lang === 'FR'){
        MenuItems = FR_MenuItems;
    }
    else {
        MenuItems = EN_MenuItems;
    }
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    return (
        <>
            <ul onClick={handleClick} className={click ? 'dropdown-menu clicked':'dropdown-menu'}>
                {MenuItems.map((item, index) => {
                    return(
                        <li key={index}>
                            <Link className={item.cName} to={item.path} onClick={()=>setClick(false)}>
                                {item.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Dropdown
