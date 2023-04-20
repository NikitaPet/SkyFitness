import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from 'components/protectedRoute/ProtectedRoute';
import Exercise from 'pages/exercise';
import Main from 'pages/main';
import LoginPage from 'pages/loginPage';
import Profile from 'pages/profile';
import Description from 'pages/description';
import { userLogInSelector } from 'store/selectors/selectors';
import { useSelector } from 'react-redux';

export default function AppRoutes() {
  const isLogin = useSelector(userLogInSelector);
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/description/*" element={<Description />} />
      <Route path="/profile" element={<Profile />} />
      <Route element={<ProtectedRoute isAllowed={isLogin} />}>
        <Route path="/exercise" element={<Exercise />} />
      </Route>
    </Routes>
  );
}
