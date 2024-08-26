import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Profile from './Pages/Profile.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/Signup.jsx'
import Layout from './layout.jsx'
import { persistor, store } from './Redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import PrivatRoute from './Components/PrivatRoute.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route element={<PrivatRoute />}>
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>,
)
