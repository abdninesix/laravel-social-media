import React, { useEffect, useState } from 'react'
import { UsersAPI } from '../services/user';
import { useParams } from 'react-router-dom';
import { ProfileResponse } from '../types/user';
import { base_url } from '../utils/axios';

const Profile = () => {

    const { userId } = useParams();

    const [thisUser, setThisUser] = useState<ProfileResponse>();

    useEffect(() => {
        if (userId) {
            loadUser(userId);
        }
    }, [userId]);

    async function loadUser(userId: string) {
        try {
            const res = await UsersAPI.getUserById(userId);
            setThisUser(res.data)
            console.log(thisUser)
        } catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }


    return (
        <div>
            <h1>{thisUser?.email}</h1>
            <h1>{thisUser?.name}</h1>
            <p>{thisUser?.description}</p>
            <img src={`${base_url}/storage/avatars/${thisUser?.avatar}`} />
        </div>
    )
}

export default Profile