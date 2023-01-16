import React, {useEffect, useState} from 'react';
import {Button} from '@mui/material';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import formJson from './formElement.json';
import ApplicationForm from './components/ApplicationForm';
import CUIModal from './components/CUIModal';
import {bodyTextForModal, bodyTextForSubmitForm, headerTextForModal, headerTextForSubmitForm} from './static/variables';

function App() {
    const [elements, setElements] = useState(formJson[0]);
    const {input_fields: inputFields, page_label: pageName} = elements || {};
    const [inputField, updateInputField] = useState(inputFields);
    const [submitButtonClicked, isSubmitButtonClicked] = useState(false);
    const [userEnteredValue, setUserEnteredValue] = useState(inputField[0].value)

    useEffect(() => {
        setElements(formJson[0]);
        return () => {
        };
    }, []);

    const handleOnDragEnd = result => {
        debugger;
        if (!result.destination) return;
        const items = Array.from(inputField);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        updateInputField(items);
        console.log(result);
    };

    const handleClick = e => {
        e.preventDefault();
        isSubmitButtonClicked(true);
    };

    const handleOnChangeValue = (e) => {
        const value = e.target.value;
        setUserEnteredValue(value);
    }

    const handleAddField = () => {
        const newField = {
            uid: 'email',
            data_type: 'string',
            label: 'Email Id',
            value: 'siddiquitalat111@gmail.com',
        };
        updateInputField([...inputField, newField]);
    };

    const handleRemoveField = index => {
        const values = [...inputField];
        values.splice(index, 1);
        updateInputField(values);
    };

    const showModal = (bodyText, headerText) => {
        return <CUIModal bodyText={bodyText} headerText={headerText}/>;
    };

    return (
        <div className="form-bg">
            <div className="card-align">
                <div className="card card-mobile">
                    <>{showModal(bodyTextForModal, headerTextForModal)}</>
                    {submitButtonClicked && showModal(bodyTextForSubmitForm, headerTextForSubmitForm)}
                    <h1 style={{fontSize: '42px'}}>{pageName}</h1>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="characters">
                            {provided => {
                                return (
                                    <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                        {inputField
                                            ? inputField.map((field, index) => {
                                                return (
                                                    <Draggable key={index} draggableId={field.uid.toString()}
                                                               index={index}>
                                                        {provided => (
                                                            <div {...provided.draggableProps} {...provided.dragHandleProps}
                                                                 ref={provided.innerRef}>
                                                                <ApplicationForm
                                                                    key={index}
                                                                    field={field}
                                                                    index={index}
                                                                    handleAddField={handleAddField}
                                                                    submitButtonClicked={submitButtonClicked}
                                                                    handleRemoveField={handleRemoveField}
                                                                    userEnteredValue={userEnteredValue}
                                                                    handleOnChangeValue={handleOnChangeValue}
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                );
                                            })
                                            : null}
                                        {provided.placeholder}
                                    </div>
                                );
                            }}
                        </Droppable>
                    </DragDropContext>
                    <Button variant="contained" onClick={e => handleClick(e)}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}

export const MemodFuncComponent = React.memo(App);
