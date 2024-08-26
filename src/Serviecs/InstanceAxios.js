import axios from "axios";
import { baseURL } from "../Constants/ValuesConstant";


export const httpService = axios.create({
    baseURL
})