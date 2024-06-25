import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link ,useNavigate } from "react-router-dom";

export function AdminLogin(){
    let navigate = useNavigate();
    const [cookies,setCookie,removeCookie] = useCookies(['admin-id']);

    const formik = useFormik({
        initialValues:{
            UserId:'',
            Password:''
        },
        onSubmit:(admin)=>{
            axios.get(`http://127.0.0.1:7070/get-admin`)
            .then(response=>{
                var user = response.data.find((item:any)=>item.UserId===admin.UserId);
                if(user){
                    if(admin.Password===user.Password)
                        {
                            setCookie('admin-id',admin.UserId);
                            navigate('/admin-dashboard');
                        }else{
                            navigate('/error');
                        }
                }else{
                    navigate('/error');
                }
            })
        }
    })
    return(
        <div>
            <form className="bg-light p-4 m-3 border border-2 border-dark rounded w-25" onSubmit={formik.handleSubmit}>
                <h3 className="bi bi-person-fill"> Admin Login</h3>
                <dl>
                    <dt>UserId</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning">Login</button>
                <Link to='/' className="btn btn-dark ms-2">Cancel</Link>
            </form>
        </div>
    )
}