import React, { useState } from 'react';
import { Card, Typography, TextField, Button, Rating, Snackbar, Alert } from '@mui/material';

const FeedbackForm: React.FC = () => {
  const [serviceRating, setServiceRating] = useState<number | null>(0);
  const [agentRating, setAgentRating] = useState<number | null>(0);
  const [comment, setComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the feedback to an API
    setFeedbackSubmitted(true);
  };

  const handleCloseSnackbar = () => {
    setFeedbackSubmitted(false);
  };

  return (
    <>
      <Card className="p-6 shadow-sm max-w-2xl mx-auto">
        <Typography variant="h5" className="mb-4">Service Feedback</Typography>
        <Typography variant="body2" className="mb-6">
          Help us improve our service by providing your feedback
        </Typography>
        
        <div className="mb-6">
          <Typography variant="subtitle1" className="mb-2">How would you rate our service</Typography>
          <Rating
            name="service-rating"
            value={serviceRating}
            onChange={(_, newValue) => setServiceRating(newValue)}
            size="large"
          />
        </div>
        
        <div className="mb-6">
          <Typography variant="subtitle1" className="mb-2">How was the agent's attitude?</Typography>
          <Rating
            name="agent-rating"
            value={agentRating}
            onChange={(_, newValue) => setAgentRating(newValue)}
            size="large"
          />
        </div>
        
        <div className="mb-6">
          <Typography variant="subtitle1" className="mb-2">Where can we improve?</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Share your suggestions with us"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={handleSubmit}
          disabled={!serviceRating || !agentRating}
        >
          Submit Feedback
        </Button>
      </Card>

      <Snackbar
        open={feedbackSubmitted}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Thank you for your feedback!
        </Alert>
      </Snackbar>
    </>
  );
};

export default FeedbackForm;