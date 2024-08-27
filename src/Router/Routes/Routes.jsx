import { createBrowserRouter } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import ADDRoutes from "../PathRouters/ConfigRoutes";
import HomePage from "../../Pages/HomePage";
import LoginPage from "../../Pages/LoginPage";
import SignupPage from "../../Pages/SignupPage";
import CoursesPage from "../../Pages/CoursesPage";



 const router = createBrowserRouter([
    {
        path:ADDRoutes.Home,
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<HomePage/>
            },
            {
                path:ADDRoutes.Login,
                element:<LoginPage/>
            },
            {
                path:ADDRoutes.Signup,
                element:<SignupPage/>
            },
            {
                path:ADDRoutes.Courses,
                element:<CoursesPage/>
            }
        ]
    }
])


export default router