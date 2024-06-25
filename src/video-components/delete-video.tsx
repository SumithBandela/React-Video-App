import axios from "axios";
import { useEffect,useState } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import { VideoContract } from "../contracts/VideoContract";

export function DeleteVideo(){
    const [video,setVideo] = useState([{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,CategoryId:0}]);
    let navigate = useNavigate();
    let params = useParams();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:7070/get-video/${params.id}`)
        .then(response=>{
            setVideo(response.data);
        })
    },[])

    function handleRemoveClick(){
        axios.delete(`http://127.0.0.1:7070/delete-video/${params.id}`)
        .then(()=>{
            alert('video-deleted');
            navigate('/admin-dashboard');
        })
    }

    return(
        <div className="bg-light text-dark p-4 ">
            <h3>Are you sure? Want to delete this video?</h3>
            <dl>
                <dt>Title</dt>
                <dd>{video[0].Title}</dd>
                <dt>Video</dt>
                <dd>
                    <iframe src={video[0].Url}></iframe>
                </dd>
                <dt>Description</dt>
                <dd>{video[0].Description}</dd>
                <dt>Likes</dt>
                <dd>{video[0].Likes}</dd>
                <dt>Dislikes</dt>
                <dd>{video[0].Dislikes}</dd>
            </dl>
            <button onClick={handleRemoveClick} className=" btn btn-danger me-2"> Yes</button>
            <Link to='/admin-dashboard' className="btn btn-warning"> No</Link>
        </div>
    )
}