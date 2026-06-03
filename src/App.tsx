import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'

import LandingPage from './pages/LandingPage'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import AboutPage from './pages/AboutPage'
import AdminDashboard from './dashboard/AdminDashboard' 
import Error from './components/error/Error'
import VerifyUser from './pages/auth/VerifyUser'
import { Toaster } from 'sonner'
import Todos from './dashboard/AdminDashboard/todos/Todos'
import Users from './dashboard/AdminDashboard/manageusers/Users'
import Profile from './dashboard/Profile'
import { type RootState } from './app/store'
import { useSelector } from 'react-redux'
import UserTodos from './dashboard/UserDashboard/todos/UserTodos' 
import UserProfile from './dashboard/UserDashboard/UserProfile' 
import UserDashboard from './dashboard/UserDashboard/UserDashboard'


function App() {
  const isAdmin = useSelector((state: RootState) => state.user.user?.role === 'admin');
  const isUser = useSelector((state: RootState) => state.user.user?.role === 'user');

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/register/verify',
      element: <VerifyUser />
    },
    {
      path: '/login',
      element: <Login />
    },

    // Admin Dashboard
    {
      path: 'admin/dashboard',
      element: isAdmin ? <AdminDashboard /> : <Login />, // Add check role
      children: [
        {
          path: 'todos',
          element: <Todos/>
        },
        {
          path: 'users',
          element: <Users />
        },
        {
          path: 'profile',
          element: <Profile />
        },
        {
          path: 'analytics',
          element: <h1>Welcome to Analytics</h1>
        }
      ]
    },

    //Users Dashboard
    {
      path: 'user/dashboard',
      element: isUser ? <UserDashboard /> : <LandingPage/>, // Add check role
      children: [
        {
          path: 'todos',
          element: <UserTodos/>
        },
        {
          path: 'profile',
          element: <UserProfile />
        },
        {
          path: 'analytics',
          element: <h1>Welcome to Analytics</h1>
        }
      ]
    },
    {
      path: '*',
      element: <Error />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position='top-right' toastOptions={{
        classNames: {
          error: 'bg-red-500 text-white',
          success: 'bg-green-500 text-white',
          info: 'bg-blue-500 text-white',

        }

      }} />
    </>
  )
}

export default App
