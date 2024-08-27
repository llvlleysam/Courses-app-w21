import {
  AppBar,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import ADDRoutes from "../../Router/PathRouters/ConfigRoutes";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';




    

    const navbar = [
        {title:"خونه",route:ADDRoutes.Home},
        {title:"دورها",route:ADDRoutes.Courses},
        {title:"تماس با ما",route:ADDRoutes.Contact},
    ]

    

export default function Header() {
    const navigate = useNavigate()
    const Token = localStorage.getItem("access")

  
    
  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Stack direction={"row"} alignItems={"center"} flexGrow={1}>
            <IconButton color="inherit" onClick={()=>navigate(ADDRoutes.Home)}>
              <DiamondIcon />
            </IconButton>
            <Typography>دوره های آموزشی</Typography>
          </Stack>
          <Stack variant="contained" direction={"row"}>
            {navbar.map((nav,index)=><Button color="inherit" key={index} onClick={()=>navigate(nav.route)}>{nav.title}</Button>)}
          </Stack>
          {Token ?
          <Button color="inherit" variant="outlined" sx={{marginLeft:3}} onClick={()=>{
            navigate(ADDRoutes.Login)
            localStorage.clear()
          }} startIcon={<LogoutIcon />}>خروج</Button>
            :
          <Button color="inherit" variant="outlined" sx={{marginLeft:3}} onClick={()=>navigate(ADDRoutes.Login)} startIcon={<LoginIcon />}>ورود</Button>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
