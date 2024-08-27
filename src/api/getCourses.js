import { httpService } from "../Serviecs/InstanceAxios";


export default async function getCourses(){
    try{
        return (await httpService.get(`/api/course-list/?page=1&limit=5`))
    }catch(e){
        console.log(e.message)
    }
}