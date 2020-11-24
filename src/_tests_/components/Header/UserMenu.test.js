import React, { useState } from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import sinon from 'sinon';
import {shallow, configure, mount, render} from 'enzyme';

import {UserMenu} from '../../../components/Header/UserMenu';

describe('UserMenu', () => {
    beforeAll = () => {
        const [userMenu, setUserMenu] = useState(null);
    };
    
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(UserMenu, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(UserMenu);
        renderer.toJSON();
      });
      
    describe('UserMenu', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (UserMenu);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName handleSaveDraft', () => {
    //     sinon.spy(UserMenu.prototype, 'handleSaveDraft');
    //     const wrapper = mount(<UserMenu />);
    //     expect(UserMenu.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
    //   it('allows us to set props', () => {
    //     const wrapper = mount(<UserMenu bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <UserMenu onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});