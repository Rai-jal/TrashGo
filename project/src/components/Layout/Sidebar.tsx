import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import { Home, Truck, CreditCard, MessageSquare, X } from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  return (
    <Box className="w-[240px] md:w-[280px] bg-primary-main text-white flex flex-col h-full">
      <Box className="p-4 md:p-6 flex items-center justify-between border-b border-primary-dark">
        <Box className="flex items-center">
          <Truck size={28} className="mr-2" />
          <Typography variant="h5" className="font-bold">TRASHGO</Typography>
        </Box>
        {onClose && (
          <IconButton onClick={onClose} className="text-white md:hidden">
            <X size={20} />
          </IconButton>
        )}
      </Box>
      
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          <NavItem to="/" icon={<Home size={20} />} label="Overview" />
          <NavItem to="/service-pickup" icon={<Truck size={20} />} label="Service Pickup" />
          <NavItem to="/billing" icon={<CreditCard size={20} />} label="Billing" />
          <NavItem to="/feedback" icon={<MessageSquare size={20} />} label="Feedback" />
        </ul>
      </nav>
    </Box>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center px-6 py-3 text-white hover:bg-primary-dark transition-colors ${
            isActive ? 'bg-primary-dark' : ''
          }`
        }
      >
        <span className="mr-3">{icon}</span>
        <Typography variant="body2" className="font-medium">{label}</Typography>
      </NavLink>
    </li>
  );
};

export default Sidebar;