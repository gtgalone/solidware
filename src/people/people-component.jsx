import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Dialog, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Toolbar } from 'material-ui';

import ModalAddPersonContainer from './modal/add-person-container';

const people = [
  { id: 1, name: 'qwdqwd' },
  { id: 2, name: 'qwdqwd' },
  { id: 3, name: 'qwdqwd' },
  { id: 4, name: 'qwdqwd' },
  { id: 5, name: 'qwdqwd' },
  { id: 6, name: 'qwdqwd' },
  { id: 7, name: 'qwdqwd' },
  { id: 8, name: 'qwdqwd' },
  { id: 9, name: 'qwdqwd' },
  { id: 10, name: 'qwdqwd' },
];

class PeopleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addPerson: false,
    };
  }
  render() {
    const { addPerson } = this.state;
    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={6}>
          <Grid container spacing={0}>
            <Paper style={{ width: '100%' }}>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Toolbar>
                  <Typography
                    type="body1"
                    component="span"
                  >
                    List of People For Lunch
                  </Typography>
                </Toolbar>
              </Grid>
              <Grid item xs={12}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>
                        <Button onClick={() => this.setState({ addPerson: true })}>add person</Button>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      people.map(item => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </Grid>
              <ModalAddPersonContainer addPerson={addPerson} onRequestClose={() => this.setState({ addPerson: false })} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

PeopleComponent.propTypes = {
};

export default PeopleComponent;
