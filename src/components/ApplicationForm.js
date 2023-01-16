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
                             userValue
                         }) => {
    const {
        data_type: dataType,
        label,
        value,
        title,
        user_gender: userGender,
        all_values: selectOptions,
        relocate,
        uid,
        _metadata: metaData
    } = field || {};
    const {year} = userValue || {};


    let firstNameError = uid === 'firstName' && !isValidName(userValue.firstName) ? 'Please enter valid First Name' : '';
    let lastNameError = uid === 'lastName' && !isValidName(userValue.lastName) ? 'Please enter valid Last Name' : '';
    let emailError = uid === 'email' && !isValidEmail(userValue.email) ? 'Please enter valid email' : '';
    let ageErrorText = uid === 'age' && !isValidAge(userValue.age) ? 'Please enter valid age' : '';
    let yearErrorText = uid === 'year' && !isValidYear(year) ? 'Please enter valid year' : '';
    if (userValue.firstName === '' && submitButtonClicked) {
        firstNameError = `The ${uid} field cannot be empty`;
    }
    if (userValue.lastName === '' && submitButtonClicked) {
        lastNameError = `The ${uid} field cannot be empty`;
    }
    if (userValue.email === '' && submitButtonClicked) {
        emailError = 'The email field cannot be empty';
    }
    if (userValue.age === '' && submitButtonClicked) {
        ageErrorText = 'The age field cannot be empty';
    }
    if (userValue.year === '' && submitButtonClicked) {
        yearErrorText = 'The year field cannot be empty';
    }

    switch (dataType) {
        case 'string':
            return (
                <>
                    <CUIFormInput
                        inputType={uid === 'password' ? CUIInputType.PASSWORD : CUIInputType.TEXT}
                        inputPlaceholder={label}
                        inputLabel={label}
                        full
                        helperText={firstNameError || lastNameError || emailError}
                        error={firstNameError !== '' || lastNameError !== '' || emailError !== ''}
                        variant="outlined"
                        inputID={uid}
                        inputProps={{maxLength: 128}}
                        onChange={(e) => handleOnChangeValue(e)}
                        required
                        inputName={uid}
                    />
                    {uid === 'email' ? (
                        <div className="add-remove-style">
                            <h4>Add new Email Id field <span style={{fontSize: '11px'}}>(field will be added at the bottom)</span>
                                :</h4>
                            <IconButton onClick={() => handleRemoveField(index)}>
                                <Remove/>
                            </IconButton>
                            <IconButton onClick={handleAddField}>
                                <Add/>
                            </IconButton>
                        </div>
                    ) : null}
                </>
            );

        case 'number':
            return (
                <>
                    <CUIFormInput
                        inputType={CUIInputType.TEL}
                        inputPlaceholder={label}
                        inputLabel={label}
                        full
                        helperText={ageErrorText || yearErrorText}
                        error={ageErrorText !== '' || yearErrorText !== ''}
                        inputProps={{
                            maxLength: 2,
                        }}
                        onChange={(e) => handleOnChangeValue(e)}
                        variant="outlined"
                        inputID={uid}
                        inputName={uid}

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
                                        inputID={uid}
                                        checked={userValue.relocate === answers}
                                        onChange={e => {
                                            handleOnChangeValue(e);
                                        }}
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
                                                  inputID={uid} checked={userValue.gender === gender} onChange={e => {
                                        handleOnChangeValue(e);
                                    }}/>
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
                            return <GroupElement value={val} key={index} title={title} userValue={userValue}
                                                 handleOnChangeValue={handleOnChangeValue}/>;
                        })}
                    </Accordion>
                </div>
            );

        default:
            return null;
    }
};

export default ApplicationForm;
