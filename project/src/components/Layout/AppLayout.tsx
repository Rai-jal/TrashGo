import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, Box, IconButton, useMediaQuery } from '@mui/material';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';
import theme from '../../theme';

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <ThemeProvider theme={theme}>
      <Box className="flex min-h-screen bg-gray-50">
        {/* Mobile menu button */}
        {isMobile && (
          <IconButton
            className="fixed top-4 left-4 z-50 bg-white shadow-md"
            onClick={toggleSidebar}
            size="small"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </IconButton>
        )}

        {/* Sidebar with overlay for mobile */}
        <Box
          className={`
            ${isMobile ? 'fixed inset-y-0 left-0 z-40' : 'relative'}
            ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
            transition-transform duration-300 ease-in-out
          `}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </Box>
        {isMobile && sidebarOpen && (
          <Box
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setSidebarOpen(false)}
            role="button"
            aria-label="Close sidebar overlay"
          />
        )}

        {/* Main content */}
        <Box className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AppLayout;