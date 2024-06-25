import { useFormik } from "formik"
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

export function UserRegister(){
    let navigate = useNavigate();
    var formik = useFormik({
        initialValues:{
            UserId:'',
            UserName:'',
            Password:'',
            Email:'',
            Mobile:''
        },
        onSubmit:(user)=>{
            axios.post(`http://127.0.0.1:7070/register-user`,user)
            .then(()=>{
                alert('user registered successfully');
                navigate('/user-login');
            })
        }
    });
    return(
        <div>
            <form onSubmit={formik.handleSubmit} className="bg-light p-4 m-3 border border-2 border-dark rounded w-25">
                <dl>
                    <dt>UserId</dt>
                    <dd><input type="text" name="UserId"  onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>UserName</dt>
                    <dd><input type="text" name='UserName' onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>Password</dt>
                    <dd><input type="text" name="Password" onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>Email</dt>
                    <dd><input type="email" name="Email" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" name="Mobile" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button type="submit" className=" w-100 btn btn-warning">Register</button>
                <div>
                <Link to='/user-login'>Existing user login?</Link>
                </div>
            </form>
        </div>
    )
}