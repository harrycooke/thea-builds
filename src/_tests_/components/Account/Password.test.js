import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6

import {shallow} from 'enzyme';
import sinon from 'sinon';
import { mount } from 'enzyme';

import {Password} from '../../../components/Account/Password';

describe('Password', () => {
    beforeAll = () => {
        this.state = ({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            modalOpened: false,
            checkedA: this.props.auth.notification
          });
        //   const email = {...this.email.bind(this)};
        //   this.state = this.state.bind(this);
        };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Password, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(Password);
        renderer.toJSON();
      });

    describe('Password', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (Password);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName handleSubmit', () => {
    //     sinon.spy(Password.prototype, 'handleSubmit');
    //     const wrapper = mount(<Password />);
    //     expect(Password.prototype.componentDidMount).to.have.property('callCount', 1);
    // });
    
    // it('allows us to set props', () => {
    //     const wrapper = mount(<Password bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    // });
    
    // it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <Password onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    // });


    // describe('render error messages', () => {
    //     // commonFormValidation.bind(this)(Password);
    //     test('render oldPassword error message', () => {
    //         const component = shallow(<Password />);
    //         //Define all other fields
    //         component.find('button').simulate('click');
    //         component.update();
    //         expect(component.text()).toEqual(
    //             expect.stringContaining('Your existing password was incorrect.')
    //         );
    //     });

    //     test('render newPassword error message', () => {
    //         const component = shallow(<Password {...this.props} />);
    //         //Define all other fields
    //         component.find('button').simulate('click');
    //         component.update();
    //         expect(component.text()).toEqual(
    //             expect.stringContaining('Your new passwords do not match.')
    //         );
    //     });

    //     test('render confirmPassword error message', () => {
    //         const component = shallow(<Password {...this.props} />);
    //         //Define all other fields
    //         component.find('button').simulate('click');
    //         component.update();
    //         expect(component.text()).toEqual(
    //             expect.stringContaining('Your new passwords do not match.')
    //         );
    //     });
    // });



        // describe('change events update states', () => {
    //     // commonFormOnUpdate.bind(this)(SignIn);
    //     test('update oldPassword state', () => {
    //     const component = shallow(<Form {...this.commonProps} />);
    //     component
    //         .find('input[name="email"]')
    //         .simulate('change', fakeEvent({target: {name: 'email', value: 'email'}}));
    //     expect(component.state('fields').email).toEqual('email');
    //     });

    //     test('update newPassword state', () => {
    //     const component = shallow(<Form {...this.commonProps} />);
    //     component
    //         .find('input[name="password"]')
    //         .simulate('change', fakeEvent({target: {name: 'password', value: 'password'}}));
    //     expect(component.state('fields').password).toEqual('password');
    //     });

    // });
});