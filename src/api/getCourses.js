import { httpService } from "../Serviecs/InstanceAxios";


export default async function getCourses(page=1){
    // console.log(page)
    try{
         const res = await httpService.get(`/api/course-list/?page=${page}&limit=5`)
        //  console.log(res)
         return res
    }catch(e){
        console.log(e.message)
    }
}