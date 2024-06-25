import axios from "axios";
import { useFormik } from "formik";
import { useState,useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link,useNavigate,useParams} from "react-router-dom";
import { VideoContract } from "../contracts/VideoContract";

export function EditVideo(){
    const [videos,setVideos] = useState([{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,CategoryId:0}]);
    let params = useParams();
    let navigate = useNavigate();
    useEffect(()=>{
        axios.get(`http://127.0.0.1:7070/get-video/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        })
    },[]);
    const formik = useFormik({
        initialValues:{
            VideoId:videos[0].VideoId,
            Title:videos[0].Title,
            Url:videos[0].Url,
            Description:videos[0].Description,
            Likes:videos[0].Likes,
            Dislikes:videos[0].Dislikes,
            CategoryId:videos[0].CategoryId
        },
        onSubmit:(video)=>{
            axios.put(`http://127.0.0.1:7070/edit-video/${params.id}`,video)
            .then(()=>{
                alert('video edited successfully');
                navigate('/admin-dashboard');
            })
        },
        enableReinitialize:true
    })
    return(
        <div>
            <form onSubmit={formik.handleSubmit} className="w-25">
               <h3>Edit Video</h3>
               <dl>
                <dt>VideoId</dt>
                <dd><input value={formik.values.VideoId} type="text" name="VideoId" onChange={formik.handleChange} className="form-control" /></dd>
                <dt>Title</dt>
                <dd><input value={formik.values.Title} type="text" name="Title" onChange={formik.handleChange} className="form-control"  /></dd>
                <dt>Url</dt>
                <dd><input value={formik.values.Url} type="text" name="Url" onChange={formik.handleChange}  className="form-control"/></dd>
                <dt>Description</dt>
                <dd>
                    <textarea value={formik.values.Description} name="Description" onChange={formik.handleChange} rows={4} cols={40}></textarea>
                </dd>
                <dt>Likes</dt>
                <dd><input value={formik.values.Likes} type="number" name="Likes" onChange={formik.handleChange} className="form-control" /></dd>
                <dt>Dislikes</dt>
                <dd><input type="number" value={formik.values.Dislikes} name="Dislikes" onChange={formik.handleChange} className="form-control" /></dd>
               </dl>
               <button className="btn btn-success me-1"> Save</button>
               <Link to='/admin-dashboard' className="btn btn-danger">Cancel</Link>
            </form>
        </div>
    )
}