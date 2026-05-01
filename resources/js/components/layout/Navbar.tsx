
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../base/Button';
import Avatar from '../base/Avatar';
import { base_url } from '../../utils/axios';

const Navbar = () => {

  const { user, loading, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="bg-white/90 sticky top-0 py-4 px-2 md:px-0 shadow-lg">
      <div className="main-center flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-blue-500">
            <Link to="/">LaravelTalk</Link>
          </h2>
          <Link to="/">Feed</Link>
          <Link to="/following">Following</Link>
        </div>
        <div>
          {(loading == false) && (user ? (
            <div className='flex gap-2'>
              <Link to={`/profile/${user.id}`}>
                <Avatar
                  image={`${base_url}/storage/avatars/${user.image}`}
                  customClass="w-10 h-10" />
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          ) : <Button onClick={() => navigate("/login")} >Log in</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar