import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from '@mui/material';

const CUIRadio = props => {
  const { inputColor, inputChecked, cuiFormInputProps } = props || {};

  const cuiRadioProps = {};
  cuiRadioProps.color = inputColor;
  cuiRadioProps.checked = inputChecked;

  return <Radio {...cuiFormInputProps} {...cuiRadioProps} />;
};

CUIRadio.propTypes = {
  cuiFormInputProps: PropTypes.shape({}).isRequired,
  inputChecked: PropTypes.bool.isRequired,
};

export default CUIRadio;
