import { Grid, IconButton, ListItem, Typography,Box, InputBase, Button } from "@mui/material";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import CommentCard from "./comment-card.component";


const CommentSection =()=>{

    const comments =[{
        "id":1,
        "user":"guest",
        "comment":"adding a super long comment for testing. this should help us test what happens with long comments!"
    },
    {
        "id":2,
        "user":"user2",
        "comment":"Comment 2"
    },
    {
        "id":3,
        "user":"user3",
        "comment":"Comment 3"
    },
    ,
    {
        "id":4,
        "user":"user4",
        "comment":"Comment 4"
    },
    {
        "id":5,
        "user":"user5",
        "comment":"Comment 5"
    }
    ,
    {
        "id":6,
        "user":"user6",
        "comment":"Comment 6"
    }
]

    return(
        <Box sx={{backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',borderRadius:2, marginTop:3,
        marginRight:2,marginBottom:3,width:"100%"}}>

        <Typography sx={{backgroundColor: "#ffc806",boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,color:"black",fontSize:20,borderRadius:1,marginBottom:1, paddingLeft:"6%"}}>Leave A Comment</Typography>

        <InputBase placeholder="comment" sx={{border:1,borderRadius:1,marginBottom:1,width:"90%", marginLeft:"6%"}}/>
        <Button variant="contained" color="warning" sx={{marginLeft:"70%", marginBottom:"20px"}}>Add Comment</Button>

        <Box 
            className="mapcard-container" 
            sx={{ 
            maxHeight:"270px",
            overflowY:'scroll',
            "&::-webkit-scrollbar": {
                width: 10,
            },
            "&::-webkit-scrollbar-track": {
                boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ffc806",
                outline: `1px solid #ffc806`,
            },
            }}>
            
            {comments.map((comment) => (
                <CommentCard key={comment.id}commentInfo = {comment}/>
            ))}
        
        </Box>
      </Box>
       
    );

}

export default CommentSection;