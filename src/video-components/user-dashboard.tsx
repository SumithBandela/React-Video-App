import axios from "axios";
import { useEffect, useState } from "react";
import { VideoContract } from "../contracts/VideoContract";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate,Link } from "react-router-dom";
export function UserDashboard(){
    const [videos,setVideos] = useState<VideoContract[]>();
    const [cookies,setCookie,removeCookie] = useCookies(['user-id'])
    let navigate = useNavigate();
    function LoadVideos(){
        axios.get(`http://127.0.0.1:7070/get-videos`)
        .then(response=>{
            setVideos(response.data);
        })
    }

    useEffect(()=>{
        LoadVideos();
    })
    function handleSignout(){
        removeCookie('user-id');
        navigate('/user-login');
    }
    
    return(
        <div className="over-flow-auto" style={{height:'500px'}}>
            <header className=" h2 d-flex justify-content-between" > <div>User Dashboard - [{cookies['user-id']}]</div> <button onClick={handleSignout} className="btn btn-danger">Signout</button></header>
            <img src="channel-banner.jpg" width='100%'className="mt-2" />
            <nav className="text-center fs-3">
                <span className="me-4 fw-bold">Home</span> <span> Live</span>
            </nav>
            <main className="d-flex flex-wrap">
                {
                    videos?.map(video=>
                        <div key={video.VideoId} className="card m-3 p-2" style={{width:'300px'}}>
                            <div className="card-header">
                                {video.Title}
                            </div>
                            <div className="card-body">
                                <iframe src={video.Url} width='100%' height='200'></iframe>
                                <p>{video.Description}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-around">
                                <span className="bi bi-hand-thumbs-up"> {video.Likes}</span>
                                <span className="bi bi-hand-thumbs-down">{video.Dislikes}</span>
                            </div>
                        </div>
                    )
                }
            </main>
        </div>
    )
}