import React from 'react';
import { Card, Typography, Box } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  color = 'bg-primary-main text-white',
  icon
}) => {
  return (
    <Card 
      className={`${color} p-4 md:p-6 w-full h-full flex flex-col relative overflow-hidden`}
      elevation={0}
    >
      {icon && (
        <Box className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
          {React.cloneElement(icon as React.ReactElement, { 
            size: 120,
            strokeWidth: 1
          })}
        </Box>
      )}
      
      <Typography variant="subtitle2" className="mb-1 md:mb-2 font-medium opacity-90">
        {title}
      </Typography>
      
      <Typography variant="h4" className="font-bold mb-2 md:mb-3">
        {value}
      </Typography>
      
      {subtitle && (
        <Typography variant="body2" className="mt-auto opacity-90">
          {subtitle}
        </Typography>
      )}
    </Card>
  );
};

export default StatCard;