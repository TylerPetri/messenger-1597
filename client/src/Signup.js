import React, { useState } from 'react';
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
  FormHelperText,
} from '@material-ui/core';
import { register } from './store/utils/thunkCreators';
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
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: 'Passwords must match' });
      return;
    }

    await register({ username, email, password });
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
            <Typography> </Typography>
            <Typography>Already have an account?</Typography>
            <Button onClick={() => history.push('/login')}>Login</Button>
          </Grid>
        </Box>
        <Grid item xs>
          <form onSubmit={handleRegister}>
            <Grid
              className={classes.formGrid}
              container
              direction='column'
              spacing={1}
            >
              <Typography>
                <h1>Create an account.</h1>
              </Typography>
              <Grid item>
                <FormControl fullWidth>
                  <TextField
                    aria-label='username'
                    label='Username'
                    name='username'
                    type='text'
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <TextField
                    label='E-mail address'
                    aria-label='e-mail address'
                    type='email'
                    name='email'
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  error={!!formErrorMessage.confirmPassword}
                  fullWidth
                >
                  <TextField
                    aria-label='password'
                    label='Password'
                    type='password'
                    inputProps={{ minLength: 6 }}
                    name='password'
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  error={!!formErrorMessage.confirmPassword}
                  fullWidth
                >
                  <TextField
                    label='Confirm Password'
                    aria-label='confirm password'
                    type='password'
                    inputProps={{ minLength: 6 }}
                    name='confirmPassword'
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Button
                className={classes.button}
                type='submit'
                variant='contained'
                size='large'
              >
                Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
