import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import sinon from 'sinon';
import {shallow, configure, mount, render} from 'enzyme';

import {CardSetupForm} from '../../../components/CardDetails/CardSetupForm';

describe('CardSetupForm', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(CardSetupForm, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(CardSetupForm);
        renderer.toJSON();
      });
      
    describe('CardSetupForm', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (CardSetupForm);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName handleSaveDraft', () => {
    //     sinon.spy(CardSetupForm.prototype, 'handleSaveDraft');
    //     const wrapper = mount(<CardSetupForm />);
    //     expect(CardSetupForm.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    

    //   it('allows us to set props', () => {
    //     const wrapper = mount(<ConfirmationDialog bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <CardSetupForm onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});