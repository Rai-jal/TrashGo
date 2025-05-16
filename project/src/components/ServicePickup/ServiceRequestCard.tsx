import React, { useState } from 'react';
import { Card, Typography, Chip, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ServiceRequest } from '../../types';

interface ServiceRequestCardProps {
  request: ServiceRequest;
}

const ServiceRequestCard: React.FC<ServiceRequestCardProps> = ({ request }) => {
  const [currentStatus, setCurrentStatus] = useState(request.status);
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDetailsClick = () => {
    navigate(`/details/${request.binId}`); // Navigate to the details page with the bin ID
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleCancel = async () => {
    try {
      // Replace with your API endpoint
      await fetch(`/api/service-requests/${request.binId}/cancel`, {
        method: 'POST',
      });
      setCurrentStatus('Cancelled');
      console.log(`Request with Bin ID ${request.binId} has been cancelled.`);
    } catch (error) {
      console.error('Failed to cancel the request:', error);
    }
  };

  if (!request) {
    return <Typography>No request data available</Typography>;
  }

  return (
    <Card className="p-4 mb-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <Typography variant="h6">{request.type}</Typography>
          <Typography variant="body2" className="text-gray-600">
            Bin ID: {request.binId}
          </Typography>
        </div>
        <Chip 
          label={currentStatus} 
          className={getStatusColor(currentStatus)}
          size="small"
        />
      </div>
      <Typography variant="body2" className="mb-3">
        Requested on: {formatDate(request.requestDate)}
      </Typography>
      <div className="flex justify-end space-x-2">
        {currentStatus === 'Pending' && (
          <Button 
            variant="outlined" 
            color="error" 
            size="small"
            onClick={handleCancel}
            aria-label="Cancel Request"
          >
            Cancel
          </Button>
        )}
        <Button 
          variant="contained" 
          color="primary" 
          size="small"
          onClick={handleDetailsClick}
          aria-label="View Details"
        >
          Details
        </Button>
      </div>
    </Card>
  );
};

export default ServiceRequestCard;