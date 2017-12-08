import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Button, Table, TableBody, TableCell,
  TableHead, TableRow, FormControl, Input, InputLabel } from 'material-ui';
import Notification from '../../shared/components/notification';

class GroupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: '',
      minimum: '',
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
    const { groups, minimum } = this.state;
    this.result = [];
    this.current = Math.ceil(peopleCount / parseInt(groups, 10));
    this.currentCount = peopleCount;
    if (Math.floor(peopleCount / parseInt(groups, 10)) < parseInt(minimum, 10)) {
      Notification.error(`You can make within ${Math.floor(peopleCount / parseInt(minimum, 10))} groups`);
    } else {
      for (let i = 0; i < parseInt(groups, 10); i += 1) {
        this.result.push([]);
      }
      loadPeopleRandom()
        .then((res) => {
          let i = 0;
          let z = 0;
          res.data.forEach((item) => {
            if (this.current === z) {
              i += 1;
              z = 0;
              this.currentCount -= this.current;
              this.current = Math.ceil(this.currentCount / (parseInt(groups, 10) - i));
            }
            z += 1;
            this.result[i].push(item);
          });
        })
        .then(() => {
          this.setState({ madeGroup: this.result });
          Notification.success(`Made ${groups} groups`);
        });
    }
  }
  render() {
    const { groups, minimum, madeGroup } = this.state;
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
                  <InputLabel htmlFor="minimum">Minimum of a Group</InputLabel>
                  <Input id="minimum" value={minimum} onChange={event => this.handleChange(event, 'minimum')} />
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
