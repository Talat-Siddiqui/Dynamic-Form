import { TextField } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const CUITextField = props => {
  const cuiTextProps = {};

  const {
    full,
    textFocus,
    labelProps,
    inputProps,
    error,
    helperText,
    hintText,
    onBlur,
    onFocus,
    onClick,
    cuiFormInputProps,
    variant,
    label,
    multiline,
    rows,
    classes,
    required,
    helperTextProps,
  } = props || {};

  if (variant) {
    cuiTextProps.variant = variant;
  }
  if (label) {
    cuiTextProps.label = label;
  }

  if (rows) {
    cuiTextProps.rows = rows;
  }
  cuiTextProps.multiline = multiline;
  cuiTextProps.error = error;
  cuiTextProps.helperText = hintText || helperText;
  cuiTextProps.autoFocus = textFocus;
  cuiTextProps.fullWidth = full;
  cuiTextProps.InputLabelProps = labelProps;
  cuiTextProps.inputProps = inputProps;
  cuiTextProps.onFocus = onFocus;
  cuiTextProps.onBlur = onBlur;
  cuiTextProps.onClick = onClick;
  cuiTextProps.classes = classes;

  return <TextField {...cuiFormInputProps} {...cuiTextProps} required={required} FormHelperTextProps={helperTextProps} />;
};

CUITextField.defaultProps = {
  error: false,
  helperText: '',
  hintText: '',
  textFocus: false,
  full: false,
  inputPrefixSuffix: [],
  InputProps: {},
  inputProps: {},
  onFocus: () => {},
  onBlur: () => {},
  onClick: () => {},
  variant: '',
  label: '',
  multiline: false,
  rows: null,
  classes: {},
  helperTextProps: {},
};

CUITextField.propTypes = {
  cuiFormInputProps: PropTypes.shape({}).isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  hintText: PropTypes.string,
  textFocus: PropTypes.bool,
  full: PropTypes.bool,
  InputProps: PropTypes.shape({}),
  inputProps: PropTypes.shape({}),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  classes: PropTypes.shape({}),
  helperTextProps: PropTypes.shape({}),
};

export default CUITextField;
