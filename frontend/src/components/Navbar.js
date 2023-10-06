import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const openLogoutDialog = () => {
        setIsLogoutDialogOpen(true);
    };

    const closeLogoutDialog = () => {
        setIsLogoutDialogOpen(false);
    };

    const handleLogout = () => {
        logout();
        closeLogoutDialog();
    };

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Campus Circle</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <Link to="/following">Following</Link>
                            <Link to="/users">Users</Link>
                            <Link to="/profile">Profile</Link>
                            <Link to="/settings">Settings</Link>
                            <span>{user.email}</span>
                            <button onClick={openLogoutDialog}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>

            <Dialog
                open={isLogoutDialogOpen}
                onClose={closeLogoutDialog}
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-description"
            >
                <div>
                    <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="logout-dialog-description">
                            Are you sure you want to log out?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeLogoutDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleLogout} color="primary">
                            Logout
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </header>
    );
};

export default Navbar;
