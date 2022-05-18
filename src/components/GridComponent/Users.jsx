import React, { useCallback, useRef, useState } from 'react'
import axios from 'axios';
import ReactCanvasConfetti from "react-canvas-confetti";
import Loader from './Loader/Loader';
import Card from './Card/Card';
import './Users.scss'

const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: -100,
    left: 0
};

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const refAnimationInstance = useRef(null);

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
            refAnimationInstance.current({
                ...opts,
                origin: { y: 0.7 },
                particleCount: Math.floor(200 * particleRatio)
            });
    }, []);

    const fire = useCallback(() => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55
        });

        makeShot(0.2, {
            spread: 60
        });

        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45
        });
    }, [makeShot]);

    const getUsers = async () => {
        setLoading(true);
        const { data: { data } } = await axios.get('https://reqres.in/api/users?page=1')
        console.log(data)
        setUsers(data);
        setLoading(false);
        fire()
    }

    return (
        <div className="User-Users__box">
            <h1>{users.length === 0 ? 'OOps :(. No users to display. Click to view users' : 'Tadaaaa!!!!!'}</h1>
            <button className='btn'
                onClick={getUsers}
            >
                <span></span>
                <span></span>
                <span></span>
                <span></span> Click me
                <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
            </button>
            <br />
            {
                users.length === 0 ?
                    loading && <Loader />
                    : (
                        <div className="User-user_grid_box">
                            {
                                users.map(user => (
                                    <Card key={user.id} user={user} />
                                ))
                            }
                        </div>
                    )
            }
        </div>
    )
}

export default Users