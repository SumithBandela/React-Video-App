var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var express = require("express");

var conStr = "mongodb://127.0.0.1:27017";

var app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post('/register-admin', (req, res)=>{

    var admin = {
        UserId: req.body.UserId, 
        Password: req.body.Password
    }
    mongoClient.connect(conStr).then(clientObj=>{
        var database = clientObj.db("video-project-db");
    database.collection("tbladmin").insertOne(admin).then(()=>{
         console.log("Admin Added");
         res.end();

    })
    
    });
});


app.get("/get-admin", (req, res)=>{
    mongoClient.connect(conStr).then(clientObj=>{
         var database = clientObj.db("video-project-db");
         database.collection("tbladmin").find({}).toArray().then(documents=>{
             res.send(documents);
             res.end();
         });
    });
});

app.get("/get-categories", (req, res)=>{
    mongoClient.connect(conStr).then(clientObj=>{
         var database = clientObj.db("video-project-db");
         database.collection("tblcategories").find({}).toArray().then(documents=>{
             res.send(documents);
             res.end();
         });
    });
});

app.post("/add-video", (req, res)=>{

    mongoClient.connect(conStr).then(clientObj=>{

        var video = {
            VideoId: parseInt(req.body.VideoId),
            Title: req.body.Title,
            Url: req.body.Url,
            Description: req.body.Description,
            Likes: parseInt(req.body.Likes),
            Dislikes: parseInt(req.body.Dislikes),
            CategoryId: parseInt(req.body.CategoryId)
        }

        var database = clientObj.db("video-project-db");
        database.collection("tblvideos").insertOne(video).then(()=>{
             console.log("Video Added");
             res.end();
        });
        
   });
});

app.get("/get-videos", (req, res)=>{
    mongoClient.connect(conStr).then(clientObj=>{
         var database = clientObj.db("video-project-db");
         database.collection("tblvideos").find({}).toArray().then(documents=>{
             res.send(documents);
             res.end();
         });
    });
});

app.get("/get-video/:id", (req, res)=>{

    var id = parseInt(req.params.id);

    mongoClient.connect(conStr).then(clientObj=>{
         var database = clientObj.db("video-project-db");
         database.collection("tblvideos").find({VideoId:id}).toArray().then(documents=>{
             res.send(documents);
             res.end();
         });
    });
});


app.put("/edit-video/:id", (req, res)=>{

    mongoClient.connect(conStr).then(clientObj=>{

        var id = parseInt(req.params.id);

        var video = {
            VideoId: parseInt(req.body.VideoId),
            Title: req.body.Title,
            Url: req.body.Url,
            Description: req.body.Description,
            Likes: parseInt(req.body.Likes),
            Dislikes: parseInt(req.body.Dislikes),
            CategoryId: parseInt(req.body.CategoryId)
        }

        var database = clientObj.db("video-project-db");
        database.collection("tblvideos").updateOne({VideoId:id},{$set:video}).then(()=>{
             console.log("Video Updated");
             res.end();
        });
        
   });
});

app.delete("/delete-video/:id", (req, res)=>{

    var id = parseInt(req.params.id);

    mongoClient.connect(conStr).then(clientObj=>{
         var database = clientObj.db("video-project-db");
         database.collection("tblvideos").deleteOne({VideoId:id}).then(()=>{
             console.log("Video Deleted");
             res.end();
         })
    });
});

app.post("/add-comment", (req, res)=>{

    mongoClient.connect(conStr).then(clientObj=>{

        var comment = {
            CommentId: parseInt(req.body.CommentId),
            Description: req.body.Description,
            VideoId: parseInt(req.body.VideoId)
        }

        var database = clientObj.db("video-project-db");
        database.collection("tblcomments").insertOne(comment).then(()=>{
             console.log("Comment Added");
             res.end();
        });
        
   });
});

app.get("/get-comment/:id", (req, res)=>{

    var id = parseInt(req.params.id);

    mongoClient.connect(conStr).then(clientObj=>{
         var database = clientObj.db("video-project-db");
         database.collection("tblcomments").find({CommentId:id}).toArray().then(documents=>{
             res.send(documents);
             res.end();
         });
    });
});

app.post('/register-user', (req, res)=>{

    var user = {
        UserId: req.body.UserId,
        UserName: req.body.UserName, 
        Password: req.body.Password,
        Email: req.body.Email,
        Mobile: req.body.Mobile
    }
    mongoClient.connect(conStr).then(clientObj=>{
        var database = clientObj.db("video-project-db");
    database.collection("tblusers").insertOne(user).then(()=>{
         console.log("User Added");
         res.end();
    })
    
    });
});

app.get("/get-users", (req, res)=>{
    mongoClient.connect(conStr).then(clientObj=>{
         var database = clientObj.db("video-project-db");
         database.collection("tblusers").find({}).toArray().then(documents=>{
             res.send(documents);
             res.end();
         });
    });
});


app.listen(7070);
console.log(`Server Started : http://127.0.0.1:7070`);


