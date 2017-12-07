import React from 'react';
import PropTypes from 'prop-types';
import { Input, FormControl, InputLabel, FormHelperText } from 'material-ui';
import $ from 'jquery';

const styles = {
  errorText: {
    display: 'block',
    color: '#ff0000',
  },
};

class FormGroupInput extends React.Component {
  componentDidMount() {
    $(this.groupNode).click(() => $(this.inputNode).focus());
  }
  render() {
    const {
      input, type, label, required, readOnly, placeholder,
      maxLength, autoFocus, meta, multiline,
      rows, rowsMax, inputClass,
    } = this.props;
    return (
      <FormControl
        error={meta.dirty && meta.error}
      >
        {label && <InputLabel>{label}</InputLabel>}
        <Input
          {...input}
          readOnly={readOnly}
          required={required}
          multiline={multiline}
          rows={rows}
          className={inputClass}
          rowsMax={rowsMax}
          type={type}
          placeholder={placeholder}
          autoFocus={autoFocus}
          fullWidth
          inputProps={{
            maxLength,
          }}
        />
        { meta.dirty && meta.error && <FormHelperText>{meta.error}</FormHelperText> }
      </FormControl>
    );
  }
}

FormGroupInput.defaultProps = {
  label: null,
  type: 'text',
  placeholder: null,
  helperBlock: null,
  readOnly: false,
  required: false,
  maxLength: null,
  autoFocus: false,
  multiline: false,
  rows: null,
  rowsMax: null,
  inputClass: null,
};

FormGroupInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.objectOf(PropTypes.any).isRequired,
  input: PropTypes.objectOf(PropTypes.any).isRequired,
  helperBlock: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  autoFocus: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  inputClass: PropTypes.string,
};

export default FormGroupInput;
