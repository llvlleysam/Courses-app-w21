import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { addCourseValidation } from "../Schema/ValidationForm";
import useAddCourse from "../Hooks/useAddCourse";
import { useNavigate } from "react-router-dom";
//---------------
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ADDRoutes from "../Router/PathRouters/ConfigRoutes";
import RotateRightIcon from '@mui/icons-material/RotateRight';
//--------Helmet----
import {Helmet} from "react-helmet";


export default function AddCoursePage() {

  const {mutate,isPending}=useAddCourse()
  const navigate = useNavigate()

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

  //--------------

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addCourseValidation),
    defaultValues: {
      teacher: "",
      title: "",
      category: "",
      duration: "",
      price: "",
      description: "",
      number_of_chapter: "",
      number_of_viewer: "",
      upload_images: "",
    },
  });
  
  function onsubmit(values) {
    const formData = new  FormData()
    formData.append("teacher",values.teacher)
    formData.append("title",values.title)
    formData.append("category",values.category)
    formData.append("duration",values.duration)
    formData.append("price",values.price)
    formData.append("description",values.description)
    formData.append("number_of_chapter",values.number_of_chapter)
    formData.append("number_of_viewer",values.number_of_viewer)
    formData.append("upload_images",values.upload_images[0])
    console.log(formData.get("upload_images"))
    mutate(formData,{onSuccess:()=>{
      handleClick()
      reset()
      setTimeout(()=>{
        navigate(ADDRoutes.Courses)
      },3000)
    }})
    // console.log(values);
    // console.log(errors)
    // console.log(formData.get("upload_images"))
  }
  return (
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>اضافه کردن دوره جدید</title>
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
          دوره با موفقیت ثبت شد
        </Alert>
      </Snackbar>



      <Grid
        container
        width={"100%"}
        height={"80vh"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={5}
      >
        <Grid item xs={5}>
          <Paper sx={{ p: 5 }} elevation={24}>
            <Typography fontWeight={"bold"} mb={2}>
              فرم ساخت دوره :{" "}
            </Typography>
            <Stack
              component={"form"}
              onSubmit={handleSubmit(onsubmit)}
              spacing={2}
            >
              <TextField
                label={"نام مدرس دوره"}
                name="teacher"
                {...register("teacher")}
                error={errors.teacher}
                helperText={errors.teacher?.message}
              />
              <TextField
                label={"عنوان"}
                name="title"
                {...register("title")}
                error={errors.title}
                helperText={errors.title?.message}
              />
              <select
                name="category"
                {...register("category")}
                style={{ padding: "20px" }}
                error={errors.category}
                helperText={errors.category?.message}
              >
                <option value="">دسته بندی</option>
                <option value="2">فرانت اند</option>
                <option value="1">بک تند</option>
              </select>
              {errors.category?<span style={{color:"red",fontSize:12}}>{errors.category?.message}</span>:""}
              <TextField
                placeholder="به دقیقه"
                type="number"
                label={"مدت زمان دوره"}
                name="duration"
                {...register("duration")}
                error={errors.duration}
                helperText={errors.duration?.message}
              />
              <TextField
                type="number"
                placeholder="به تومان"
                label={"قیمت دوره"}
                name="price"
                {...register("price")}
                error={errors.price}
                helperText={errors.price?.message}
              />
              <TextField
                multiline
                label={"توضیحات"}
                name="description"
                {...register("description")}
                error={errors.description}
                helperText={errors.description?.message}
              />
              <TextField
                type="number"
                label={"تعداد فصل ها"}
                name="number_of_chapter"
                {...register("number_of_chapter")}
                error={errors.number_of_chapter}
                helperText={errors.number_of_chapter?.message}
              />
              <TextField
                type="number"
                label={"تعداد بازدید"}
                name="number_of_viewer"
                {...register("number_of_viewer")}
                error={errors.number_of_viewer}
                helperText={errors.number_of_viewer?.message}
              />
              <label style={{ padding: 15 , display:"flex" , flexDirection:"column"}}>
                <span>کاور دوره : </span>
                <input
                  type="file"
                  placeholder="hh"
                  name="upload_images"
                  {...register("upload_images")}
                  error={errors.upload_images}
                  helperText={errors.upload_images?.message}
                />
                {errors.upload_images?<span style={{color:"red"}}>{errors.upload_images?.message}</span>:""}
              </label>
              <Button type="submit" variant="contained" style={{ padding: 15 }}>
                {isPending ? <RotateRightIcon/> :"ساخت دوره"}
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
