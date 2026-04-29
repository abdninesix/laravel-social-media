import React from 'react'
import { useAuth } from '../context/AuthContext';

const Profile = () => {

    const { user } = useAuth();


    return (
        <div>
            <h1>{user?.email}</h1>
            <h1>{user?.name}</h1>
            <p>{user?.description}</p>
            <img src="http://localhost:8000/storage/avatars/Pg92R9Zk6FABFlIvPVp0hpY7GUDlsGaVKPBgIOx3.png"/>
        </div>
    )
}

export default Profile