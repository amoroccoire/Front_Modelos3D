import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './page';
import DashboardPage from './dashboard/page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de autenticación */}
        <Route path="/" element={<AuthPage />} />
        {/* Ruta del dashboard */}
        <Route path="/dashboard" element={<DashboardPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
