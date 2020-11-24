import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6\
import Provider from 'react-redux';
import sinon from 'sinon';

import {shallow, configure, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import {SignUp} from '../../../containers/Signup/index';
import {onChange, onChangeUserRole, onChangeSpecialty, onChangePractice, onChangeIsAdmin} from '../../../containers/Signup/index';
// import fireEvent from '@testing-library/react'
// import {commonFormValidation2} from '../test/shared/shouldBehaveLikeForm';

describe('<SignUp />', () => {
// describe('<SignUp />', function() {     
    beforeEach = () => {
        this.setState = ({
            firstName: "",
            lastName: "",
            practice: "",
            // practiceId: 0,
            role: "",
            specialty: "",
            email: "",
            password: "",
            password2: "",
            // isAdmin: false,
            // maxUser: 1,
            // displayText: 0, 
            errors: {}
          });
        //   const email = {...this.email.bind(this)};
        //   this.state = this.state.bind(this);
        };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(SignUp, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(SignUp);
        renderer.toJSON();
      });    

    describe('SignUp', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (SignUp);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName onChange', () => {
    //     sinon.spy(SignUp.onChange);
    //     const wrapper = mount(<SignUp />);
    //     expect(SignUp.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
    //   it('allows us to set props', () => {
    //     const wrapper = mount(<SignUp bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <SignUp onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });



    // describe('form fetches fields', () => {
    //     test('form fetches email fields', () => {
    //         const checkEmail = shallow(<SignUp />);
    //         expect(checkEmail.find('input').length).to.equal(1);
    //         checkEmail.find('a').simulate('click');
    //         expect(checkEmail.find('input').length).to.equal(1);
    //     });

    //     test('form fetches password fields', () => {
    //         const testState = { password: 10101010 };
    //         const checkPassword = shallow((
    //             <SignUp
    //                 password={testState.password}
    //                 onChange={(e) => {
    //                 testState[e.target.name] = e.target.value;
    //                 }}
    //             />
    //         ));

    //         expect(checkPassword.find('input').at(0).prop('value')).toEqual(10101010);
    //         expect(checkPassword.find('input').at(1).prop('value')).toEqual(20202020);
    //         checkPassword.find('input').at(0).simulate('change', { target: { name: 'password', value: 11111111 } });
    //         expect(testState.password).toEqual(11111111);
    //     });
    // });



    // describe('render error messages', () => {
    //     // commonFormValidation2.bind(this)(SignUp);
    //     test('render firstname error message', () => {
    //         const component = shallow(SignUp, ...this.firstName );
    //         //Define all the required fields
    //         component.find('button').simulate('click');
    //         component.update();
    //         expect(component.text()).toEqual(
    //             expect.stringContaining('Name field is required')
    //         );
    //     });

    //     test('render lastname error message', () => {
    //         const component = shallow(SignUp, ...this.lastName );
    //         //Define all the required fields
    //         component.find('button').simulate('click');
    //         component.update();
    //         expect(component.text()).toEqual(
    //             expect.stringContaining('Name field is required')
    //         );
    //     });

        // test('render Practice name error message', () => {
        //     const component = shallow(<SignUp {...this.practice} />);
        //     component.setState({fields: {name: 'Name'}});           //Define all other fields
        //     component.find('button').simulate('click');
        //     component.update();
        //     expect(component.text()).toEqual(
        //         expect.stringContaining('Practice Name is required')
        //     );
        // });

        // test('render Specialty error message', () => {
        //     const component = shallow(<SignUp {...this.specialty} />);
        //     component.setState({fields: {name: 'Name'}});           //Define all other fields
        //     component.find('button').simulate('click');
        //     component.update();
        //     expect(component.text()).toEqual(
        //         expect.stringContaining('Specialty field is required')
        //     );
        // });

        // test('render User type field error message', () => {
        //     const component = shallow(<SignUp {...this.role} />);
        //     component.setState({fields: {name: 'Name'}});           //Define all other fields
        //     component.find('button').simulate('click');
        //     component.update();
        //     expect(component.text()).toEqual(
        //         expect.stringContaining('User Type field is required')
        //     );
        // });

    //     test('render Email error message', () => {
    //         const component = shallow(<SignUp {...this.email} />);
    //         component.setState({fields: {name: 'Name'}});           //Define all other fields
    //         component.find('button').simulate('click');
    //         component.update();
    //         expect(component.text()).toEqual(
    //             expect.stringContaining('Email field is required' || 'Email is invalid')
    //         );
    //     });

    //     test('render Password error message', () => {
    //         const component = shallow(<SignUp {...this.password} />);
    //         component.setState({fields: {name: 'Name'}});           //Define all other fields
    //         component.find('button').simulate('click');
    //         component.update();
    //         expect(component.text()).toEqual(
    //             expect.stringContaining('Password field is required' || 'Password must be at least 6 characters')
    //         );
    //     });

    //     test('render Confirm password error message', () => {
    //         const component = shallow(<SignUp {...this.password2} />);
    //         component.setState({fields: {name: 'Name'}});           //Define all other fields
    //         component.find('button').simulate('click');
    //         component.update();
    //         expect(component.text()).toEqual(
    //             expect.stringContaining('Confirm password field is required' || 'Passwords must match')
    //         );
    //     });
    // });

    // describe('change events update states', () => {
    //     test('update specialty state', () => {
    //     const component = shallow(<form {...this.specialty} />);
    //     component
    //         .find('input[name="specialty"]')
    //         .simulate('change', onChangeSpecialty({target: {name: 'specialty', value: 'Dermatology'}}));
    //     expect(component.state('fields').specialty).toEqual('specialty');
    //     });

    //     test('update practice state', () => {
    //     const component = shallow(<form {...this.practice} />);
    //     component
    //         .find('input[name="practice"]')
    //         .simulate('change', onChangePractice({target: {name: 'practice', value: 'practice'}}));
    //     expect(component.state('fields').practice).toEqual('practice');
    //     });

    // });
});
