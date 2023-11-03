import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';

const CircleLandingPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ButtonGroup variant="outlined">
        <Button>
          <EmailIcon fontSize="large" />
          <div>Message</div>
        </Button>
        <Button>
          <EventIcon fontSize="large" />
          <div>Events</div>
        </Button>
        <Button>
          <GroupIcon fontSize="large" />
          <div>Member List</div>
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default CircleLandingPage;
