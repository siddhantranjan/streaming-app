import { UpdateUser } from '../models/dtos/update-user.dto';
import { User } from '../models/dtos/user.dto';

export const findAll = async () => {
    const allUsers: User | User[] = await prisma.user_details.findMany()
    return allUsers;
}

export const findOne = async(email: string) => {
    const getUser: User = await prisma.user_details.findUnique({
        where: {
          email,
        },
      })
    return getUser;
}

export const update = async(email: string, data: UpdateUser) => {
    const user: User = await prisma.user_details.update({
        where: {
            email
        },
        data
    })
    return user;
}

export const deleteOne = async(email: string, user_id: string) => {

    const videoDetails = await prisma.live_video_details.delete({
        where: {user_id}
    })

    const user: User = await prisma.user_details.delete({
        where: { email },
        include: {
            live_video_details: true
        }
      })

    return {user, videoDetails};
}

export const findUsername = async (username: string) => {
    const getUser: any = await prisma.user_details.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        stream_key: true,
        live_video_details: {
          select: {
            title: true
          }
        }
      }
    })
    return getUser;
  }
  

export const saveUserCoverMedia = async(user_id: string, filePath: string, ) => {
    const userCoverDetails = await prisma.user_media_details.upsert({
        where: {user_id},
        update: {
            cover_image_src: filePath
        },
        create: {
            profile_image_src: '',
            cover_image_src: filePath,
            user_id
        }
    });

    return userCoverDetails;
}

export const saveUserProfileMedia = async(user_id: string, filePath: string) => {
    const userProfileDetails = await prisma.user_media_details.upsert({
        where: {user_id},
        update: {
            profile_image_src: filePath
        },
        create: {
            profile_image_src: filePath,
            cover_image_src: '',
            user_id
        }
    });

    return userProfileDetails;
}