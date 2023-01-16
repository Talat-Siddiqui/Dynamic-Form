import {
    Accordion,
    AccordionSummary,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import React from 'react';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import {isValidAge, isValidEmail, isValidName, isValidYear} from '../helpers.js';
import CUIFormInput from '../helpers.js/material-ui/CUIFormInput';
import {CUIInputType} from '../static/variables';
import GroupElement from './GroupElement.js';
import '../styles.css';
import {Add, Remove} from '@mui/icons-material';

const ApplicationForm = ({
                             field,
                             handleAddField,
                             handleRemoveField,
                             index,
                             submitButtonClicked,
                             handleOnChangeValue,
                             userEnteredValue
                         }) => {
    const {
        data_type: dataType,
        label,
        value,
        title,
        user_gender: userGender,
        all_values: selectOptions,
        relocate,
        uid
    } = field || {};

    let FirstLastNameError = uid === 'name' && submitButtonClicked && !isValidName(value) ? 'Please enter valid Name' : '';
    let emailError = uid === 'email' && submitButtonClicked && !isValidEmail(value) ? 'Please enter valid email' : '';
    let ageErrorText = uid === 'age' && submitButtonClicked && !isValidAge(value) ? 'Please enter valid age' : '';
    let yearErrorText = uid === 'year' && submitButtonClicked && !isValidYear(value) ? 'Please enter valid year' : '';
    if (submitButtonClicked && value === '') {
        FirstLastNameError = `The ${uid} field cannot be empty`;
        emailError = 'The email field cannot be empty';
        ageErrorText = 'The age field cannot be empty';
        yearErrorText = 'The year field cannot be empty';
    }

    switch (dataType) {
        case 'string':
            return (
                <div className="add-remove-style">
                    <CUIFormInput
                        inputType={uid === 'password' ? CUIInputType.PASSWORD : CUIInputType.TEXT}
                        inputPlaceholder={label}
                        inputLabel={label}
                        full
                        focus
                        defaultValue={userEnteredValue}
                        helperText={FirstLastNameError || emailError}
                        error={FirstLastNameError !== '' || emailError !== ''}
                        variant="outlined"
                        inputID={uid}
                        inputProps={{maxLength: 128}}
                        onChange={(e) => handleOnChangeValue(e)}
                        required
                    />
                    {uid === 'email' ? (
                        <>
                            <IconButton onClick={() => handleRemoveField(index)}>
                                <Remove/>
                            </IconButton>
                            <IconButton onClick={handleAddField}>
                                <Add/>
                            </IconButton>
                        </>
                    ) : null}
                </div>
            );

        case 'number':
            return (
                <>
                    <CUIFormInput
                        inputType={CUIInputType.TEL}
                        inputPlaceholder={label}
                        inputLabel={label}
                        full
                        inputValue={value}
                        helperText={ageErrorText || yearErrorText}
                        error={ageErrorText !== '' || yearErrorText !== ''}
                        inputProps={{
                            maxLength: 2,
                        }}
                        variant="outlined"
                        inputID={uid}
                    />
                </>
            );

        case 'checkbox':
            return (
                <div className="cs-hm-lkng-fr">
                    <h3>{title}</h3>
                    {relocate.map(answers => {
                        return (
                            <FormControlLabel
                                control={
                                    <CUIFormInput
                                        inputType={CUIInputType.CHECKBOX}
                                        inputName="genderCheckbox"
                                        inputChecked={value === answers}
                                        inputID={uid}
                                    />
                                }
                                label={<span>{answers}</span>}
                                style={{marginRight: 30, paddingBottom: '20px'}}
                            />
                        );
                    })}
                </div>
            );

        case 'radio':
            return (
                <div id={uid} className="cs-hm-lkng-fr">
                    <h3>{label}</h3>
                    {userGender.map(gender => {
                        return (
                            <FormControlLabel
                                control={
                                    <CUIFormInput inputType={CUIInputType.RADIO} inputName="genderRadio"
                                                  inputChecked={value === gender} inputID={uid}/>
                                }
                                label={<span>{gender}</span>}
                                style={{marginRight: 30, paddingBottom: '20px'}}
                            />
                        );
                    })}
                </div>
            );

        case 'dropdown':
            return (
                <div className="field-padding">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="work experience"
                            defaultValue={value}
                            variant="outlined"
                            style={{background: 'antiquewhite'}}
                        >
                            {selectOptions.map(values => {
                                return <MenuItem value={values}>{values}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                </div>
            );

        case 'group':
            return (
                <div className="field-padding">
                    <Accordion TransitionProps={{unmountOnExit: true}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreOutlinedIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{background: 'antiquewhite'}}
                        >
                            <Typography>{title}</Typography>
                        </AccordionSummary>
                        {value.map((val, index) => {
                            return <GroupElement value={val} key={index} title={title}/>;
                        })}
                    </Accordion>
                </div>
            );

        default:
            return null;
    }
};

export default ApplicationForm;
