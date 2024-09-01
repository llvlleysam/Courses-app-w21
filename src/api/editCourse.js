import { httpService } from "../Serviecs/InstanceAxios";


export default async function editCourse({id,editedCourse}) {
    console.log(editedCourse.get("teacher"))
    try{
        const res = await httpService.patch(`/api/course-list/${id}/`,editedCourse)
        // return res.data
    }catch(e){
        console.log(e.message)
    }
}
