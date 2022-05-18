import React, { useState } from 'react'
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion'
import Amazon from '../../assets/amazon.png'
import './Navbar.scss'


const Navbar = () => {

    const [Toggle, setToggle] = useState(false);

    const handleOnClick = (e) => {
        e.stopPropagation();
        setToggle((prevState) => !prevState);
    };

    return (
        <nav className='app__navbar'>
            <div className='app__navbar-logo'>
                <img src={Amazon} alt="logo" />
            </div>
            <ul className='app__navbar-links'>
                {['home', 'about', 'work', 'contact'].map((item) => (
                    <li
                        key={`link-${item}`}
                        className='app__flex p-text'
                    >
                        <a href={`#${item}`}>
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
            <div className='app__navbar-menu'>
                <HiMenuAlt4 onClick={(e) => handleOnClick(e)} />
                {Toggle && (
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 300 }}
                        transition={{ duration: 0.85, ease: 'easeOut' }}
                    >
                        <motion.span
                            initial={{ width: 0 }}
                            animate={{ width: 70 }}
                            transition={{ duration: 0.85, ease: 'easeOut' }}
                        >
                            <HiX onClick={(e) => handleOnClick(e)} />
                        </motion.span>
                        <ul>
                            {['home', 'about', 'work', 'contact'].map((item) => (
                                <li
                                    key={item}
                                >
                                    <a
                                        href={`#${item}`}
                                        onClick={() => { setToggle(false) }}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )
                }
            </div>
        </nav>
    )
}

export default Navbar