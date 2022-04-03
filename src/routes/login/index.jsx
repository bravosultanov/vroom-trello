import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../../contexts/auth.context";
import { ReactComponent as Preloader } from '../../assets/loader.svg';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorForm, setErrorForm] = useState({ email: false, password:false });
  const [loadingIndicator, setLoadingIndicator] = useState(false);

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let errorsCount = 0;
    
    setLoadingIndicator(true);
    setTimeout(() => {
      if (formData.email !== 'test@vroom.com.au') {
        errorsCount++;
        setErrorForm(prevState => ({
          ...prevState,
          email: true 
        }));
      }
      if (formData.password !== 'frontendtest2022') {
        errorsCount++;
        setErrorForm(prevState => ({
          ...prevState,
          password: true
        }));
      }

      setLoadingIndicator(false);
      
      if (errorsCount === 0) {
        setCurrentUser(formData.email);
        localStorage.setItem('user', formData.email);
        navigate('/');
      }
    }, 1800);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
    setErrorForm(prevState => ({
      email: false,
      password: false
    }));
  };
  
  // Just in case if user is logged in redirect to home page
  useEffect(() => {
    if (currentUser !== null) {
      navigate('/');
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-l from-cyan-500 to-blue-500 flex justify-center items-center">
      <div className="py-8 px-8 bg-white rounded-lg drop-shadow-2xl">
        <form onSubmit={onSubmitHandler}>
          <div>
            <h1 className="text-2xl font-bold text-center mb-1">Sign In</h1>
            <p className="text-sm mb-3">Please authorize to access your dashboard</p>
          </div>
          <div>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className={`${ errorForm.email ? 'border-red-500' : null } block text-sm py-2 px-4 rounded-md w-full border outline-none`} required />
            { errorForm.email ? <p className="text-red-500 text-xs italic mt-1">Incorrect email is entered</p> : null }
            
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" className={`${ errorForm.password ? 'border-red-500' : null } mt-4 block text-sm py-2 px-4 rounded-md w-full border outline-none`} minLength="6" required />
            { errorForm.password ? <p className="text-red-500 text-xs italic mt-1">Incorrect password is entered</p> : null }
          </div>
          <div className="text-center mt-6">
            <button disabled={loadingIndicator} className="py-3 text-md bg-blue-600 disabled:hover:bg-blue-600 disabled:opacity-75 hover:bg-blue-800 active:scale-95 text-white w-full rounded-md transition-all">
              { loadingIndicator ? <Preloader className="h-6 absolute ml-2" /> : null }
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Login;