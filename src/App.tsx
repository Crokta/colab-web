import { Route, Routes, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { viteClerkPublishableKey } from './constants';
import RootLayout from './layouts/RootLayout.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import HomePage from './pages/HomePage.tsx';
import CreateServerModal from './components/modals/CreateServerModal.tsx';

function App() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={viteClerkPublishableKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="" element={<RootLayout />}>
          <Route
            path="/"
            index
            element={
              <ProtectedRoute>
                <CreateServerModal />
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </ClerkProvider>
  );
}

export default App;
