import React, { forwardRef } from 'react';
import { Select, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';

const CUIDropdown = forwardRef((props, ref) => {
  const { selected, onOpen, onClose, onChange, menuItems, icons, defaultSelected, children, ...rest } = props;

  const menuProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    getContentAnchorEl: null,
  };

  return (
    <Select
      ref={ref}
      variant="outlined"
      onClose={onClose}
      onOpen={onOpen}
      disableUnderline
      displayEmpty
      onChange={onChange}
      MenuProps={menuProps}
      {...rest}
    >
      {children}
    </Select>
  );
});

export const CUIMenuItem = props => {
  const { disableRipple, value, text, icon, primaryTypographyProps, ...rest } = props;

  return (
    <MenuItem disableRipple={disableRipple} value={value} {...rest}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primaryTypographyProps={primaryTypographyProps} primary={text} />
    </MenuItem>
  );
};

CUIMenuItem.propTypes = {
  disableRipple: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  primaryTypographyProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

CUIDropdown.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      primary: PropTypes.string.isRequired,
      iconName: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  defaultSelected: PropTypes.string,
  icons: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
};

CUIDropdown.defaultProps = {
  defaultSelected: '',
};

export default CUIDropdown;
