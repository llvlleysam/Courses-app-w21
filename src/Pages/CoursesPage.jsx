import {
    Box,
    Button,
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
    Typography
} from "@mui/material";
import useGetCourses from "../Hooks/useGet.Courses";
import {useNavigate} from "react-router-dom";
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import ADDRoutes from "../Router/PathRouters/ConfigRoutes";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useEffect, useState} from "react";
import useDeleteCourses from "../Hooks/useDeleteCourses";
import {useQueryClient} from "@tanstack/react-query";
//------------Alert----
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
//--------Icon----
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {addCourseValidation, editCourseValidation} from "../Schema/ValidationForm";
import EditNoteIcon from '@mui/icons-material/EditNote';
import useGetOneCourse from "../Hooks/getOneCourse";


//-----table-----
const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
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
    border: "solid #0B78F1",
    p: 4,
};


export default function CoursesPage() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const {mutate} = useDeleteCourses()
    const {data, error, refetch} = useGetCourses(page)
    // console.log(data?.data)
    const Token = localStorage.getItem("access")
    //-------pagination----
    React.useEffect(() => {
        refetch();
    }, [page])

    function handelPagination(event, value) {
        setPage(value)
    }

    // console.log(page)
    //----modal delete-----
    const [deleteVal, setDeleteVal] = useState(null)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //----modal edit-------------------------------------------********
    const [editVal, setEditVal] = useState(null)
    const {data: oneData, refetch: refetchOne} = useGetOneCourse(editVal)
    React.useEffect(() => {
        if (editVal) {
            refetchOne()
        }
    }, [editVal])
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

    //-----edit------------------------------------******************

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
        setValue,
        control,
        watch
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
            console.log(oneData)
            setValue("teacher", oneData?.teacher)
            setValue("title", oneData?.title)
            setValue("category", oneData?.category)
            setValue("duration", oneData?.duration)
            setValue("price", oneData?.price)
            setValue("description", oneData?.description)
            setValue("number_of_chapter", oneData?.number_of_chapter)
            setValue("number_of_viewer", oneData?.number_of_viewer)
            // setValue("upload_images",oneData.upload_images[0].image)
        }
    }, [oneData]);

    function onsubmit(values) {

        // const formData = new  FormData()
        // formData.append("teacher",values.teacher)
        // formData.append("title",values.title)
        // formData.append("category",values.category)
        // formData.append("duration",values.duration)
        // formData.append("price",values.price)
        // formData.append("description",values.description)
        // formData.append("number_of_chapter",values.number_of_chapter)
        // formData.append("number_of_viewer",values.number_of_viewer)
        // formData.append("upload_images",values.upload_images[0])
        console.log(values)
    }

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
            {Token ? <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20
                }}>
                    <Toolbar/>


                    <Snackbar sx={{height: "100vh", top: "-350px"}} open={openAlert} autoHideDuration={2000}
                              onClose={handleCloseAlert}>
                        <Alert
                            onClose={handleCloseAlert}
                            severity="error"
                            variant="filled"
                            sx={{width: '100%'}}
                        >
                            دوره "{deleteVal?.teacher}" با موفقیت حذف گردید
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
                            <Button variant="contained" color="error" id="modal-modal-description" sx={{mt: 2, mr: 2}}
                                    onClick={() => mutate(deleteVal.id, {
                                        onSuccess: () => {
                                            setOpen(false)
                                            handleClickAlert()
                                            return queryClient.invalidateQueries({queryKey: ["courses"]})
                                        }
                                    })}>
                                بله
                            </Button>
                            <Button variant="contained" color="success" id="modal-modal-description" sx={{mt: 2}}
                                    onClick={handleClose}>
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
                    >
                        <Paper sx={{p: 5, width: 550}} elevation={24}>
                            <Typography fontSize={20} fontWeight={"bold"} mb={2}
                                        style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <EditNoteIcon color="error"/><span
                                style={{color: "red", fontWeight: "bold"}}>"{editVal?.teacher}"</span>
                            </Typography>
                            <Stack
                                component={"form"}
                                onSubmit={handleSubmit(onsubmit)}
                                spacing={2}
                                sx={{height: "auto"}}
                            >
                                <Controller
                                    name={"teacher"}
                                    control={control}
                                    render={({
                                                 field: {onChange, value},
                                                 fieldState: {error},
                                                 formState,
                                             }) => (
                                        <TextField
                                            helperText={error ? error.message : null}
                                            size="small"
                                            label={"نام مدرس دوره"}
                                            error={!!error}
                                            onChange={onChange}
                                            value={value}
                                            fullWidth
                                            variant="outlined"
                                        />
                                    )}
                                />

                                <TextField
                                    label={"عنوان"}
                                    {...register("title")}
                                    error={errors.title}
                                    helperText={errors.title?.message}
                                />
                                <select
                                    name="category"
                                    // value={editVal?.category}
                                    {...register("category")}
                                    style={{padding: "20px"}}
                                    error={errors.category}
                                    helperText={errors.category?.message}
                                >
                                    <option value="">دسته بندی</option>
                                    <option value="2">فرانت اند</option>
                                    <option value="1">بک تند</option>
                                </select>
                                {errors.category ?
                                    <span style={{color: "red", fontSize: 12}}>{errors.category?.message}</span> : ""}
                                <TextField
                                    placeholder="به دقیقه"
                                    // value={editVal?.duration}
                                    type="number"
                                    label={"مدت زمان دوره"}
                                    name="duration"
                                    {...register("duration")}
                                    error={errors?.duration}
                                    helperText={errors.duration?.message}
                                />
                                <TextField
                                    type="number"
                                    // value={editVal?.price}
                                    placeholder="به تومان"
                                    label={"قیمت دوره"}
                                    name="price"
                                    {...register("price")}
                                    error={errors?.price}
                                    helperText={errors.price?.message}
                                />
                                <TextField
                                    multiline
                                    label={"توضیحات"}
                                    // value={editVal?.description}
                                    name="description"
                                    {...register("description")}
                                    error={errors.description}
                                    helperText={errors.description?.message}
                                />
                                <TextField
                                    type="number"
                                    label={"تعداد فصل ها"}
                                    // value={editVal?.number_of_chapter}
                                    name="number_of_chapter"
                                    {...register("number_of_chapter")}
                                    error={errors.number_of_chapter}
                                    helperText={errors.number_of_chapter?.message}
                                />
                                <TextField
                                    type="number"
                                    label={"تعداد بازدید"}
                                    // value={editVal?.number_of_viewer}
                                    name="number_of_viewer"
                                    {...register("number_of_viewer")}
                                    error={errors.number_of_viewer}
                                    helperText={errors.number_of_viewer?.message}
                                />
                                <label style={{padding: 15, display: "flex", flexDirection: "column"}}>
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
                                    {errors.upload_images ?
                                        <span style={{color: "red"}}>{errors.upload_images?.message}</span> : ""}
                                </label>
                                <Button type="submit" variant="contained" style={{padding: 15}}>
                                    {/* {isPending ? <RotateRightIcon/> :"ساخت دوره"} */}
                                    ویرایش
                                </Button>
                            </Stack>
                        </Paper>

                    </Modal>


                    <TableContainer component={Paper} elevation={3} style={{padding: 50, borderRadius: 30}}>
                        <Button variant="contained" color="secondary" startIcon={<NoteAddIcon/>} sx={{mb: 2}}
                                onClick={() => navigate(ADDRoutes.AddCourse)}>
                            ساخت دوره جدید
                        </Button>
                        <Table sx={{minWidth: 700}} aria-label="customized table">
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
                                {data?.data?.results.map((row, index) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell component="th" scope="row"
                                                         align="center">{index + 1}</StyledTableCell>
                                        <StyledTableCell align="center">{row.title}</StyledTableCell>
                                        <StyledTableCell align="center">{row.teacher}</StyledTableCell>
                                        <StyledTableCell align="center">{row.duration}</StyledTableCell>
                                        <StyledTableCell align="center">{row.category}</StyledTableCell>
                                        <StyledTableCell align="center">{row.price}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button color="error" onClick={() => {
                                                setDeleteVal({id: row.id, teacher: row.teacher})
                                                return handleOpen()
                                            }}><DeleteIcon/></Button>
                                            <Button color="warning" onClick={() => {
                                                handleOpenEdit()
                                                setEditVal(row.id)
                                                console.log(editVal)
                                            }}><EditIcon/></Button>
                                        </StyledTableCell>

                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack spacing={2} sx={{mt: 2}}>
                        <Pagination count={Math.ceil(data?.data?.count / 5)} color="primary" shape="rounded"
                                    onChange={handelPagination}/>
                    </Stack>
                </div>
                :
                <>
                    <Toolbar/>
                    <Grid container spacing={2} justifyContent={"center"} alignItems={"center"} width={"100%"}
                          height={"100vh"}>
                        <Grid item xs={8}>
                            <Paper style={{
                                padding: 20,
                                border: "solid red 2px",
                                borderRadius: 15,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Alert severity="error">برای دیدن لیست دوره ها ابتدا باید با حساب کاربری خود وارد
                                    شوید</Alert>
                                <Button style={{fontSize: 17, fontWeight: "bold", color: "blue"}}
                                        onClick={() => navigate(ADDRoutes.Login)}>ورود</Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </>
            }
        </>
    )
}
