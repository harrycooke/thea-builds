import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6

import sinon from 'sinon';
import { mount } from 'enzyme';

import {Chat} from '../../../components/Inbox/Chat';

describe('Chat', () => {
    beforeAll = () => {
        this.state = {
            messageText: '',
            chatList: [],
            channel_id: '',
            currentCase: '',
            clientdata: '',
            openAlert: false,
          };
          this.onMessageReceived = this.onMessageReceived.bind(this);
          this.scrollToBottom = this.scrollToBottom.bind(this);
    };
    
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Chat, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
      const renderer = TestRenderer.create(Chat);
      renderer.toJSON();
    });
    

    describe('Chat', () => {
      it('should render correctly in "debug" mode', () => {
        const component = (Chat);
        expect(component).toMatchSnapshot();
      });
    });


    // it('calls funcName', () => {
    //     sinon.spy(Chat.prototype, 'funcName');
    //     const wrapper = mount(<Chat />);
    //     expect(Chat.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
      // it('allows us to set props', () => {
      //   const wrapper = mount(<Chat bar="baz" />);
      //   expect(wrapper.props().bar).to.equal('baz');
      //   wrapper.setProps({ bar: 'foo' });
      //   expect(wrapper.props().bar).to.equal('foo');
      // });
    
      // it('simulates click events', () => {
      //   const onButtonClick = sinon.spy();
      //   const wrapper = mount((
      //     <Chat onButtonClick={onButtonClick} />
      //   ));
      //   wrapper.find('button').simulate('click');
      //   expect(onButtonClick).to.have.property('callCount', 1);
      // });
});