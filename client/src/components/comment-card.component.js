import { Grid, IconButton, ListItem, Typography,Box } from "@mui/material";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';


const CommentCard =({commentInfo, username})=>{
    return(
        <Box  sx={{backgroundImage :'linear-gradient(to bottom, #505051, #303031)',boxShadow: '0 1px 2px 2px rgba(68,68,69,255)',borderRadius:3,marginTop:2,marginRight:2,marginLeft:1,minHeight:"20%"}}>
            <Typography sx={{paddingLeft:"5px", backgroundColor: "#ffc806",boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,color:"white",fontSize:20,borderRadius:3}}>{username}</Typography>
            <Typography sx={{color:"white",fontSize:20,marginTop:1,marginLeft:1}}>{commentInfo}</Typography>
        </Box>
       
    );

}

export default CommentCard;