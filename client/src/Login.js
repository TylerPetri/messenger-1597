import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from '@material-ui/core';
import { login } from './store/utils/thunkCreators';
import SideBanner from './components/SideBanner';

const useStyles = makeStyles((theme) => ({
  SideBannerGrid: {
    maxWidth: '400px',
  },
  formGrid: {
    width: '80%',
    margin: '0 auto',
  },
  button: {
    width: '150px',
    margin: '20px auto',
    fontFamily: 'Montserrat, sans-serif',
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to='/home' />;
  }

  return (
    <Grid container>
      <Grid className={classes.SideBannerGrid} item xs>
        <SideBanner />{' '}
      </Grid>
      <Grid container item xs direction='column'>
        <Box m={5}>
          <Grid
            container
            item
            justifyContent='space-around'
            alignItems='center'
          >
            <Typography></Typography>
            <Typography color='secondary'>Already have an account?</Typography>
            <Button color='primary' onClick={() => history.push('/register')}>
              Create account
            </Button>
          </Grid>
        </Box>
        <Grid item xs>
          <form onSubmit={handleLogin}>
            <Grid
              className={classes.formGrid}
              container
              direction='column'
              spacing={1}
            >
              <Typography>
                <h1>Welcome back!</h1>
              </Typography>
              <Grid item>
                <FormControl fullWidth>
                  <TextField
                    aria-label='username'
                    label='Username'
                    name='username'
                    type='text'
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth required>
                  <TextField
                    label='Password'
                    aria-label='password'
                    type='password'
                    name='password'
                  />
                </FormControl>
              </Grid>

              <Button
                className={classes.button}
                color='primary'
                type='submit'
                variant='contained'
                size='large'
              >
                Login
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
