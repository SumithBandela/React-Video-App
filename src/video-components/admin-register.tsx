import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"


export function AdminRegister(){

    


    let navigate = useNavigate();

    const formik = useFormik({
         initialValues: {
            UserId: "",
            Password:"",
            
         },
         onSubmit: (admin) => {
              axios.post(`http://127.0.0.1:7070/register-admin`, admin)
              .then(()=> {
                  alert('User Registered');
                  navigate('/admin-login');
              })
         }
    })

    

    return(
        <div>
            <form onSubmit={formik.handleSubmit} className="bg-light p-4 m-3 border border-2 border-dark rounded w-25">
                <div className="bi h5 bi-person-fill"> Register User </div>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text"  name="UserId" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning w-100">Register</button>
                <div>
                <Link to="/admin-login">Existing User Login</Link>
                </div>
            </form>
        </div>
    )
}