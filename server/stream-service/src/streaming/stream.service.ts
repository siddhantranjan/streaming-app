import { User } from "./models/user.dto";

export const findAllUsersFromStreamKey = async (streamKeys: string[]) => {
  const allUsers: User | User[] = await prisma.user_details.findMany({
    where: {
      stream_key: { in: streamKeys },
    },
    select: {
      id: true,
      username: true,
      stream_key: true,
      video_details: {
        select: {
          id: true,
          title: true
        }
      }
    }
  })
  return allUsers;
}

export const findOne = async (email: string) => {
  const getUser: User = await prisma.user_details.findUnique({
    where: {
      email,
    },
  })
  return getUser;
}

export const getUserFilteredOnStreamKey = async (stream_key: string) => {
  const getUser: User = await prisma.user_details.findUnique({
    where: {
      stream_key,
    },
    select: {
      id: true,
      username: true,
      stream_key: true,
      video_details: {
        select: {
          id: true,
          title: true
        }
      }
    }
  })
  return getUser;
}

export const saveLiveVideoDetails = async ({ user_id, title }: any) => {
  const videoDetails: any = await prisma.live_video_details.upsert({
    where: {
      user_id,
    },
    update: {
      title,
    },
    create: {
      user_id,
      title,
    },
  })

  return videoDetails;
}

export const getDetails = async (user_id: string) => {
  const videoDetails = await prisma.live_video_details.findUnique({
    where: {
      user_id
    },
  })

  return videoDetails;
}

export const getAllSavedStreams = async () => {
  const allStream = await prisma.video_details.findMany({
    select: {
      id: true
    }
  })
  return allStream;
}

export const saveVideoDetails = async (url: string, streamKey: string) => {
  const videoDetail: any = await prisma.video_details.create({
    data: {
      url
    }
  })

  return videoDetail;
}

export const getUrl = async(videoId: string) => {
  const url: any = await prisma.video_details.findUnique({
    where: {
      id: videoId
    }
  })

  return url;
}

export const updateStreamKey = async(stream_key: string, id: string) => {
  const newStreamKey = await prisma.user_details.update({
    where: {
      id
    },
    data: {
      stream_key
    }
  })

  return newStreamKey;
}

