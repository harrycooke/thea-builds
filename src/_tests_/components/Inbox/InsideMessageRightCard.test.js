import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6

import {InsideMessageRightCard} from '../../../components/Inbox/InsideMessageRightCard';
import sinon from 'sinon';
import { mount } from 'enzyme';

describe('InsideMessageRightCard', () => {
    beforeAll = () => {
        this.state = {
            currentCase: '',
            openUploadFileModal:false,
            files: [],
            isLoading: false
          }
          this.removeFile = this.removeFile.bind(this);
    };
    
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(InsideMessageRightCard, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
      const renderer = TestRenderer.create(InsideMessageRightCard);
      renderer.toJSON();
    });

    describe('InsideMessageRightCard', () => {
      it('should render correctly in "debug" mode', () => {
        const component = (InsideMessageRightCard);
        expect(component).toMatchSnapshot();
      });
    });

    // it('calls funcName', () => {
    //     sinon.spy(InsideMessageRightCard.prototype, 'funcName');
    //     const wrapper = mount(<InsideMessageRightCard />);
    //     expect(InsideMessageRightCard.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
    //   it('allows us to set props', () => {
    //     const wrapper = mount(<InsideMessageRightCard bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <InsideMessageRightCard onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});