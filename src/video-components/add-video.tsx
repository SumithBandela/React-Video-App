import { useEffect,useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CategoriesContract } from "../contracts/CategoriesContract";

export function AddVideo(){
    const [categories,setCategories] = useState<CategoriesContract[]>();
    let navigate = useNavigate();
   var formik = useFormik({
    initialValues:{
        VideoId:0,
        Title:'',
        Url:'',
        Description:'',
        Likes:0,
        Dislikes:0,
        CategoryId:0
    },
    onSubmit:(video)=>{
        axios.post(`http://127.0.0.1:7070/add-video`,video)
        .then(()=>{
            alert("Video Added");
            navigate('/admin-dashboard');

        })
    }
   })
   function LoadCategories(){
    axios.get(`http://127.0.0.1:7070/get-categories`)
    .then(response=>{
        response.data.unshift({CategoryId:'-1',CategoryName:'Select a Category'});
        setCategories(response.data);
    })
   }

   useEffect(()=>{
    LoadCategories();
   },[]);
    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <dl className="row">
                    <dt className="col-3">VideoId</dt>
                    <dd className="col-9"><input type="number" name="VideoId" onChange={formik.handleChange}  /></dd>
                    <dt className="col-3">Title</dt>
                    <dd className="col-9"><input type="text" name="Title" onChange={formik.handleChange}/></dd>
                    <dt className='col-3'>Url</dt>
                    <dd className="col-9"><input type="text" name="Url" onChange={formik.handleChange} className="from-control"/></dd>
                    <dt className="col-3">Description</dt>
                    <dd className="col-9">
                        <textarea rows={4} cols={40} name="Description" onChange={formik.handleChange}></textarea>
                    </dd>
                    <dt className="col-3">Likes</dt>
                    <dd className="col-9"><input type="number" name="Likes" onChange={formik.handleChange}  /></dd>
                    <dt className="col-3">Dislikes</dt>
                    <dd className="col-9"><input type="number" name="Dislikes" onChange={formik.handleChange}  /></dd>
                    <dt className="col-3">Category</dt>
                    <dd className="col-9">
                        <select name="CategoryId" onChange={formik.handleChange} > 
                            {
                                categories?.map(category=>
                                    <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>
                                )
                            }
                        </select>
                    </dd>
                </dl>
                <button type="submit" className="btn btn-primary">Add</button>
                <Link to='/admin-dashboard' className='btn btn-danger ms-2'> Cancel</Link>
            </form>
        </div>
    )
}