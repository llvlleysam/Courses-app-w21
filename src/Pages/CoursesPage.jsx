import { Alert, Button, Grid, Paper, styled, Table, TableBody, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import useGetCourses from "../Hooks/useGet.Courses";
import { useNavigate } from "react-router-dom";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import ADDRoutes from "../Router/PathRouters/ConfigRoutes";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';





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

export default function CoursesPage() {
    const navigate = useNavigate()
    const {data,error}=useGetCourses()
    console.log(data)
    const Token = localStorage.getItem("access")
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
                <StyledTableCell align="center"><Button color="error"><DeleteIcon/></Button><Button color="warning"><EditIcon/></Button></StyledTableCell>
                
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
