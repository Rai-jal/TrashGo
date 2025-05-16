//import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import AppLayout from './components/Layout/AppLayout';
import Dashboard from './pages/Dashboard';
import ServicePickup from './pages/ServicePickup';
import ServiceRequestDetails from './components/ServicePickup/ServiceRequestDetails';
import Billing from './pages/Billing';
import Feedback from './pages/Feedback';
import QRCode from './pages/QRCode';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/service-pickup" element={<ServicePickup />} />
            <Route path="/details/:id" element={<ServiceRequestDetails />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/qr-code" element={<QRCode />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;