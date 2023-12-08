import React, { useState, useEffect } from 'react';
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
    const [isAdmin, setIsAdmin] = useState(false);

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

    useEffect(() => {
      const checkAdminStatus = async () => {
          if (user) {
            const response = await fetch('/api/user/getUserById/' + user._id);

            const json = await response.json();


            setIsAdmin(json.user.isAdmin)

          }
      };

      checkAdminStatus();
    }, [user]);

    return (
        <header className={document.body.className}> {/* Apply the 'dark' class dynamically */}
            <div className="container">
                <Link to="/">
                    <h1>Campus Circle</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <Link style={{ marginRight: 30 }} to="/map">Map</Link>
                            <Link style={{ marginRight: 30 }} to="/blockedUsers">Blocked Users</Link>
                            <Link style={{ marginRight: 30 }} to="/joinablecircles">Join Circles</Link>
                            {/* <Link to="/following">Following</Link> */}
                            <Link style={{ marginRight: 30 }} to="/users">Users</Link>
                            <Link style={{ marginRight: 30 }} to="/profile">Profile</Link>
                            <Link style={{ marginRight: 30 }} to="/settings">Settings</Link>
                            <Link style={{ marginRight: 30 }} to="/inbox">Inbox</Link>
                            <Link to="/admin">Admin</Link> {/* Add the link to AdminPage it should be admin view only later on */}
                            {user.isAdmin && <Link to="/admin">Admin</Link>}
                            <span>{user.email}</span>
                            <Button style={{ marginLeft: 30 }} variant="contained" onClick={openLogoutDialog}>Log out</Button>
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
