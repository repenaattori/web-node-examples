import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navigation';
import AuthorizationExample from './components/AuthorizationExample';
import Students from './components/Students';


/**
 * App contains only routing links to examples.
 * NavigationBar is shared with all the routes.
 */
function App() {

  return (
    <div>
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<h1>Welcome!</h1>}/>
        <Route path='/auth' element={<AuthorizationExample/>}/>
        <Route path='/students' element={<Students/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
