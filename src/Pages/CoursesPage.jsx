import { Box, Button, Grid, Modal, Pagination, Paper, Stack, styled, Table, TableBody, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import useGetCourses from "../Hooks/useGet.Courses";
import { useNavigate } from "react-router-dom";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import ADDRoutes from "../Router/PathRouters/ConfigRoutes";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import useDeleteCourses from "../Hooks/useDeleteCourses";
import { useQueryClient } from "@tanstack/react-query";
//------------Alert----
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';





//-----table-----
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
//------modal----
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 5,
  border:"solid #0B78F1",
  p: 4,
};


export default function CoursesPage() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [page , setPage] = useState()
    const {data,error,refetch}=useGetCourses(page)
    const {mutate} = useDeleteCourses()
    // console.log(data?.data)
    const Token = localStorage.getItem("access")
    //-------pagination----
    function handelPagination(event,value){
      setPage(value)
      console.log(value)
      refetch()
    }
    // console.log(page)
    //----modal-----
    const [deleteVal,setDeleteVal] = useState(null)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
      //--------Alert-------
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const [state, setState] = React.useState({
    open: false,
    vertical: 'b',
    horizontal: 'center',
  })

  // if(error){
  //   return(
  //     <>
  //     <Toolbar/>
  //     {error.message}
  //     </>
  //   ) 
 // }
  return (
      <>
      {Token ? <div style={{display:"flex",flexDirection:"column", justifyContent:"center" , alignItems:"center", padding:20}}>
        <Toolbar/>


            <Snackbar sx={{height:"100vh", top:"-350px"}}  open={openAlert} autoHideDuration={2000} onClose={handleCloseAlert}>
            <Alert
              onClose={handleCloseAlert}
              severity="error"
              variant="filled"
              sx={{ width: '100%' }}
            >
              دوره "{deleteVal?.teacher}" با موفقیت حذف گردید
            </Alert>
          </Snackbar>




              <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  آیا مایل به حذف کردن دوره"{deleteVal?.teacher}" هستید؟
                </Typography>
                <Button variant="contained" color="error" id="modal-modal-description" sx={{ mt: 2 , mr:2 }} onClick={()=>mutate(deleteVal.id,{onSuccess:()=>{
                  setOpen(false)
                  handleClickAlert()
                  return queryClient.invalidateQueries({queryKey:["courses"]})
                  }})}>
                  بله
                </Button>
                <Button variant="contained" color="success" id="modal-modal-description" sx={{ mt: 2 }} onClick={handleClose}>
                  انصراف
                </Button>
              </Box>
            </Modal>



      <TableContainer component={Paper} elevation={3} style={{padding:50,borderRadius:100}}>
        <Table sx={{ minWidth: 700}} aria-label="customized table" >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">#</StyledTableCell>
              <StyledTableCell align="center">موضوع</StyledTableCell>
              <StyledTableCell align="center">استاد دوره</StyledTableCell>
              <StyledTableCell align="center">مدت زمان دوره (دقیقه)</StyledTableCell>
              <StyledTableCell align="center">دسته بندی</StyledTableCell>
              <StyledTableCell align="center">قیمت (ریال)</StyledTableCell>
              <StyledTableCell align="center">اقدام</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.results.map((row,index)=>(
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row" align="center">{index+1}</StyledTableCell>
                <StyledTableCell align="center">{row.title}</StyledTableCell>
                <StyledTableCell align="center">{row.teacher}</StyledTableCell>
                <StyledTableCell align="center">{row.duration}</StyledTableCell>
                <StyledTableCell align="center">{row.category}</StyledTableCell>
                <StyledTableCell align="center">{row.price}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button color="error" onClick={()=>{
                    setDeleteVal({id:row.id,teacher:row.teacher})
                    return  handleOpen()
                    }}><DeleteIcon/></Button>
                  <Button color="warning"><EditIcon/></Button>
                  </StyledTableCell>
                
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination count={Math.ceil(data?.data?.count/5)} color="primary" shape="rounded" onChange={handelPagination}/>
      </Stack>
    </div>
  :
    <>
    <Toolbar/>
    <Grid container spacing={2} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100vh"}>
      <Grid item xs={8} >
        <Paper style={{padding:20,border:"solid red 2px",borderRadius:15 ,display:"flex" ,flexDirection:"column", justifyContent:"center" ,alignItems:"center"}} >
          <Alert severity="error">برای دیدن لیست دوره ها ابتدا باید با حساب کاربری خود وارد شوید</Alert>
          <Button style={{fontSize:17,fontWeight:"bold" ,color:"blue"}} onClick={()=>navigate(ADDRoutes.Login)}>ورود</Button>
        </Paper>
      </Grid>
    </Grid>
    </>
}
      </>
  )
}
