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
import CreateListing from './Pages/CreateListing.jsx'
import UserListings from './Pages/UserListings.jsx'
import UpdateListing from './Pages/UpdateListing.jsx'
import Listing from './Pages/Listing.jsx'
import SearchPage from './Pages/SearchPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path='listing/:listingId' element={<Listing />} /> 
      <Route element={<PrivatRoute />}>
        <Route path="profile" element={<Profile />} />
        <Route path="create-listing" element={<CreateListing />} />
        <Route path="getListings" element={<UserListings />} />
        <Route path="updateListings" element={<UpdateListing />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path='search' element={<SearchPage />}/>
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
