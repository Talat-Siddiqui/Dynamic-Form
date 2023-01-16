import {AccordionDetails} from '@mui/material';
import ApplicationForm from './ApplicationForm';

const GroupElement = ({value, key, handleOnChangeValue, userValue}) => {
    return (
        <>
            <AccordionDetails key={key}>
                <ApplicationForm field={value} handleOnChangeValue={handleOnChangeValue} userValue={userValue}/>
            </AccordionDetails>
        </>
    );
};

export default GroupElement;
