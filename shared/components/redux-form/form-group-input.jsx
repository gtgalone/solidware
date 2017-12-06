import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'material-ui';
import $ from 'jquery';

const styles = {
  input: {
    fontSize: '0.8rem',
    padding: 8,
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    color: '#000',
  },
  hasError: {
    border: '1px solid #ff0000',
  },
  errorText: {
    fontSize: '0.7rem',
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
      maxLength, autoFocus, helperBlock, meta, async, multiline,
      rows, rowsMax, className, inputClass, defaultValue,
    } = this.props;
    return (
      <div
        className={className}
        ref={(node) => { this.groupNode = node; }}
        style={{ display: type === 'hidden' && 'none' }}
      >
        {label && <label dangerouslySetInnerHTML={{ __html: label }} />}
        <Input
          ref={(node) => { this.inputNode = node; }}
          {...input}
          readOnly={readOnly}
          required={required}
          multiline={multiline}
          rows={rows}
          className={inputClass}
          rowsMax={rowsMax}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          style={(meta.submitFailed && meta.error) ? styles.hasError : {}}
          fullWidth
          inputProps={{
            style: styles.input,
            maxLength,
          }}
        />
        { async && meta.asyncValidating &&
          <div>
            <i className="fa fa-spinner fa-spin fa-fw" />
            <span className="sr-only">Loading...</span>
          </div>
        }
        { meta.submitFailed && meta.error && <span style={styles.errorText}>{meta.error}</span> }
        { helperBlock && <p className="hint-text small">{helperBlock}</p> }
      </div>
    );
  }
}

FormGroupInput.defaultProps = {
  label: null,
  type: 'text',
  className: [],
  placeholder: null,
  helperBlock: null,
  readOnly: false,
  required: false,
  async: false,
  maxLength: null,
  autoFocus: false,
  multiline: false,
  rows: null,
  rowsMax: null,
  inputClass: null,
  defaultValue: null,
};

FormGroupInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  meta: PropTypes.objectOf(PropTypes.any).isRequired,
  input: PropTypes.objectOf(PropTypes.any).isRequired,
  helperBlock: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  async: PropTypes.bool,
  maxLength: PropTypes.number,
  autoFocus: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  inputClass: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default FormGroupInput;
