import axios from "axios"
import { useFormik } from "formik"
import { useCookies } from "react-cookie";
import { Link ,useNavigate } from "react-router-dom"
export function UserLogin(){
    const [cookies,setCookie,removeCookie] = useCookies(['user-id']);
    var navigate = useNavigate();
    var formik = useFormik({
        initialValues:{
            UserId:'',
            Password:''
        },
        onSubmit:(user)=>{
            axios.get(`http://127.0.0.1:7070/get-users`)
            .then(response=>{
                var users = response.data.find((item:any)=>item.UserId==user.UserId);
                if(users){
                    if(users.Password===user.Password)
                        {
                            setCookie('user-id',user.UserId);
                            navigate('/user-dashboard');
                        }else{
                            navigate('/error');
                        }
                }else{
                    navigate('/error');
                }
            })
        }
    });
    return(
        <div>
            <form onSubmit={formik.handleSubmit} className="bg-light p-4 m-3 w-25 border border-2 border-dark rounded">
                <h3 className="bi bi-person-fill"> User Login</h3>
                <dl>
                    <dt>UserId</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-primary">Login</button>
                <Link to='/' className="btn btn-danger ms-2">Cancel</Link>
            </form>
        </div>
    )
}