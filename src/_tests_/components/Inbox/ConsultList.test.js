import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6

import {ConsultList} from '../../../components/Inbox/ConsultList';
import sinon from 'sinon';
import { mount } from 'enzyme';

describe('ConsultList', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });
    
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(ConsultList, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
      const renderer = TestRenderer.create(ConsultList);
      renderer.toJSON();
    });

    describe('ConsultList', () => {
      it('should render correctly in "debug" mode', () => {
        const component = (ConsultList);
        expect(component).toMatchSnapshot();
      });
    });


    // it('calls funcName', () => {
    //     sinon.spy(ConsultList.prototype, 'funcName');
    //     const wrapper = mount(<ConsultList />);
    //     expect(ConsultList.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
    //   it('allows us to set props', () => {
    //     const wrapper = mount(<ConsultList bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <ConsultList onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});


