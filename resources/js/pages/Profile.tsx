import React, { useEffect, useState } from 'react'
import { UsersAPI } from '../services/user';
import { followAPI } from '../services/follow';
import { useParams } from 'react-router-dom';
import { ProfileResponse } from '../types/user';
import { base_url } from '../utils/axios';
import { useAuth } from '../context/AuthContext';
import ProfileAvatar from '../components/profile/ProfileAvatar';
import Button from '../components/base/Button';
import AboutMe from '../components/profile/AboutMe';
import PostList from '../components/post/PostList';
import ProfileBanner from '../components/profile/ProfileBanner';

const Profile = () => {

    const { userId } = useParams();
    const { user: currentUser } = useAuth();

    const [thisUser, setThisUser] = useState<ProfileResponse>();
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);

    useEffect(() => {
        if (userId) {
            loadUser(userId);
        }
    }, [userId]);

    async function loadUser(userId: string) {
        try {
            const res = await UsersAPI.getUserById(userId);
            setThisUser(res.data)
            setFollowersCount(res.data.followers_count || 0);
        } catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    async function handleFollow() {
        if (!currentUser || !userId) return;

        try {
            if (isFollowing) {
                await followAPI.deleteFollow(userId);
                setIsFollowing(false);
                setFollowersCount(prev => prev - 1);
            } else {
                await followAPI.createFollow(userId);
                setIsFollowing(true);
                setFollowersCount(prev => prev + 1);
            }
        } catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    return (
        <div className="main-center mt-8">

            <div className="relative">
                <ProfileBanner onChange={() => { }} self={currentUser?.id.toString() != thisUser?.id} banner={thisUser?.banner} />
                <ProfileAvatar onChange={() => { }} self={currentUser?.id.toString() != thisUser?.id} avatar={thisUser?.avatar} />
            </div>
            <div
                className={
                    "w-full bg-white rounded-b-md shadow-md p-2 flex flex-col md:flex-row gap-2 justify-between items-center"
                }
            >
                <div className={"flex items-center gap-2 ml-42"}>
                    <b className={"text-2xl"}>{thisUser?.name}</b>
                    <p className={"text"}>(@{thisUser?.email})</p>
                </div>
                {(currentUser?.id.toString() != thisUser?.id && currentUser) && <Button onClick={handleFollow}>{isFollowing ? "Unfollow" : "Follow"}({followersCount})</Button>}
            </div>

            <div className={"flex flex-col mt-4 md:mt-12"}>
                {currentUser?.description && <AboutMe onChange={() => { }} self={currentUser?.id.toString() != thisUser?.id} description={currentUser?.description} />}
                <PostList canPost={false} userId={userId} />
            </div>
        </div>
    )
}

export default Profile