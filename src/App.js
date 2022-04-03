import { Routes, Route } from 'react-router-dom';

import Home from './routes/home';
import Login from './routes/login';
import Details from './routes/details';
import IncorrectPage from './routes/incorrectPage';
import Header from './components/header';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={ <Login /> }></Route>

      <Route path='/' element={ <Header /> }>
        <Route index element={ <Home /> }></Route>
        <Route path='ticket/:id' element={ <Details /> }></Route>
        <Route path='*' element={ <IncorrectPage /> }></Route>
      </Route>
      
    </Routes>
  )
};

export default App;
