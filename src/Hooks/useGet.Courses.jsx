import { useQuery } from "@tanstack/react-query";
import getCourses from "../api/getCourses";

export default function useGetCourses(page) {
  return useQuery({
    queryKey:["courses"],
    queryFn:()=>getCourses(page)
  })
}
