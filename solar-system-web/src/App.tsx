import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Signup } from './pages/signup/Signup';
import { Login } from './pages/login/Login';
import { AuthContext } from './context/AuthContext';
import { Protected } from './pages/Protected';
import './App.css';
import { Home } from './pages/home/Home';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/home',
      element: <Protected><Home /></Protected>
    },
    // {
    //   path: '/home/:planet',
    //   element: <Protected><Canvas><Earth positionPlanet={[-0.7, 0, 3.3]} positionLight={[2, 0, 6]} /></Canvas></Protected>
    // }
  ])

  return (
    <div className="App">
      <AuthContext>
        <RouterProvider router={router}></RouterProvider>
      </AuthContext>
    </div>
  );
}

export default App;
