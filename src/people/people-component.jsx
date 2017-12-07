import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography, Toolbar } from 'material-ui';
import { PersonAdd, Delete } from 'material-ui-icons';

import ModalAddPersonContainer from './modal/add-person-container';

class PeopleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addPerson: false,
    };
  }
  componentWillMount() {
    const { loadPeople } = this.props;
    loadPeople();
  }
  render() {
    const { people, destroyPerson } = this.props;
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
                      <TableCell padding="dense" style={{ textAlign: 'center' }}>Name</TableCell>
                      <TableCell padding="dense" style={{ textAlign: 'center' }}>
                        <IconButton onClick={() => this.setState({ addPerson: true })}>
                          <PersonAdd />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      people.map(item => (
                        <TableRow key={item.name}>
                          <TableCell padding="dense" style={{ textAlign: 'center' }}>{item.name}</TableCell>
                          <TableCell padding="dense" style={{ textAlign: 'center' }}>
                            <IconButton onClick={() => { if (confirm('Really?')) destroyPerson(item._id); }}>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </Grid>
              <ModalAddPersonContainer
                addPerson={addPerson}
                onRequestClose={() => this.setState({ addPerson: false })}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

PeopleComponent.propTypes = {
  loadPeople: PropTypes.func.isRequired,
  people: PropTypes.arrayOf(Object).isRequired,
  destroyPerson: PropTypes.func.isRequired,
};

export default PeopleComponent;
