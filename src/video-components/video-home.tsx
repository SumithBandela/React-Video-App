import { Link } from "react-router-dom";

export function VideoHome(){
    return(
        <div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
            <Link to='/admin-login' className="btn btn-warning "> Admin Login </Link>
            <Link to='/register-user' className="btn btn-dark ms-2">New User Register</Link>
         </div>

    )
    
}