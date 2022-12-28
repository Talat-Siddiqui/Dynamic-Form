/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import CUITextField from './CUIFormInput/CUITextField';
import CUICheckbox from './CUIFormInput/CUICheckbox';
import CUIRadio from './CUIFormInput/CUIRadio';
import { CUIInputMargin, CUIInputType } from '../../static/variables';

const CUIFormInput = props => {
  const {
    inputType,
    inputName,
    inputLabel,
    inputPlaceholder,
    inputID,
    testId,
    inputValue: inputVal,
    inputMargin,
    disabled,
    style,
    autoComplete,
    onChange,
    inputRef,
    required,
    ...rest
  } = props;

  const cuiFormInputProps = {
    type: inputType,
    name: inputName,
    label: inputLabel,
    placeholder: inputPlaceholder,
    ...(inputID && { id: inputID }),
    ...(testId && { 'data-testid': testId }),
    value: inputVal,
    margin: inputMargin,
    disabled,
    style,
    autoComplete,
    inputRef,
    onChange,
  };
  switch (inputType) {
    case CUIInputType.TEXT:
    case CUIInputType.EMAIL:
    case CUIInputType.NUMBER:
    case CUIInputType.TEL:
    case CUIInputType.PASSWORD:
    case CUIInputType.DATE_PICKER:
    case CUIInputType.DATE_TIME_PICKER:
    case CUIInputType.TIME_PICKER:
    case CUIInputType.FILE: {
      return <CUITextField readonly cuiFormInputProps={cuiFormInputProps} {...rest} required />;
    }

    case CUIInputType.CHECKBOX: {
      return <CUICheckbox cuiFormInputProps={cuiFormInputProps} {...rest} />;
    }

    case CUIInputType.RADIO: {
      return <CUIRadio cuiFormInputProps={cuiFormInputProps} {...rest} />;
    }

    default:
      return null;
  }
};

CUIFormInput.defaultProps = {
  inputValue: undefined,
  inputName: '',
  inputID: '',
  testId: '',
  inputLabel: null,
  inputPlaceholder: '',
  disabled: false,
  autoComplete: '',
  style: {},
  inputMargin: CUIInputMargin.NORMAL,
  inputRef: () => null,
  onChange: () => {},
};

CUIFormInput.propTypes = {
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  inputName: PropTypes.string,
  inputLabel: PropTypes.node,
  inputPlaceholder: PropTypes.string,
  inputID: PropTypes.string,
  testId: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  autoComplete: PropTypes.string,
  inputRef: PropTypes.func,
  onChange: PropTypes.func,
};

export default CUIFormInput;
