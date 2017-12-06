import { connect } from 'react-redux';

import PeopleComponent from './people-component';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

const PeopleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PeopleComponent);

export default PeopleContainer;
