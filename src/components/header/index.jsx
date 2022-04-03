import { useContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Link } from 'react-router-dom';

import { AuthContext } from "../../contexts/auth.context";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const signOut = (e) => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/login');
  }

  const handleAddFormPopup = () => {
    document.getElementById('add-with-status-1').click();
  }

  return (
    <>
      <div className="px-6 py-4 bg-blue-100 shadow-md">
        <div className="container flex justify-between mx-auto">
          { useLocation().pathname === '/' ? <button onClick={handleAddFormPopup} className="py-1 px-5 bg-blue-600 disabled:hover:bg-blue-600 disabled:opacity-75 hover:bg-blue-800 active:scale-95 text-white rounded-md transition-all">Add New Ticket</button> : <Link to='/' className="text-blue-600 text-sm center font-bold hover:underline align-middle flex justify-end items-center">Back to Dashboard</Link> }
          <div className="flex justify-end items-center">
            <div className="text-md mr-5 text-sm hidden md:block text-stone-600">Welcome <span className="font-bold">{ currentUser }</span>!</div>
            <button className="py-1 px-5 bg-blue-600 disabled:hover:bg-blue-600 disabled:opacity-75 hover:bg-blue-800 active:scale-95 text-white rounded-md transition-all" onClick={signOut}>Sign Out</button>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  )
};

export default Header;