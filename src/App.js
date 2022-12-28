import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import formJson from './formElement.json';
import ApplicationForm from './components/ApplicationForm';
import CUIModal from './components/CUIModal';
import { bodyTextForModal, bodyTextForSubmitForm, headerTextForModal, headerTextForSubmitForm } from './static/variables';

function App() {
  const [elements, setElements] = useState(formJson[0]);
  const { input_fields: inputFields, page_label: pageName } = elements || {};
  const [inputField, updateInputField] = useState(inputFields);
  const [submitButtonClicked, isSubmitButtonClicked] = useState(false);

  useEffect(() => {
    setElements(formJson[0]);
    return () => {};
  }, []);

  const handleOnDragEnd = result => {
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
    console.log(inputField);
  };

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
    return <CUIModal bodyText={bodyText} headerText={headerText} />;
  };

  return (
    <div className="form-bg">
      <div className="card-align">
        <div className="card card-mobile">
          <div>{showModal(bodyTextForModal, headerTextForModal)}</div>
          {submitButtonClicked && showModal(bodyTextForSubmitForm, headerTextForSubmitForm)}
          <h1 style={{ fontSize: '42px' }}>{pageName}</h1>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {provided => {
                return (
                  <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                    {inputField
                      ? inputField.map((field, index) => {
                          return (
                            <Draggable key={field.uid} draggableId={field.uid.toString()} index={index} key={field.id}>
                              {provided => (
                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                  <ApplicationForm
                                    key={field.uid}
                                    field={field}
                                    index={index}
                                    handleAddField={handleAddField}
                                    submitButtonClicked={submitButtonClicked}
                                    handleRemoveField={handleRemoveField}
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
