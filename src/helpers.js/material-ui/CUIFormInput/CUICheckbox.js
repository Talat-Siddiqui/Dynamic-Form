import { Checkbox } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';


const CUICheckbox = props => {
  const { inputColor, inputChecked, cuiFormInputProps, checkedIcon, uncheckedIcon } = props || {};

  const cuiCheckboxProps = {
    color: inputColor,
    checked: inputChecked,
    ...(checkedIcon && { checkedIcon }),
    ...(uncheckedIcon && { icon: uncheckedIcon }),
  };

  return <Checkbox {...cuiFormInputProps} {...cuiCheckboxProps} />;
};

CUICheckbox.propTypes = {
  cuiFormInputProps: PropTypes.shape({}).isRequired,
  inputChecked: PropTypes.bool.isRequired,
};

export default CUICheckbox;
