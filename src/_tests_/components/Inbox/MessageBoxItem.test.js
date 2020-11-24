import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import {MessageBoxItem} from '../../../components/Inbox/MessageBoxItem';
import sinon from 'sinon';
import { mount } from 'enzyme';

describe('MessageBoxItem', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(MessageBoxItem, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(MessageBoxItem);
        renderer.toJSON();
      });
  
    describe('MessageBoxItem', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (MessageBoxItem);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName', () => {
    //     sinon.spy(MessageBoxItem.prototype, 'funcName');
    //     const wrapper = mount(<MessageBoxItem />);
    //     expect(MessageBoxItem.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
    //   it('allows us to set props', () => {
    //     const wrapper = mount(<MessageBoxItem bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <MessageBoxItem onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});