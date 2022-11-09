import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AuthContext from '../auth'; 
import { useContext } from 'react';

const UserCard = ({userName,email, userImage}) =>{
  const {auth} = useContext(AuthContext);
    return(
    <CardHeader
        avatar={
          <Avatar 
            sx ={{border:2 ,borderRadius: '50%', borderColor:"#fb7603"}}
            src= {!userImage  ? auth.user.profile_picture: userImage } 
            aria-label="userImage" />    
        }
        title= {userName}
        subheader={<Typography sx={{fontSize:'13px',color: 'white',}}>{email}</Typography>}
        sx={{color:"white"}}
      />
    );
};
export default UserCard;
