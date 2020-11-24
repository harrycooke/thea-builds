import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6

import sinon from 'sinon';
import { mount } from 'enzyme';

import {AccountProfile} from '../../../components/Account/AccountProfile';

describe('AccountProfile', () => {
    beforeAll = () => {
        this.commonProps = {};
    };

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(AccountProfile);
        renderer.toJSON();
      });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(AccountProfile, div);
    });

    describe('AccountProfile', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (AccountProfile);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName', () => {
    //     sinon.spy(AccountProfile.prototype, 'funcName');
    //     const wrapper = mount(<AccountProfile />);
    //     expect(AccountProfile.prototype.componentDidMount).to.have.property('callCount', 1);
    // });
    
    // it('allows us to set props', () => {
    //     const wrapper = mount(<AccountProfile bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    // });
    
    // it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <AccountProfile onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    // });

});