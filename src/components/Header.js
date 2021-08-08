import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Button, Typography, MenuItem, Menu } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import {  useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight:  theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = () => {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose =(link) => {
        setAnchorEl(null);

        if (link) {
            history.push(link)
        }
    }


    
    return (
        <>
            <AppBar position ="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        onClick={handleMenuButtonClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Stranger's Things
                    </Typography>
                <Button 
                color ="inherit"
                onClick={() => history.push('/login')}
                >
                    Login
                </Button>
                </Toolbar>
            </AppBar>
            <Menu   
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleMenuClose('/')}>Home</MenuItem>
                <MenuItem onClick={() => handleMenuClose('/posts')}>Post</MenuItem>
                <MenuItem onClick={() => handleMenuClose('/login')}>Login</MenuItem>
                <MenuItem onClick={() => handleMenuClose('/messages')}>Messages</MenuItem>
            </Menu>
            </>
    );
};

export default Header;