import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import {UserCreation} from '../../../components/Account/UserCreation';

describe('UserCreation', () => {
    beforeAll = () => {
        this.state = {
            name: '',
            email: '',
          }
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(UserCreation, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(UserCreation);
        renderer.toJSON();
      });

    describe('UserCreation', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (UserCreation);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName handleSubmit', () => {
    //     sinon.spy(UserCreation.handleSubmit);
    //     const wrapper = shallow(<UserCreation />);
    //     expect(UserCreation.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
    //   it('allows us to set props', () => {
    //     const wrapper = mount(<UserCreation bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <UserCreation onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});