import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Feed } from '../pages/Feed';
import { Login } from '../pages/Login';

export const MainRoutes = () => {
  const { token } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {!token ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/feed" element={<Feed />} />
            <Route path="/" element={<Navigate to="/feed" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
