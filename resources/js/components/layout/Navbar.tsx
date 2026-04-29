import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../base/Button';
import Avatar from '../base/Avatar';

const Navbar = () => {

  const { user, loading, logout } = useAuth();

  const navigate = useNavigate();

  const base_url = import.meta.env.VITE_APP_URL

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="bg-white py-4 px-2 md:px-0">
      <div className="main-center flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-blue-500">
            <Link to="/">VibeShare</Link>
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