import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Link,Route,Routes } from 'react-router-dom';
import { AdminLogin } from './video-components/admin-login';
import { AdminError } from './video-components/admin-error';
import { AdminDashboard } from './video-components/admin-dashboard';
import { AdminRegister } from './video-components/admin-register';
import { AddVideo } from './video-components/add-video';
import { UserLogin } from './video-components/user-login';
import { UserRegister } from './video-components/user-register';
import { VideoHome } from './video-components/video-home';
import { UserDashboard } from './video-components/user-dashboard';
import { EditVideo } from './video-components/edit-video';
import { DeleteVideo } from './video-components/delete-video';

function App() {
   
     return(
      <div className='container-fluid'>
        <BrowserRouter>
            <header className='p-2 d-flex justify-content-between fs-5 text-center bg-dark text-white'><Link to='/' className='text-decoration-none text-white'>Video Library Project</Link><Link to='/user-login' className='bi bi-person-fill text-decoration-none text-white'>User Login</Link></header>
              <section className='mt-4'>
                <Routes>
                  <Route path='/' element={<VideoHome/>}></Route>
                    <Route path='/admin-login' element={<AdminLogin/>}></Route>
                    <Route path='/error' element={<AdminError/>}></Route>
                    <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>
                    <Route path='/register-admin' element={<AdminRegister/>}></Route>
                    <Route path='/add-video' element={<AddVideo/>}></Route>
                    <Route path='/user-login' element={<UserLogin/>}></Route>
                    <Route path='/register-user' element={<UserRegister/>}></Route>
                    <Route path='/user-dashboard' element={<UserDashboard/>}></Route>
                    <Route path='/edit-video/:id' element={<EditVideo/>}></Route>
                    <Route path='/delete-video/:id' element={<DeleteVideo/>}></Route>
                </Routes>
            </section>
        </BrowserRouter>
      </div>
     )
    }

export default App;
