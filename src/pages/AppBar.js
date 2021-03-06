import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {searchElement} from "../redux/actions";
import {Button} from "@mui/material";
import CallIcon from '@mui/icons-material/Call';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const AppBars = () => {
    const users = useSelector((state) => state.users)
    const account_name = useSelector((state) => state.account_name)
    const dispatch = useDispatch();
    // const c = users.map(i => i.category)
    // const category = c.filter((item, index) => {
    //     return c.indexOf(item) === index
    // })

    // console.log("Name",account_name)

    const searchValueInput = (e) => {
        if (e !== '') {
            const newItem = users.filter((i) => {
                return Object.values(i).join(' ').toLowerCase().includes(e.toLowerCase());
            });
            dispatch(searchElement(newItem))
        } else {
            dispatch(searchElement([]))
        }
    };

    const Search = styled('div')(({theme}) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    const navigate = useNavigate()

    const toggleLinks = () => {
        let link = document.getElementById("links")
        link.classList.toggle("hidden")
    }

    return <div className="pb-28 sm:pb-16">
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed" color={'inherit'}>
                <Toolbar className="app_toolbar  flex-col sm:flex-row sm:justify-between">
                    <div className="flex justify-between w-full sm:w-auto pt-1 sm:py-2">
                        <Typography
                            className='logo'
                            variant="h3"
                            noWrap
                            component="div"
                            onClick={() => navigate('/')}
                        >
                            VENUE
                        </Typography>
                        <button onClick={() => toggleLinks()}
                                className="sm:hidden inline-block active:text-gray-300 duration-300"><MenuIcon
                            className="menu_icon"/></button>
                    </div>
                    <div id="links" className="uppercase sm:text-sm text-lg font-semibold flex flex-wrap sm:flex-nowrap sm:flex hidden">
                        <Box>
                            <Button onClick={()=>navigate('/party')}>??????????????????</Button>
                        </Box>
                        <Box>
                            <Button onClick={()=>navigate('/course')}>??????????</Button>
                        </Box>
                        <Box>
                            <Button onClick={()=>navigate('/events')}>??????????????????????</Button>
                        </Box>
                        <Box>
                            <Button onClick={()=>navigate('/concert')}>????????????????</Button>
                        </Box>
                        <Box>
                            <Button onClick={()=>navigate('/promo')}>??????????</Button>
                        </Box>
                        <Box>
                            <Button onClick={()=>navigate('/tender')}>????????????????</Button>
                        </Box>
                        <Box>
                            <Button onClick={()=>navigate('/places')}>??????????</Button>
                        </Box>
                        <Box>
                            <Button onClick={()=>navigate('/theatre')}>??????????</Button>
                        </Box>
                        <Box>
                            <Button onClick={()=>navigate('/exhibition')}>????????????????</Button>
                        </Box>

                        <Box>
                            <Button onClick={()=>navigate('/cinema')}>????????</Button>
                        </Box>
                    </div>
                    <div className="flex items-center">
                        <Search className="my-1">
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search???"
                                inputProps={{'aria-label': 'search'}}
                                onChange={(e) => searchValueInput(e.target.value)}
                            />
                        </Search>
                        <AccountCircleIcon onClick={() => navigate('/account')} className="hover:text-blue-500 cursor-pointer mr-4"/>
                        <FavoriteIcon onClick={() => navigate('/favourite')} className="hover:text-blue-500 cursor-pointer mr-4"/>
                        <CallIcon onClick={() => navigate('/contact')} className="hover:text-blue-500 cursor-pointer"/>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    </div>
}