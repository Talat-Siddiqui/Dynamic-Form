import { Box, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

const CUIModal = ({ bodyText, headerText }) => {
  const [open, setOpen] = useState(true);
  const handleClose = e => {
    e.preventDefault();
    setOpen(false);
  };

  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    opacity: 1,
    padding: '30px',
  };
  return (
    <Modal
      open={open}
      onClose={e => handleClose(e)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ backgroundColor: 'transparent', opacity: '1' }}
    >
      <Box sx={style}>
        <CloseSharpIcon
          onClick={e => handleClose(e)}
          style={{
            position: 'relative',
            left: '94%',
            bottom: '5px',
          }}
        />
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {headerText}
        </Typography>

        {bodyText.map((text, i) => {
          return (
            <Typography id="modal-modal-description" sx={{ mt: 2 }} key={i}>
              {text}
            </Typography>
          );
        })}
      </Box>
    </Modal>
  );
};

export default CUIModal;
