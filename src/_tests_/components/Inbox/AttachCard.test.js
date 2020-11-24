import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import {AttachCard} from '../../../components/Inbox/AttachCard';
import sinon from 'sinon';
import { mount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';


describe('AttachCard', () => {
    beforeAll = () => {
        this.state = {
            // attachName: this.props.attachName,
            displayModal: false,
            numPages: null,
            pageNumber: 1,
            activeStep:0,
            imageStatus: true
        }
    };
    
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(AttachCard, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
      const renderer = TestRenderer.create(AttachCard);
      renderer.toJSON();
    });
    
    describe('AttachCard', () => {
      it('should render correctly in "debug" mode', () => {
        const component = (AttachCard);
        expect(component).toMatchSnapshot();
      });
    });

    // it('calls funcName', () => {
    //     sinon.spy(AttachCard.prototype, 'funcName');
    //     const wrapper = mount(<AttachCard />);
    //     expect(AttachCard.prototype.componentDidMount).to.have.property('callCount', 1);
    //   }); 
    
    //   it('allows us to set props', () => {
    //     const wrapper = mount(<AttachCard bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <AttachCard onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});