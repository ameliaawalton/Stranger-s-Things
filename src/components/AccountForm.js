import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { callApi } from '../api';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper,  TextField, Button } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        minWidth: '600px',
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        }
    }
}))

const AccountForm = ({ action, setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isLogin = action === 'login';
    const title = isLogin ? 'Login' : 'Register';
    const oppositeAction = isLogin ? 'register' : 'login';
    const oppositeTitle = isLogin ? 'Register' : 'Login';
    const history = useHistory();
    const classes = useStyles();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await callApi({
            url: `users/${action}`,
            body: { user: { username, password } },
            method: 'POST',
        });

        const token = data.data.token;

        if (token) {
            localStorage.setItem('st-token', token);
            setToken(token);
            history.push('/');
        }
    };

return (
       
       <>
    <Grid container alignItems="center" justifyContent="center">
        <Paper className= {classes.paper}>
            <Grid 
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
                spacing={3}
        >
            <Grid item>
                <Typography variant="h6" align="center">
                    {title}
                </Typography>
        </Grid> 
        <Grid item>
            <TextField
                    required
                    label="username"
                    value={username}
                    onChange={(event) => 
                        setUsername(event.target.value)
                    }
            />
        </Grid>
        <Grid item>
            <TextField
                    required
                    label="password"
                    type="password"
                    value={password}
                    onChange={(event) => 
                        setPassword(event.target.value)
                    }
                />
                </Grid>
        <Grid item>
            <Button 
            onClick={handleSubmit}
            color="primary" 
            variant ="contained">
                {title}
                </Button>
            </Grid>
        <Grid item>
            <Button 
            onClick={handleSubmit}
            color="secondary" 
            variant ="contained"
            onClick={() => 
                history.push(`/${oppositeAction}`)
            }
            >
                {oppositeTitle}
                </Button>
            </Grid>
        </Grid>
    </Paper>
</Grid>
        </>
    );
};

                
export default AccountForm;

