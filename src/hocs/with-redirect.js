import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../contexts/auth.context";

const WithRedirect = (WrappedComponent) => {
  const WithRedirectComponent = (props) => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (currentUser === null) {
        navigate('/login');
      }
    });
  
    return <WrappedComponent { ...props } />
  };
  
  return WithRedirectComponent;
};

export default WithRedirect;