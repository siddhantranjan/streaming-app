import express, { Request } from 'express';
import { authorize } from '../../utilities/middlewares/auth';
import { deleteUser, findUser, getStreamKey, getUserDetailsFromUsername, saveCoverMediaDetails, saveProfileMediaDetails, updateUser, whoAmI } from '../controller/user.controller';

const userRoutes = express.Router();

userRoutes.get('/', findUser);
userRoutes.get('/whoami', authorize, whoAmI);
userRoutes.get('/stream-key', authorize, getStreamKey);
userRoutes.patch('/update', authorize, updateUser);
userRoutes.delete('/delete', authorize, deleteUser);
userRoutes.get('/details', getUserDetailsFromUsername)
userRoutes.post('/media/details/cover', authorize, saveCoverMediaDetails);
userRoutes.post('/media/details/profile', authorize, saveProfileMediaDetails);

export default userRoutes;