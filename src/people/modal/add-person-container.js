import { connect } from 'react-redux';
import { reduxForm, formValueSelector, reset } from 'redux-form';

import { people } from '../../redux/modules';
import { actionForList, isSuccess } from '../../../shared/redux/modules/redux-rest-api';

import ModalAddPersonComponent from './add-person-component';

const { ADD_PEOPLE_REDUX_FORM } = people;
const { create: createPerson, add: addPerson } = actionForList('people', '/people');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values, dispatch, props) => {
  return sleep(100).then(() => {
    if (props.people.filter(v => v.name.toLowerCase() === values.name.toLowerCase()).length > 0) {
      throw { name: 'That name is taken' }
    }
  });
};

const onSubmit = (values, dispatch, props) => {
  const formData = {
    name: values.name,
  };

  dispatch(createPerson(formData)).then((res) => {
    if (isSuccess(res.type)) {
      dispatch(addPerson(res.data));
      dispatch(reset(ADD_PEOPLE_REDUX_FORM));
    }
  });
};

const reduxFormComponent = reduxForm({
  form: ADD_PEOPLE_REDUX_FORM,
  onSubmit,
  asyncValidate,
  asyncBlurFields: ['name'],
  destroyOnUnmount: true,
})(ModalAddPersonComponent);

const selector = formValueSelector(ADD_PEOPLE_REDUX_FORM);

const mapStateToProps = state => ({
  val: selector(state, 'id', 'name'),
  people: state.people,
});

const mapDispatchToProps = dispatch => ({
});

const ModalAddPersonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxFormComponent);

export default ModalAddPersonContainer;
