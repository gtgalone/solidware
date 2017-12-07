import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography, Toolbar } from 'material-ui';
import { PersonAdd, Delete } from 'material-ui-icons';

class GroupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
  }
  render() {
    return (
      <Grid container spacing={0} justify="center">
        <div>group</div>
      </Grid>
    );
  }
}

GroupComponent.propTypes = {
};

export default GroupComponent;
