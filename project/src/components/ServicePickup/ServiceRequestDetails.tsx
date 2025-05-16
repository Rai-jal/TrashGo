import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography } from '@mui/material';
import { ServiceRequest } from '../../types';

const ServiceRequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the bin ID from the URL
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const dummyServiceRequest = {
    binId: 'BIN12345',
    type: 'Trash Pickup',
    status: 'Pending',
    requestDate: '2025-04-15T10:30:00Z',
    notes: 'Please ensure the bin is emptied before 12 PM.',
  };

  useEffect(() => {
    if (!id) {
      setError('Invalid request ID');
      setLoading(false);
      return;
    }

    const fetchRequest = async () => {
      try {
        const response = await fetch(`/api/service-requests/${id}`);
        console.log('API Response:', response); // Debugging
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Service request not found');
          } else {
            throw new Error(`Server error: ${response.statusText}`);
          }
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format: Expected JSON');
        }

        const data = await response.json();
        console.log('Parsed Data:', data); // Debugging
        setRequest(data);
      } catch (err: any) {
        console.error('Error fetching service request:', err);
        setError(err?.message || 'An unexpected error occurred');
        setRequest(dummyServiceRequest); // Fallback to dummy data
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return (
      <Card className="p-6 shadow-sm max-w-2xl mx-auto">
        <Typography variant="h6" color="error" className="mb-4">
          {error}
        </Typography>
      </Card>
    );
  }

  if (!request) {
    return <Typography>No request data available</Typography>;
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card className="p-6 shadow-sm max-w-2xl mx-auto">
      <Typography variant="h5" className="mb-4">Service Request Details</Typography>
      <Typography variant="body1" className="mb-2"><strong>Type:</strong> {request.type}</Typography>
      <Typography variant="body1" className="mb-2"><strong>Bin ID:</strong> {request.binId}</Typography>
      <Typography variant="body1" className="mb-2"><strong>Status:</strong> {request.status}</Typography>
      <Typography variant="body1" className="mb-2"><strong>Requested On:</strong> {formatDate(request.requestDate)}</Typography>
      <Typography variant="body1" className="mb-2"><strong>Additional Notes:</strong> {request.notes || 'No additional notes provided.'}</Typography>
    </Card>
  );
};

export default ServiceRequestDetails;
