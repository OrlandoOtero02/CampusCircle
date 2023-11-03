import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';
import { Navigate, useLocation } from 'react-router';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react';
import { useCircleContext } from '../hooks/useCircleContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

const CircleLandingPage = () => {
    const {circles, dispatch} = useCircleContext()
    const location = useLocation();
    const { user } = useAuthContext();
    const { circleId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(circleId);
        const fetchCircle = async () => {
            const response = await fetch('/api/circles/' + circleId, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({type: 'SET_CIRCLES', payload: json})
            }
        }

        if (user) {
            fetchCircle()
        }
    }, [user, dispatch])

    const navMemberList = () => {
        // Use the history object to navigate to the new page with the circleId parameter
        navigate(`/memberlist/${JSON.stringify(circles.members)}`);
    };

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
        <Button onClick={navMemberList}>
          <GroupIcon fontSize="large" />
          <div>Member List</div>
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default CircleLandingPage;
