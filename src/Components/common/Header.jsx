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




    

    const navbar = [
        {title:"خونه",route:ADDRoutes.Home},
        {title:"دورها",route:ADDRoutes.Courses},
        {title:"تماس با ما",route:ADDRoutes.Contact},
    ]

    

export default function Header() {
    const navigate = useNavigate()
    

  
    
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
          <Button color="inherit" variant="outlined" sx={{marginLeft:3}} onClick={()=>navigate(ADDRoutes.Login)}>ورود</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
