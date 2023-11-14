import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import Cropper from 'react-easy-crop'

import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import FileUploadTwoToneIcon from '@mui/icons-material/FileUploadTwoTone';
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';

import getCroppedImg from "../helper/crop-image";

import { Navbar } from "../components/navbar/navbar";
import { getAllStreams } from "../service/stream/getAllStreams";
import { localResource } from "../constants/local-resource";
import { VideoRow } from "../components/videoRow";
import { ActionRows } from "../components/actionRows";
import { saveUserMediaDetails } from "../service/user/save-user-media-details";
import { fetchCurrentUser, getUserDetails } from "../service/user/fetchUserDetails";
import { NotFound } from "../components/notFoundPage";

export function UserProfile() {

    const { username } = useParams()
    const [videoIds, setVideoIds] = useState([]);

    const [bio, setBio] = useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
    const [bioEditing, setBioEditing] = useState("false");

    const [coverImageEditing, setCoverImageEditing] = useState(false);
    const [profileImageEditing, setProfileImageEditing] = useState(false);

    const [oldCover, setOldCover] = useState(null);
    const [oldProfile, setOldProfile] = useState(null);

    const [coverImage, setCoverImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const [allowEdit, setAllowEdit] = useState(true);

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [aspect, setAspect] = useState(4 / 3);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const coverParentRef = useRef(null);
    const profileParentRef = useRef(null);

    const [validUsername, setValidUsername] = useState(true);

    const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, [])

    useEffect(() => {
        const getAllVideos = async () => {
            const getAllVideosIds = await getAllStreams();
            const allVideoIds = getAllVideosIds.map((videoId) => videoId.id)
            setVideoIds(allVideoIds.reverse())
        }

        const getCurrentUser = async () => {
            const user = await getUserDetails(username);
            const currentUser = await fetchCurrentUser();

            if (!user) setValidUsername(false);

            setAllowEdit(username === currentUser.user.username)

            setCoverImage(`${localResource.USER_DETAILS}/${user.id}_cover.png`);
            setProfileImage(`${localResource.USER_DETAILS}/${user.id}_profile.png`)
        }
        getCurrentUser();
        getAllVideos();

        if (coverParentRef.current) {
            setAspect(coverImageEditing ? coverParentRef.current.offsetWidth / coverParentRef.current.offsetHeight : profileParentRef.current.offsetWidth / profileParentRef.current.offsetHeight);
        }

    }, [coverImageEditing, username])

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const handleBioEditing = (event) => {
        event.preventDefault();
        setBioEditing(bioEditing === "true" ? "false" : "true")
    }

    const handleImageEditing = (event, type) => {
        event.preventDefault();

        if (type === 'cover' && !profileImageEditing) setCoverImageEditing(!coverImageEditing);
        else if (type === 'profile' && !coverImageEditing) setProfileImageEditing(!profileImageEditing);
    }

    const handleImageUpload = (event) => {
        event.preventDefault();
        const imageUrl = URL.createObjectURL(event.target.files[0])

        if (coverImageEditing) {
            setOldCover(coverImage);
            setCoverImage(imageUrl)
        } else {
            setOldProfile(profileImage);
            setProfileImage(imageUrl)
        }
    }

    const saveImage = async () => {

        if (coverImageEditing) {
            const croppedImage = await getCroppedImg(
                coverImage,
                croppedAreaPixels
            )
            setCoverImage(croppedImage)
            await uploadImage(croppedImage, 'cover');

            setOldCover();
            setCoverImageEditing(!coverImageEditing);
        } else {
            const croppedImage = await getCroppedImg(
                profileImage,
                croppedAreaPixels
            )

            setProfileImage(croppedImage)
            await uploadImage(croppedImage, 'profile');

            setOldProfile();
            setProfileImageEditing(!profileImageEditing);
        }
    }

    const uploadImage = async (croppedImage, fileName) => {
        const newImage = new File([croppedImage], fileName, { type: croppedImage.type });

        const { mediaDetails } = await saveUserMediaDetails(newImage, fileName);

        setCoverImage(`${localResource.USER_DETAILS}/${mediaDetails.user_id}_cover.png`);
        setProfileImage(`${localResource.USER_DETAILS}/${mediaDetails.user_id}_profile.png`)
    }

    return (
        <div>
            {
                validUsername ? (<div className="flex flex-col space-y-4 m-0">
                    <Navbar />
                    <div className="flex flex-row justify-center relative">

                        <div ref={coverParentRef} className="box-border group m-auto mt-16 h-36 w-3/4 border-2 rounded-lg border-blue relative overflow-hidden md:h-72">

                            <img src={coverImage} alt="cover" className={`h-auto rounded-lg object-contain ${coverImageEditing ? 'blur-sm' : ''}`} />
                            <div className={`hidden ${allowEdit ? 'group-hover:block' : ''}`}>
                                <ModeEditOutlineTwoToneIcon className="absolute top-0 right-0 cursor-pointer" onClick={(e) => handleImageEditing(e, 'cover')} />
                            </div>

                            <div className={`flex items-center h-full w-full absolute top-0 ${coverImageEditing ? '' : 'hidden'}`}>
                                <div className="flex items-center justify-center w-full">
                                    {
                                        !oldCover ? (<label for="dropzone-file" className="cursor-pointer" >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <FileUploadTwoToneIcon />
                                                <p className="mb-2 text-sm text-blue">
                                                    <span className="font-semibold">Click to upload
                                                    </span> or drag and drop
                                                </p>
                                                <p className="text-xs text-blue">PNG, JPG (MAX. 800x400px)</p>
                                            </div>
                                            <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} />
                                        </label>) : (<div>
                                            <Cropper
                                                image={coverImage}
                                                crop={crop}
                                                zoom={zoom}
                                                aspect={aspect}
                                                onCropChange={setCrop}
                                                onCropComplete={onCropComplete}
                                                onZoomChange={setZoom}
                                                zoomSpeed={0.2}
                                            />
                                            <SaveAltRoundedIcon style={{ color: "#F1BF01" }} className="cursor-pointer absolute bottom-0 right-0" onClick={saveImage} />
                                        </div>)
                                    }
                                </div>

                            </div>

                            <div ref={profileParentRef} className="flex justify-center items-center h-2/3 w-1/3 absolute bottom-0 left-0 border-2 border-blue lg:w-1/6">

                                <img src={profileImage} alt="cover" className={`w-full h-full object-cover ${profileImageEditing ? 'blur-sm' : ''}`} />
                                <div className={`hidden ${allowEdit ? 'group-hover:block' : ''}`}>
                                    <ModeEditOutlineTwoToneIcon className="absolute top-0 right-0 cursor-pointer z-10" style={{ color: "whitesmoke" }} onClick={(e) => handleImageEditing(e, 'profile')} />
                                </div>

                                <div className={`flex items-center h-full w-full absolute top-0 ${profileImageEditing ? '' : 'hidden'}`}>
                                    <div className="flex items-center justify-center w-full">
                                        {
                                            !oldProfile ? (<label for="dropzone-file" className="cursor-pointer">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                                    <FileUploadTwoToneIcon style={{ color: "whitesmoke" }} />
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" />
                                            </label>) : (<div>
                                                <Cropper
                                                    image={profileImage}
                                                    crop={crop}
                                                    zoom={zoom}
                                                    aspect={aspect}
                                                    onCropChange={setCrop}
                                                    onCropComplete={onCropComplete}
                                                    onZoomChange={setZoom}
                                                    zoomSpeed={0.2}
                                                />
                                                <SaveAltRoundedIcon style={{ color: "#F1BF01" }} className="cursor-pointer absolute bottom-0 right-0" onClick={saveImage} />
                                            </div>)
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="flex group flex-col items-center w-2/3 mx-auto text-center font-serif">
                        <div className="flex flex-col items-end w-full">
                            <div className={`hidden ${allowEdit ? 'group-hover:block' : ''}`}>
                                <ModeEditOutlineTwoToneIcon onClick={handleBioEditing} className=" cursor-pointer" />
                            </div>
                        </div>
                        <div className="text-5xl capitalize text-blue">{username}</div>
                        <div className="text-sm text-yellow-light">10.8 M Followers</div>
                        <div className="mt-6 text-blue capitalize font-medium" contentEditable={bioEditing} onChange={handleBioChange}>{bio}</div>
                    </div>

                    <div>
                        <div className={`w-full flex flex-col items-center mt-10 ${allowEdit ? '' : 'hidden'}`}>
                            <ActionRows />
                        </div>
                    </div>

                    <div>
                        <div className="mt-20" />
                        <VideoRow videoIds={videoIds} limit={3} rowTitle={'Trending'} />
                        <VideoRow videoIds={videoIds} limit={3} rowTitle={'Recent'} />
                        <VideoRow videoIds={videoIds} limit={3} rowTitle={'Top'} />
                        <VideoRow videoIds={videoIds} limit={3} rowTitle={'Favourites'} />
                    </div>
                </div>) : (<div><NotFound /></div>)
            }
        </div>
    )
}