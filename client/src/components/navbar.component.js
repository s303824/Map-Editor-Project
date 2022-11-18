import '../App.css';
import "../App"

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { styled, alpha } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import logo from '../assets/tileslate_logo.png'
import userImage from '../assets/userimage.png'
import Sidebar from './sidebar.component'
import UserCard from './user-card.component';
import GlobalStoreContext from '../store';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import LoginModal from './login-modal.component';
import SearchSettings from './search-settings.component';


function Banner() {

    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    const {store} = useContext(GlobalStoreContext)

    const [searchType, setSearchType] = useState("name")
    const [searchText, setSearchText] = useState("")
    const [sortBy, setSortBy] = useState("Likes")
    const [pageNum, setPageNum] = useState(1)

    const[empty, setEmpty] = useState(false)

    const [settings, setSettings] = useState(false);

    const handleLogin = () => {
      navigate("/login", {})
    }
    const handleSignUp = () => {
      navigate("/signup", {})
    }

    const handleGoHome = () => {
      navigate("/", {})
    }

    const handleSearch = () => {
      if(searchText == "") {
        setEmpty(true)
        return;
      }
      //pageNum weird math is so we either dont skip any or skip page num-1 (page num is 2, skip first 1*10)
      store.searchByType(searchType, searchText, pageNum == 1 ? 0 : (pageNum-1)*10, sortBy.toLowerCase())
      console.log("Searching by type: " + searchType +"    Search Value: " + searchText);
      //navigate("/explore", {})
    }

    const handleCloseSettings = () => {
      setSettings(false);
    }

    const handleOpenSettings = () => {
      setSettings(true);
    }

    const handleSearchText = (event) => {
      setSearchText(event.target.value)
    }

    const handleSelectSearchType = (type) => {
      setSearchType(type);
    }

    const handleEnterPress = (event) => {
      if(event.key == "Enter") {
        handleSearch();
      }
    }

    const changeSortBy = (text) => {
      setSortBy(text)
    }

    const handlePageUp = (forward) => {
      setPageNum(pageNum + 1);
    }
    const handlePageDown = (forward) => {
      if(pageNum == 1) {
        return;
      }
      setPageNum(pageNum - 1);
    }

    const handleEmpty = () => {
      setEmpty(false)
    }

  let userInfo = {
    "id":1,
    "userName":"Guest",
    "email": "",
    "image": "../assets/guestImage.jpg"
}

if(auth.loggedIn) {
  userInfo = {
    "id":1,
    "userName":auth.user.username,
    "email":auth.user.email,
    "image": auth.user.profile_picture

  }
}
    
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
      }));

      let settingsButton =
      <IconButton aria-label="settings" id="composition-button" onClick={() => handleOpenSettings()}>
        <SettingsTwoToneIcon sx={{fill:"#C0C0C0" ,fontSize:22}}/> 
      </IconButton>

    let nameButtonColor = searchType == "name" ? "contained" : "outlined"
    let categoryButtonColor = searchType == "tags" ? "contained" : "outlined"
    let userButtonColor = searchType == "username" ? "contained" : "outlined"

    let emptyModal = empty ? <LoginModal message="The search field is empty" onClose={() => handleEmpty()}></LoginModal> : null

    let searchSettings = settings ? <SearchSettings onClose={() => handleCloseSettings()} changePageUp={() => handlePageUp()} 
    changePageDown={() => handlePageDown()} pageNum={pageNum} sortingBy={sortBy} changeSortBy={(text) => changeSortBy(text)}></SearchSettings> : null

    return (
        <Box className='top-navbar' sx={{ display: 'flex' ,flexGrow: 1}} >
          {emptyModal}
          {searchSettings}
           <CssBaseline/>
           <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
              <Toolbar sx={{boxShadow: 1 ,backgroundColor:'#1E1E1E',justifyContent: 'space-between'}}> 
              <Box 
                component="img"
                sx={{ height: 60 }}
                alt="Logo"
                src={logo}
                onClick={handleGoHome}
            />
            <Box  display="flex" flexDirection="row" > 
            <Search>
                <SearchIconWrapper style = {{borderRadius:'10%'}} >
                    <SearchIcon onClick={handleSearch}/>
                </SearchIconWrapper>
                <StyledInputBase
                    autoFocus={true}
                    key = "search"
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onKeyDown={handleEnterPress}
                    onChange={(event) => handleSearchText(event)}
                    value = {searchText}
                />
            </Search>
                <Box display="flex" flexDirection="row" sx={{ justifyContent: 'space-between' }} >
                    <Button variant={nameButtonColor} size="small" sx = {{color:"white",borderRadius:'20px'}} onClick={() => handleSelectSearchType("name")}>By Name</Button>
                    <Button variant={categoryButtonColor} size="small"  sx= {{color:"white",borderRadius:'20px',marginX: 1}} onClick={() => handleSelectSearchType("tags")}>By Category</Button>
                    <Button variant={userButtonColor} size="small"  sx= {{color:"white",borderRadius:'20px',marginX: 0}} onClick={() => handleSelectSearchType("username")}>By User</Button>
                </Box>
                {settingsButton}
            </Box>
            
            {auth.loggedIn && <Box display="flex" flexDirection="row" >
                <UserCard userName ={userInfo.userName} email = {userInfo.email} userImage={userInfo.image}/>
            </Box>}
            {!auth.loggedIn && <Box display="flex" flexDirection="row" sx={{ justifyContent: 'space-between' }} >
                    <Button variant="outlined" size="small"  sx= {{borderColor:"white",color:"white",borderRadius:'20px',marginX: 2}} onClick={handleLogin}>Sign In</Button>
                    <Button variant="contained" size="small" className='button-color' sx = {{borderRadius:'20px'}} onClick={handleSignUp}>Sign Up</Button>
            </Box>}
            </Toolbar>
           </AppBar>
           <Sidebar/>
        </Box>
    );
  }

  export default Banner;
