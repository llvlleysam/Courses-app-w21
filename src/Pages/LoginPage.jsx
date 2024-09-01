
import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { validationSchema } from "../Schema/ValidationForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { boolean } from "zod";
import { useNavigate } from "react-router-dom";
import ADDRoutes from "../Router/PathRouters/ConfigRoutes";
import useLoginAuthentication from "../Hooks/useLogin.Authentication";
//---------------
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
//--------Helmet----
import {Helmet} from "react-helmet";



export default function LoginPage() {
  const navigate = useNavigate()
  const {mutate,isPending}=useLoginAuthentication()
  //--------Alert-------
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })

  
//---------------


  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver:zodResolver(validationSchema),
    defaultValues: {
        phone: "",
        password: ""
    },
  });

  function onsubmit(values){
    mutate(values,{onSuccess:(res)=>{
      localStorage.setItem("access",res.data.access)
      localStorage.setItem("refresh",res.data.refresh)
      handleClick()
      setTimeout(()=>{
        navigate(ADDRoutes.Courses)
      },3000)
    }})
  }

  return (
    <div style={{width:"100vw",height:"100vh"}}>
      <Helmet>
                <meta charSet="utf-8" />
                <title>ورود به حساب کاربری</title>
                <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Toolbar />


      <Snackbar sx={{height:"100vh", top:"-350px"}} open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          شما با موفقیت وارد شدید
        </Alert>
      </Snackbar>



      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Typography fontSize={50} marginBottom={2}>
          ورود
        </Typography>
        <Paper elevation={2} sx={{ padding: 5, borderRadius: 2 }}>
          <Stack component={"form"} direction={"column"} spacing={2} onSubmit={handleSubmit(onsubmit)}>
            <TextField
              name="phone"
              type="number"
              id="outlined-basic"
              label="شماره تماس"
              variant="outlined"
              {...register('phone')}
              error={errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              name="password"
              id="outlined-basic"
              type="password"
              label="پسورد"
              variant="outlined"
              {...register('password')}
              error={errors.password}
              helperText={errors.password?.message}
            />
         
            <Button
                type="submit"
              variant="contained"
              disabled={errors.password?.message || errors.phone?.message}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60px"
              }}
            >
              {isPending?
              <RotateLeftIcon/>
                :
              "ورود"}
            </Button>
          </Stack>
          <Typography fontSize={12} style={{marginTop:"10px"}}> برای ساخت اکانت جدید <span style={{fontWeight:"bold",color:"blue",cursor:"pointer"}} onClick={()=>navigate(ADDRoutes.Signup)}>کلیک</span> کنید</Typography>
        </Paper>
      </Container>
    </div>
  );
}
