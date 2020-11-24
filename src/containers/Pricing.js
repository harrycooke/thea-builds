import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Divider } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(4, 0, 6, 3),
    // backgroundColor: "#1ce456"
  },
  cardHeader: {
    // backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    backgroundColor: "#1cacc7",
    color: "#fff",
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    margin: theme.spacing(4),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  cardWhole: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'baseline',
    // marginBottom: theme.spacing(2),
    backgroundColor: "#1cacc7",
  },
}));

const tiers = [
  {
    title: 'Kickstarter/Personal',
    subheader: 'Best for you ',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Small Practice',
    subheader: 'Upto 20 providers',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'contained',
  },
  {
    title: 'Unlimited',
    subheader: 'Best for enterprises',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
//   {
//     title: 'Basic/Standard/Starter',
//     price: '0',
//     description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
//     buttonText: 'Sign up for free',
//     buttonVariant: 'outlined',
//   },
//   {
//     title: 'Pro/Premium/Plus',
//     subheader: 'Most popular',
//     price: '15',
//     description: [
//       '20 users included',
//       '10 GB of storage',
//       'Help center access',
//       'Priority email support',
//     ],
//     buttonText: 'Get started',
//     buttonVariant: 'contained',
//   },
//   {
//     title: 'Enterprise/Business Plus',
//     subheader: 'Best Value',
//     price: '30',
//     description: [
//       '50 users included',
//       '30 GB of storage',
//       'Help center access',
//       'Phone & email support',
//       'Phone & email support',
//     ],
//     buttonText: 'Contact us',
//     buttonVariant: 'outlined',
//   },
//   {
//     title: 'Monthly',
//     price: '0',
//     description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
//     buttonText: 'Sign up for free',
//     buttonVariant: 'outlined',
//   },  
//   {
//     title: 'Semi-annual',
//     subheader: 'Most popular',
//     price: '0',
//     description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
//     buttonText: 'Sign up for free',
//     buttonVariant: 'outlined',
//   },
//   {
//     title: 'Annual',
//     subheader: 'Best Value',
//     price: '0',
//     description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support', 'Phone & email support',],
//     buttonText: 'Sign up for free',
//     buttonVariant: 'outlined',
//   },
];
const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

export default function Pricing() {
  const classes = useStyles();

  return (
    <React.Fragment>
        <CssBaseline />
            {/* <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                    Company name
                </Typography>
                <nav>
                    <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                    Features
                    </Link>
                    <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                    Enterprise
                    </Link>
                    <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                    Support
                    </Link>
                </nav>
                <Button href="#" color="primary" variant="outlined" className={classes.link}>
                    Login
                </Button>
                </Toolbar>
            </AppBar> */}

            {/* Hero unit */}
            <Grid container justify="center" spacing={0} >
            <Card style={{
                backgroundColor: "#ffffff",
                padding: 20,
                paddingBottom: 50,
                overflow: "auto",
                height: "100%",
                marginTop: 30,
                }}>
                    <Grid   
                        style={{ paddingTop: 0, paddingLeft: 15, paddingRight: 15, paddingBottom: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start"}}>
                        <Typography
                            color="textSecondary"
                            variant="h3"
                        >
                            Pricing
                        </Typography>
                    </Grid>
                    <Divider />
                    <Container maxWidth="md" component="main" className={classes.heroContent}>
                        {/* <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Pricing
                        </Typography> */}
                        <Typography variant="h6" align="start" color="textSecondary" component="p">
                            Quickly build an effective pricing table for your potential customers with this layout.
                            It&apos;s built with default Material-UI components with little customization.
                        </Typography>
                    </Container>
                    {/* End hero unit */}
                    <Container maxWidth="md" component="main">
                        <Grid container spacing={5} alignItems="flex-end">
                            {tiers.map((tier) => (
                                // Enterprise card is full width at sm breakpoint
                                <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise/Business Plus' ? 12 : 12} md={4} lg={4} xl={4}>
                                {/* <Card className={classes.cardPricing}> */}
                                <Card >
                                    <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Small Practice' ? <StarIcon /> : null}
                                    className={classes.cardHeader}
                                    />
                                    {/* <CardContent> */}
                                    <div className={classes.cardPricing}>
                                        <Typography component="h2" variant="h4" color="textPrimary">
                                        ${tier.price}
                                        </Typography>
                                        <Typography variant="h6" color="textSecondary">
                                        /mo
                                        </Typography>
                                    </div>
                                    <div className={classes.cardPricing}>
                                    <ul>
                                        {tier.description.map((line) => (
                                        <Typography component="li" variant="subtitle1" align="center" key={line} style={{ paddingBottom: 10 }}>
                                            {line}
                                        </Typography>
                                        ))}
                                    </ul>
                                    </div>
                                    {/* </CardContent> */}
                                    <CardActions>
                                    <Button fullWidth variant={tier.buttonVariant} color="primary">
                                        {tier.buttonText}
                                    </Button>
                                    </CardActions>
                                </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Card>
                </Grid>
            {/* Footer */}
            <Container maxWidth="md" component="footer" className={classes.footer}>
                {/* <Grid container spacing={4} justify="space-evenly">
                {footers.map((footer) => (
                    <Grid item xs={6} sm={3} key={footer.title}>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                        {footer.title}
                    </Typography>
                    <ul>
                        {footer.description.map((item) => (
                        <li key={item}>
                            <Link href="#" variant="subtitle1" color="textSecondary">
                            {item}
                            </Link>
                        </li>
                        ))}
                    </ul>
                    </Grid>
                ))}
                </Grid> */}
                {/* <Box mt={5}>
                <Copyright />
                </Box> */}
            </Container>
            {/* End footer */}
    </React.Fragment>
  );
}