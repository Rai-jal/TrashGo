import React from 'react';
import { Typography, Grid } from '@mui/material';
import { Scale, Calendar, ClipboardList } from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import { currentUser, stats, wasteCollections } from '../mockData';

const Dashboard: React.FC = () => {
  const nextCollection = wasteCollections.find(collection => collection.status === 'Scheduled');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const nextCollectionTime = nextCollection 
    ? `${nextCollection.time}pm: ${nextCollection.type} Waste` 
    : 'No upcoming collections';

  return (
    <div className="max-w-7xl mx-auto">
      <Typography variant="h4" className="mb-6 md:mb-8">
        {`Welcome back, ${currentUser.name}`}
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={4}>
          <StatCard 
            title="Total Waste Collection" 
            value={`${stats.totalWasteCollected} KG`}
            subtitle={`${stats.percentageChange}% from last month`}
            icon={<Scale />}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} lg={4}>
          <StatCard 
            title="Next Collection" 
            value={nextCollection ? formatDate(nextCollection.date) : 'None'}
            subtitle={nextCollectionTime}
            color="bg-secondary-main text-white"
            icon={<Calendar />}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} lg={4}>
          <StatCard 
            title="Active Requests" 
            value={stats.activeRequests}
            subtitle={`${stats.inProgressRequests} in progress, ${stats.pendingRequests} pending`}
            color="bg-primary-dark text-white"
            icon={<ClipboardList />}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;