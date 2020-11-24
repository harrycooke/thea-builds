import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import {AssignConsult} from '../../../containers/Inbox/AssignConsult';
import sinon from 'sinon';
import { mount } from 'enzyme';

describe('AssignConsult', () => {
    beforeAll = () => {
        this.state = {
            currentCase: null,
            specialtyData: [],
            searchResultsForSpecilty: [],
        }
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(AssignConsult, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(AssignConsult);
        renderer.toJSON();
      });
    
    describe('AssignConsult', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (AssignConsult);
          expect(component).toMatchSnapshot();
        });
      });


    // it('calls funcName', () => {
    //     sinon.spy(AssignConsult.prototype, 'funcName');
    //     const wrapper = mount(<AssignConsult />);
    //     expect(AssignConsult.prototype.componentDidMount).to.have.property('callCount', 1);
    // });
    
    // it('allows us to set props', () => {
    //     const wrapper = mount(<AssignConsult bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    // });
    
    // it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //         <AssignConsult onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    // });
});