import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import {MessageList} from '../../../components/Inbox/MessageList';
import sinon from 'sinon';
import { mount } from 'enzyme';

describe('MessageList', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });
    
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(MessageList, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(MessageList);
        renderer.toJSON();
      });

    describe('MessageList', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (MessageList);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName', () => {
    //     sinon.spy(MessageList.prototype, 'funcName');
    //     const wrapper = mount(<MessageList />);
    //     expect(MessageList.prototype.componentDidMount).to.have.property('callCount', 1);
    // });
    
    // it('allows us to set props', () => {
    //     const wrapper = mount(<MessageList bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    // });
    
    // it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //         <MessageList onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    // });
});