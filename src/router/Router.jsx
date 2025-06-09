import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from '../Layout/Layout'
import Home from '../pages/home/Home'
import Add from '../pages/add/Add'
import Gig from '../pages/gig/Gig'
import Gigs from '../pages/gigs/Gigs'
import Message from '../pages/message/Message'
import Messages from '../pages/messages/Messages'
import MyGigs from '../pages/myGigs/MyGigs'
import Orders from '../pages/orders/Orders'
import Pay from '../pages/pay/Pay'
import Register from '../pages/register/Register'
import Succes from '../pages/succes/Succes'
import Error from '../pages/error/Error'

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/add' element={<Add/>}/>
                <Route path='/gig' element={<Gig/>}/>
                <Route path='/gigs' element={<Gigs/>}/>
                <Route path='/message' element={<Message/>}/>
                <Route path='/messages' element={<Messages/>}/>
                <Route path='/myGigs' element={<MyGigs/>}/>
                <Route path='/orders' element={<Orders/>}/>
                <Route path='/pay' element={<Pay/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/succes' element={<Succes/>}/>
            </Route>
            <Route path='*' element={<Error/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router