import { logger } from "../../config/logger";
import { RegisterUser } from "../models/dtos/auth.dto";
import { User } from "../models/dtos/user.dto";

export const createUser = async (body: RegisterUser) => {
    let {first_name, last_name, email, username, password, phone, stream_key} = body;
    const user: User = await prisma.user_details.create({
        data: {
            first_name, last_name, email, username, password, phone, stream_key
        }
    })

    return user;
}

export const getUserData = async(email: string, columns: any) => {
    const getUserData = await prisma.user_details.findUnique({
        where: {email},
        select: columns
    })

    return getUserData;
}

export const findOne = async(email: string) => {
    const getUser: User = await prisma.user_details.findUnique({
        where: {
          email,
        },
      })
    return getUser;
}