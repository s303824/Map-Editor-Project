import { Grid, IconButton, ListItem, Typography,Box, InputBase, Button } from "@mui/material";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import CommentCard from "./comment-card.component";
import GlobalStoreContext from "../store";
import AuthContext from "../auth";
import { useContext, useState } from "react";
import LoginModal from "./login-modal.component";

const CommentSection =(mapInfo)=>{
    const {store} = useContext(GlobalStoreContext)
    const {auth} = useContext(AuthContext)
    const [comment, setComment] = useState("");
    const [empty, setEmpty] = useState(false)

    if(store.currentMapInfo.length ==0) {
        return null;
    }

    let commentSection = <Box>
        {store.currentMapInfo.comments.map((comment) => (
                <CommentCard key={comment[1]} commentInfo = {comment[1]} username={comment[0]}/>
            ))}
    </Box>
    
    const handleAddComment = () => {
        if(comment == "") {
            setEmpty(true)
            return;
        }
        store.addComment(store.currentMapInfo, [auth.user.username,comment])
        setComment("");
    }

    const handleCommentText = (event) => {
        setComment(event.target.value)
    }

    const handleEmpty = () => {
        setEmpty(false);
    }

    let emptyModal = empty ? <LoginModal message="You can't add an empty comment!" onClose={() => handleEmpty()}></LoginModal> : null

    let commentHeader = auth.loggedIn ? "Leave a comment" : "Log in to comment"

    let addComment = auth.loggedIn ?
    <Box>
        <InputBase placeholder="comment" value={comment} sx={{border:1,borderRadius:1,marginBottom:1,width:"90%", marginLeft:"6%"}} onChange={(event) => handleCommentText(event)}/>
        <Button variant="contained" color="warning" sx={{marginLeft:"70%", marginBottom:"20px"}} onClick={handleAddComment}>Add Comment</Button>
    </Box>
    : null

    return(
        <Box sx={{backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',borderRadius:2, marginTop:3,
        marginRight:2,marginBottom:3,width:"100%", overflow:"auto"}}>
            {emptyModal}

        <Typography sx={{backgroundColor: "#ffc806",boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,color:"black",fontSize:20,borderRadius:1,marginBottom:1, paddingLeft:"6%"}}>{commentHeader}</Typography>

        {addComment}
        <Box 
            className="mapcard-container" 
            sx={{ 
            maxHeight:"270px",
            overflowY:'auto',
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
            
            {commentSection}
        
        </Box>
      </Box>
       
    );

}

export default CommentSection;