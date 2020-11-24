import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import sinon from 'sinon';
import {shallow, configure, mount, render} from 'enzyme';

import {ConfirmationDialog} from '../../../components/SharedComponents/ConfirmationDialog';

describe('ConfirmationDialog', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ConfirmationDialog />, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(ConfirmationDialog);
        renderer.toJSON();
    });
  
    describe('ConfirmationDialog', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (ConfirmationDialog);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName handleSaveDraft', () => {
    //     sinon.spy(ConfirmationDialog.prototype, 'handleSaveDraft');
    //     const wrapper = mount(<ConfirmationDialog />);
    //     expect(ConfirmationDialog.prototype.componentDidMount).to.have.property('callCount', 1);
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
    //       <ConfirmationDialog onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});