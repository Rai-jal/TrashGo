import React from 'react';
import { Box, IconButton, Badge, Avatar, useMediaQuery } from '@mui/material';
import { Bell, User } from 'lucide-react';
import { currentUser } from '../../mockData';

const Header: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Box className="h-16 md:h-20 border-b border-gray-200 bg-white px-4 md:px-6 flex items-center justify-end">
      <Box className="flex items-center space-x-2 md:space-x-4">
        <IconButton className="text-gray-500 hover:text-primary-main transition-colors">
          <Badge badgeContent={3} color="primary">
            <Bell size={isMobile ? 20 : 24} />
          </Badge>
        </IconButton>
        
        <Box className="flex items-center space-x-3">
          <Box className="hidden md:block text-right">
            <Box component="span" className="block text-sm font-medium text-gray-700">
              {currentUser.name}
            </Box>
            <Box component="span" className="block text-xs text-gray-500">
              {currentUser.email}
            </Box>
          </Box>
          <Avatar
            className="bg-primary-main"
            sx={{ width: isMobile ? 32 : 40, height: isMobile ? 32 : 40 }}
          >
            {currentUser.name[0]}
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;