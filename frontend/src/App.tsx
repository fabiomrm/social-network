import { AuthContextProvider } from './contexts/AuthContext';
import { MainRoutes } from './MainRoutes';

export const App = () => {
  return (
    <AuthContextProvider>
      <MainRoutes />
    </AuthContextProvider>
  );
};
