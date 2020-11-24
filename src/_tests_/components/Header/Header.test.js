import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import sinon from 'sinon';
import {shallow, configure, mount, render} from 'enzyme';

import {Header} from '../../../components/Header/Header';
import {getDifference, handleClick, handleClose, onLogoutClick, TemporaryDrawer} from '../../../components/Header/Header';


describe('Header', () => {
    beforeAll = () => {
        this.state = {
            anchorEl: null,
            numOfNotifications:0
          }
    };
    
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Header, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(Header);
        renderer.toJSON();
      });
    
    describe('Header', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (Header);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName handleSaveDraft', () => {
    //     sinon.spy(Header.prototype, 'handleSaveDraft');
    //     const wrapper = mount(<Header />);
    //     expect(Header.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
    //   it('allows us to set props', () => {
    //     const wrapper = mount(<Header bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <Header onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});