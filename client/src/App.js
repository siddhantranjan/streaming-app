import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { path } from './constants/client-path'
import { SignUp } from './pages/signup';
import { LogIn } from './pages/login';
import { Dashboard } from './pages/dashboard';
import { IsUserLoggedIn } from './helper/is-user-loggedin';
import { ProtectedRoute } from './helper/protected-route';
import { LiveStreaming } from './pages/streaming/live-stream';
import { VideoStreaming } from './pages/streaming/video-stream'
import { UserProfile } from './pages/profile';
import { VideoCategory } from './pages/video-category';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './service/user/fetchUserDetails';
import { setUser } from './state/reducers/user-slice';
import { Live } from './pages/actions/live';
import { Podcast } from './pages/actions/podcast';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCurrentUserDetails() {
      const user = await fetchCurrentUser();
      dispatch(setUser(user))
    }

    fetchCurrentUserDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <Routes>
        <Route exact path={path.USER_LIVE} element={<LiveStreaming />} />
        <Route exact path={path.VIDEO} element={<VideoStreaming />} />
        <Route exact path={path.DASHBOARD} element={<Dashboard />} />
        <Route exact path={path.CATEGORY_VIDEO} element={<VideoCategory />} />
        <Route exact path={path.PROFILE} element={<UserProfile />} />
        <Route exact path={path.LIVE} element={<Live />} />
        <Route exact path={path.PODCAST} element={<Podcast />} />
        <Route element={<IsUserLoggedIn />}>
          <Route exact path={path.SIGNUP} element={<SignUp />} />
          <Route exact path={path.LOGIN} element={<LogIn />} />
        </Route>
        <Route element={<ProtectedRoute />}>

        </Route>
      </Routes>
    </Router>

  );
}

export default App;
