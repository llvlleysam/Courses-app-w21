import {
  alpha,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Modal,
  Pagination,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import useGetCourses from "../Hooks/useGet.Courses";
import { useNavigate, useSearchParams } from "react-router-dom";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import ADDRoutes from "../Router/PathRouters/ConfigRoutes";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import useDeleteCourses from "../Hooks/useDeleteCourses";
import { useQueryClient } from "@tanstack/react-query";
//------------Alert----
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
//--------Icon----
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addCourseValidation,
  editCourseValidation,
} from "../Schema/ValidationForm";
import EditNoteIcon from "@mui/icons-material/EditNote";
import useGetOneCourse from "../Hooks/getOneCourse";
import useEditCourse from "../Hooks/useEditCourse";
//---view----
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
//--------Helmet----
import { Helmet } from "react-helmet";
//-------Search----
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import debounce from "lodash.debounce";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
//------modal----
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 5,
  border: "solid #0B78F1",
  p: 4,
};
//-------Search----
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.35),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "30%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function CoursesPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [checked, setChecked] = React.useState("");
  const { mutate } = useDeleteCourses();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, error, refetch } = useGetCourses({
    page,
    checked,
    search: searchParams?.get("q"),
  });
  // console.log(data?.data)
  const Token = localStorage.getItem("access");
  //-------Search----
  function handelSearch(text) {
    if (text.length > 0) {
      setSearchParams((prev) => {
        prev.set("q", text);
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.delete("q");
        return prev;
      });
    }
  }
  // const debouncedSearch = React.useMemo(() => debounce(handelSearch, 300), []);
  //-------pagination----
  React.useEffect(() => {
    refetch();
  }, [page, checked, searchParams?.get("q")]);

  function handelPagination(event, value) {
    setPage(value);
  }

  // console.log(page)
  //----modal delete-----
  const [deleteVal, setDeleteVal] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //----modal edit-------------------------------------------********
  const [editVal, setEditVal] = useState(null);
  const { data: oneData, refetch: refetchOne } = useGetOneCourse(editVal);
  const { mutate: mutateEdit } = useEditCourse();
  React.useEffect(() => {
    if (editVal) {
      refetchOne();
    }
  }, [editVal]);
  // console.log(oneData)
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  //--------Alert-------
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const [state, setState] = React.useState({
    open: false,
    vertical: "b",
    horizontal: "center",
  });

  //-----edit------------------------------------******************

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    control,
    watch,
  } = useForm({
    resolver: zodResolver(editCourseValidation),
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
  useEffect(() => {
    if (editVal) {
      // console.log("set shod");
      setValue("teacher", oneData?.teacher);
      setValue("title", oneData?.title);
      setValue("category", oneData?.category === "Frontend" ? 1 : 2);
      setValue("duration", oneData?.duration);
      setValue("price", oneData?.price);
      setValue("description", oneData?.description);
      setValue("number_of_chapter", oneData?.number_of_chapter);
      setValue("number_of_viewer", oneData?.number_of_viewer);
      // setValue("upload_images",oneData.upload_images[0])
      // console.log(oneData.category)
    }
  }, [oneData]);

  function onsubmit(values) {
    const formData = new FormData();
    formData.append("teacher", values.teacher);
    formData.append("title", values.title);
    formData.append("category", values.category);
    formData.append("duration", values.duration);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("number_of_chapter", values.number_of_chapter);
    formData.append("number_of_viewer", values.number_of_viewer);
    formData.append("upload_images", values.upload_images[0]);
    mutateEdit(
      { id: oneData.id, editedCourse: formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["courses"] });
          handleClickAlert();
          handleCloseEdit();
          setTimeout(() => {
            setEditVal(null);
          },3000);
        },
      }
    );
    // console.log(oneData.id);
    // console.log(formData.get("upload_images"));
  }

  //-------Category-------

  const handleChange = (event) => {
    if (event.target.checked) {
      setChecked(2);
    } else {
      setChecked("");
    }
  };
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
      {Token ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Helmet>
            <meta charSet="utf-8" />
            <title>لیست دوره ها</title>
            <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
          <Toolbar />

          <Snackbar
            sx={{ height: "100vh", top: "-350px" }}
            open={openAlert}
            autoHideDuration={2000}
            onClose={handleCloseAlert}
          >
            <Alert
              onClose={handleCloseAlert}
              severity={editVal ? "warning" : "error"}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {!editVal
                ? `دوره ${deleteVal?.teacher} با موفقیت حذف گردید`
                : "ویرایش شد"}
            </Alert>
          </Snackbar>

          {/* modal Delete */}

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
              <Button
                variant="contained"
                color="error"
                id="modal-modal-description"
                sx={{ mt: 2, mr: 2 }}
                onClick={() =>
                  mutate(deleteVal.id, {
                    onSuccess: () => {
                      setOpen(false);
                      handleClickAlert();
                      return queryClient.invalidateQueries({
                        queryKey: ["courses"],
                      });
                    },
                  })
                }
              >
                بله
              </Button>
              <Button
                variant="contained"
                color="success"
                id="modal-modal-description"
                sx={{ mt: 2 }}
                onClick={handleClose}
              >
                انصراف
              </Button>
            </Box>
          </Modal>

          {/* modal edite ---------------------------------*************************        */}
          <Modal
            open={openEdit}
            onClose={handleCloseEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper sx={{ p: 5, width: 550 }} elevation={24}>
              <Typography
                fontSize={20}
                fontWeight={"bold"}
                mb={2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EditNoteIcon color="error" />
                <span style={{ color: "red", fontWeight: "bold" }}>
                  "{oneData?.teacher}"
                </span>
              </Typography>
              <Stack
                component={"form"}
                onSubmit={handleSubmit(onsubmit)}
                spacing={2}
                sx={{ height: "auto" }}
              >
                <Controller
                  name={"teacher"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState,
                  }) => (
                    <TextField
                      helperText={error ? error.message : null}
                      size="medium"
                      label={"نام مدرس دوره"}
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
                <Controller
                  name={"title"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState,
                  }) => (
                    <TextField
                      helperText={error ? error.message : null}
                      size="medium"
                      label={"عنوان"}
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />

                {/* <TextField
                                    label={"عنوان"}
                                    {...register("title")}
                                    error={errors.title}
                                    helperText={errors.title?.message}
                                /> */}
                <select
                  name="category"
                  // value={editVal?.category}
                  {...register("category")}
                  style={{ padding: "20px" }}
                  error={errors.category}
                  helperText={errors.category?.message}
                >
                  <option value="">دسته بندی</option>
                  <option value="1">فرانت اند</option>
                  <option value="2">بک تند</option>
                </select>
                {errors.category ? (
                  <span style={{ color: "red", fontSize: 12 }}>
                    {errors.category?.message}
                  </span>
                ) : (
                  ""
                )}

                <Controller
                  name={"duration"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState,
                  }) => (
                    <TextField
                      helperText={error ? error.message : null}
                      size="medium"
                      label={"مدت زمان دوره"}
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
                {/* <TextField
                  placeholder="به دقیقه"
                  // value={editVal?.duration}
                  type="number"
                  label={"مدت زمان دوره"}
                  name="duration"
                  {...register("duration")}
                  error={errors?.duration}
                  helperText={errors.duration?.message}
                /> */}
                <Controller
                  name={"price"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState,
                  }) => (
                    <TextField
                      helperText={error ? error.message : null}
                      size="medium"
                      label={"قیمت دوره"}
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
                {/* <TextField
                  type="number"
                  // value={editVal?.price}
                  placeholder="به تومان"
                  label={"قیمت دوره"}
                  name="price"
                  {...register("price")}
                  error={errors?.price}
                  helperText={errors.price?.message}
                /> */}
                <Controller
                  name={"description"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState,
                  }) => (
                    <TextField
                      helperText={error ? error.message : null}
                      multiline
                      size="medium"
                      label={"توضیحات"}
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
                {/* <TextField
                  multiline
                  label={"توضیحات"}
                  // value={editVal?.description}
                  name="description"
                  {...register("description")}
                  error={errors.description}
                  helperText={errors.description?.message}
                /> */}
                <Controller
                  name={"number_of_chapter"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState,
                  }) => (
                    <TextField
                      helperText={error ? error.message : null}
                      size="medium"
                      label={"تعداد فصل ها"}
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
                {/* <TextField
                  type="number"
                  label={"تعداد فصل ها"}
                  // value={editVal?.number_of_chapter}
                  name="number_of_chapter"
                  {...register("number_of_chapter")}
                  error={errors.number_of_chapter}
                  helperText={errors.number_of_chapter?.message}
                /> */}
                <Controller
                  name={"number_of_viewer"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState,
                  }) => (
                    <TextField
                      helperText={error ? error.message : null}
                      size="medium"
                      label={"تعداد بازدید"}
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
                {/* <TextField
                  type="number"
                  label={"تعداد بازدید"}
                  // value={editVal?.number_of_viewer}
                  name="number_of_viewer"
                  {...register("number_of_viewer")}
                  error={errors.number_of_viewer}
                  helperText={errors.number_of_viewer?.message}
                /> */}
                <label
                  style={{
                    padding: 15,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span>کاور دوره : </span>
                  <input
                    type="file"
                    placeholder="hh"
                    // value={editVal?.upload_images}
                    name="upload_images"
                    {...register("upload_images")}
                    error={errors.upload_images}
                    helperText={errors.upload_images?.message}
                  />
                  {errors.upload_images ? (
                    <span style={{ color: "red" }}>
                      {errors.upload_images?.message}
                    </span>
                  ) : (
                    ""
                  )}
                </label>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ padding: 15 }}
                >
                  {/* {isPending ? <RotateRightIcon/> :"ساخت دوره"} */}
                  ویرایش
                </Button>
              </Stack>
            </Paper>
          </Modal>

          <TableContainer
            component={Paper}
            elevation={3}
            style={{ padding: 50, borderRadius: 30 }}
          >
            <Stack
              display={"flex"}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Button
                variant="contained"
                color="secondary"
                startIcon={<NoteAddIcon />}
                sx={{ mb: 2 }}
                onClick={() => navigate(ADDRoutes.AddCourse)}
              >
                ساخت دوره جدید
              </Button>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => handelSearch(e.target.value)}
                />
              </Search>
            </Stack>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">#</StyledTableCell>
                  <StyledTableCell align="center">موضوع</StyledTableCell>
                  <StyledTableCell align="center">استاد دوره</StyledTableCell>
                  <StyledTableCell align="center">
                    مدت زمان دوره (دقیقه)
                  </StyledTableCell>
                  <StyledTableCell align="center">دسته بندی</StyledTableCell>
                  <StyledTableCell align="center">قیمت (ریال)</StyledTableCell>
                  <StyledTableCell align="center">اقدام</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data?.results.length > 0 ? (
                  data?.data?.results.map((row, index) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.title}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.teacher}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.duration}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.category}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.price}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          color="error"
                          onClick={() => {
                            setDeleteVal({ id: row.id, teacher: row.teacher });
                            return handleOpen();
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                        <Button
                          color="warning"
                          onClick={() => {
                            handleOpenEdit();
                            setEditVal(row.id);
                          }}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          color="info"
                          onClick={() => navigate(`/showcourse/${row.id}`)}
                        >
                          <RemoveRedEyeIcon />
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <Stack
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography color={"red"} fontWeight={"bold"}>
                      گشتم نبود نگرد نیست
                    </Typography>
                  </Stack>
                )}
              </TableBody>
            </Table>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  color="success"
                />
              }
              label={
                <Typography
                  style={{
                    color: checked ? "green" : "black",
                    fontWeight: "bold",
                  }}
                >
                  فقط نمایش Frontend
                </Typography>
              }
            />
          </TableContainer>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Pagination
              count={Math.ceil(data?.data?.count / 5)}
              color="primary"
              shape="rounded"
              onChange={handelPagination}
            />
          </Stack>
        </div>
      ) : (
        <>
          <Toolbar />
          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            height={"100vh"}
          >
            <Grid item xs={8}>
              <Paper
                style={{
                  padding: 20,
                  border: "solid red 2px",
                  borderRadius: 15,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Alert severity="error">
                  برای دیدن لیست دوره ها ابتدا باید با حساب کاربری خود وارد شوید
                </Alert>
                <Button
                  style={{ fontSize: 17, fontWeight: "bold", color: "blue" }}
                  onClick={() => navigate(ADDRoutes.Login)}
                >
                  ورود
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
