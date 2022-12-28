import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CUIInputType} from "./static/variables";
import ApplicationForm from "./components/ApplicationForm";
import CUIFormInput from "./helpers.js/material-ui/CUIFormInput";

Enzyme.configure({adapter: new Adapter()});
const mockHandleAddField = jest.fn();
const mockHandleRemoveField = jest.fn();


const props = {
    field: {
        uid: 'name',
        value: 'talat',
        label: 'First Name',
        data_type: 'string'
    },
    inputType: CUIInputType.TEXT,
    handleAddField: mockHandleAddField,
    handleRemoveField: mockHandleRemoveField,
    index: 1,
    submitButtonClicked: true,
};

describe('Dynamic form', () => {
    let elementComp = shallow(<ApplicationForm {...props} />);


    xit('snapshot', () => {
        expect(register).toMatchSnapshot();
    });

    it('should show the form', () => {
        const element = elementComp.find('.form-bg');
        expect(element.exists());
    });
    it('If data type is string', () => {
        expect(elementComp.find("CUIFormInput").exists()).toBe(true);
    });

    it('If data type is number', () => {
        props.field.data_type = 'number'
        expect(elementComp.find("CUIFormInput").exists()).toBe(true);
    });


    it('If data type is dropdown', () => {
        props.field.data_type = 'dropdown'
        expect(elementComp.find("div").exists()).toBe(true);
    });

    it('If data type is radio', () => {
        props.field.data_type = 'radio'
        expect(elementComp.find("div").exists()).toBe(true);

    });
});