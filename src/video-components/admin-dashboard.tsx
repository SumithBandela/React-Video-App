import { useEffect , useState} from "react";
import { VideoContract } from "../contracts/VideoContract";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function AdminDashboard()
{
    const [videos,setVideos]  = useState<VideoContract[]>();
    const [cookies,setCookie,removeCookie] = useCookies(['admin-id']);

    let navigate = useNavigate();

    function LoadVideos(){
        axios.get(`http://127.0.0.1:7070/get-videos`)
        .then(response=>{
            setVideos(response.data);
        })
    }

    function handleSignOut(){
        removeCookie('admin-id');
        navigate('/');
    }

    useEffect(()=>{
        LoadVideos();
    },[]);

    return(
        <div>
            <h2 className="d-flex justify-content-between"><div>Admin Dashboard - [{cookies['admin-id']}]</div><button onClick={handleSignOut} className="btn btn-danger">Signout</button></h2>
            <div className="my-2">
                <Link to='/add-video'className='bi bi-camera-video btn btn-primary'> Add Video</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            videos?.map(video=>
                                <tr key={video.VideoId}>
                                    <td>{video.Title}</td>
                                    <td>
                                        <iframe src={video.Url} width='200' height='100'></iframe>
                                    </td>
                                    <td>
                                        <Link to={`/edit-video/${video.VideoId}`} className="btn btn-warning"><span className="bi bi-pen-fill"></span></Link>
                                        <Link to={`/delete-video/${video.VideoId}`} className="btn btn-danger ms-2"><span className="bi bi-trash"></span></Link>
                                    </td>                                
                                    </tr>
                            )
                        }
                    </tbody>
               
            </table>
        </div>
    )
}