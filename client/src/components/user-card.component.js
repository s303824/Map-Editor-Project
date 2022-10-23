import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import userImage from '../assets/userimage.png';

const UserCard = ({userName,email}) =>{
    return(
    <CardHeader
        avatar={
          <Avatar 
            sx ={{border:2 ,borderRadius: '50%', borderColor:"#fb7603"}}
            src= {userImage} 
            aria-label="userImage" />    
        }
        title= {userName}
        subheader={<Typography sx={{fontSize:'13px',color: 'white',}}>{email}</Typography>}
        sx={{color:"white"}}
      />
    );
};
export default UserCard;
