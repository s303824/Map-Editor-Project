import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import userImage from '../assets/userimage.png';
import AuthContext from '../auth'; 
import { useContext } from 'react';

const UserCard = ({userName,email}) =>{
  const {auth} = useContext(AuthContext);
    return(
    <CardHeader
        avatar={
          <Avatar 
            sx ={{border:2 ,borderRadius: '50%', borderColor:"#fb7603"}}
            src= {auth.loggedIn ? auth.user.profile_picture: "https://res.cloudinary.com/natialemu47/image/upload/v1652196653/dnt17uj4nl9ywfq648v8.jpg" } 
            aria-label="userImage" />    
        }
        title= {userName}
        subheader={<Typography sx={{fontSize:'13px',color: 'white',}}>{email}</Typography>}
        sx={{color:"white"}}
      />
    );
};
export default UserCard;
