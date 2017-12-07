import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Button, Table, TableBody, TableCell,
  TableHead, TableRow, FormControl, Input, InputLabel } from 'material-ui';

class GroupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: '',
      limit: '',
      madeGroup: [],
    };
    this.result = [];
    this.handleChange = this.handleChange.bind(this);
    this.makeGroups = this.makeGroups.bind(this);
  }
  componentWillMount() {
    const { loadPeopleCount } = this.props;
    loadPeopleCount();
  }
  handleChange(event, target) {
    this.setState({ [target]: event.target.value });
  }
  makeGroups() {
    const { loadPeopleRandom, peopleCount } = this.props;
    const { groups, limit } = this.state;
    this.result = [];
    if (Math.ceil(peopleCount / parseInt(limit, 10)) < parseInt(groups, 10)) {
      alert(`Too many!! You can make ${Math.ceil(peopleCount / parseInt(limit, 10))} groups`);
    } else if (Math.ceil(peopleCount / parseInt(limit, 10)) > parseInt(groups, 10)) {
      alert(`Too low!! You can make ${Math.ceil(peopleCount / parseInt(limit, 10))} groups`);
    } else {
      for (let i = 0; i < Math.ceil(peopleCount / parseInt(limit, 10)); i += 1) {
        this.result.push([]);
      }
      loadPeopleRandom()
        .then((res) => {
          let i = 0;
          res.data.forEach((item) => {
            if (this.result[i].length >= parseInt(limit, 10)) {
              i += 1;
            }
            this.result[i].push(item);
          });
        })
        .then(() => this.setState({ madeGroup: this.result }));
    }
  }
  render() {
    const { groups, limit, madeGroup } = this.state;
    return (
      <Grid container spacing={16} justify="center">
        <Grid item xs={4}>
          <Paper style={{ padding: 10 }}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="groups">Number of Groups</InputLabel>
                  <Input id="groups" value={groups} onChange={event => this.handleChange(event, 'groups')} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="limit">Limit of a Group</InputLabel>
                  <Input id="limit" value={limit} onChange={event => this.handleChange(event, 'limit')} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button style={{ width: '100%' }} onClick={this.makeGroups}>
                  make groups
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={16}>
            { madeGroup.map((items, i) => (
              <Grid key={i} item xs={2}>
                <Paper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="dense" style={{ textAlign: 'center' }}>{`Group ${i + 1}`}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        items.map(item => (
                          <TableRow key={item.name}>
                            <TableCell padding="dense" style={{ textAlign: 'center' }}>{item.name}</TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

GroupComponent.propTypes = {
  loadPeopleRandom: PropTypes.func.isRequired,
  loadPeopleCount: PropTypes.func.isRequired,
  peopleCount: PropTypes.number.isRequired,
};

export default GroupComponent;
