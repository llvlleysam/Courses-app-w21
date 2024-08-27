import { useQuery } from "@tanstack/react-query";
import getCourses from "../api/getCourses";

export default function useGetCourses() {
  return useQuery({
    queryKey:["courses"],
    queryFn:getCourses
  })
}
