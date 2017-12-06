import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import ModalAddPersonComponent from './add-person-component';

import { people } from '../../redux/modules';

const { ADD_PEOPLE_REDUX_FORM } = people;

const onSubmit = (values, dispatch, props) => {
  console.log(values);
};

const reduxFormComponent = reduxForm({
  form: ADD_PEOPLE_REDUX_FORM,
  onSubmit,
})(ModalAddPersonComponent);

const selector = formValueSelector(ADD_PEOPLE_REDUX_FORM);

const mapStateToProps = state => ({
  val: selector(state, 'id', 'name'),
});

const mapDispatchToProps = dispatch => ({

});

const ModalAddPersonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxFormComponent);

export default ModalAddPersonContainer;
