import { AccordionDetails } from '@mui/material';
import ApplicationForm from './ApplicationForm';

const GroupElement = ({ value, key }) => {
  return (
    <>
      <AccordionDetails key={key}>
        <ApplicationForm field={value} />
      </AccordionDetails>
    </>
  );
};

export default GroupElement;
