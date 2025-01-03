import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Signup } from './pages/signup/Signup';
import { Login } from './pages/login/Login';
import { AuthContext } from './context/AuthContext';
import { Protected } from './pages/Protected';
import './App.css';
import { Home } from './pages/home/Home';
import { Quizz } from './pages/quizz/Quizz';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PictureOfDay } from './pages/pictureOfDay/PictureOfDay';
import { QuizzProvider } from './context/QuizzContext';
import { VoiceAssistantProvider } from './context/VoiceAssistantContext';


export function App() {
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
    {
      path: '/quizz',
      element: <Protected><Quizz /></Protected>
    },
    {
      path: '/pictureOfDay',
      element: <Protected><PictureOfDay /></Protected>
    }
  ])

  return (
    <div className="App">
      <AuthContext>
        <QuizzProvider>
          <VoiceAssistantProvider>
            <RouterProvider router={router}></RouterProvider>
          </VoiceAssistantProvider>
        </QuizzProvider>
      </AuthContext>
    </div>
  );
}
