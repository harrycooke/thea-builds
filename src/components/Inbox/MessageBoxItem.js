import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import {
  Grid,
  Card,
  Typography,
  Avatar,
  Checkbox
} from "@material-ui/core"

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  avatarWrap: {
    padding: 8
  }
})

export class MessageBoxItem extends Component {
  render() {
    const { classes } = this.props
    return (
      <Card className={classes.root}>
        <Grid container justify="center" spacing={1}>
          <Grid item xs={2} style={{ padding: 8 }}>
            <Avatar src={require("../../assets/images/alice.png")} />
          </Grid>
          <Grid item xs={7}>
            <Typography variant="h6">Dr. Anita Ramos</Typography>
            <label variant="subtitle1">Re. John Smith</label>
          </Grid>
          <Grid item xs={2}>
            <label>11:30am</label>
          </Grid>
          <Grid item xs={1}>
            <Checkbox color="primary" style={{ padding: 0 }} />
          </Grid>
        </Grid>
        <Typography color="textSecondary" style={{ marginTop: 10 }}>
          Looks like the patient is suffering from macular edema caused by their diabetes. Order OCT to confirm.
        </Typography>
      </Card>
    )
  }
}

export default withStyles(styles)(MessageBoxItem)