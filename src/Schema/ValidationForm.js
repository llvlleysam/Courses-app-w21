import { z } from "zod";


export const validationSchema = z.object({
    phone: z.coerce.string().min(1, { message: "شماره تماس الزامی است" }).min(7, { message: "شماره تماس معتبر نیست " }),
    password: z.string().min(1, { message: "پسورد الزامی است" }).min(5, { message: "پسورد کوتاه است" })
})
