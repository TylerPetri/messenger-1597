import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import bgImg from '../assets/images/bg-img.png';

const useStyles = makeStyles((theme) => ({
  SideBanner: {
    height: '100vh',
    background: `linear-gradient(rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)), url(${bgImg})`,
    position: 'relative',
    zIndex: '10',
    color: 'white',
  },
  logo: {
    fontSize: '3em',
    marginBottom: '20px',
  },
  text: {
    width: '70%',
    fontSize: '1.5em',
    textAlign: 'center',
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
  },
}));

export default function SideBanner() {
  const classes = useStyles();

  return (
    <>
      <Grid
        className={classes.SideBanner}
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <IoChatbubbleEllipsesOutline className={classes.logo} />
        <Typography className={classes.text}>
          Converse with anyone with any language
        </Typography>
      </Grid>
    </>
  );
}
