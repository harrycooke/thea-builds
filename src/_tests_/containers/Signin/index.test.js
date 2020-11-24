import React from 'react';
import {shallow} from 'enzyme';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import {SignIn, onChange} from '../../../containers/Signin/index';
import reducers from '../../../reducers';
// import {state} from '../state';

// import {commonFormValidation, commonFormOnUpdate} from '../test/shared/shouldBehaveLikeForm';

describe('SignIn ', () => {
// describe('<SignIn />', function() {    
  beforeEach = () => {
    this.setState = ({
        email: "",
        password: "",
        errors: {}
      });
      const email = {...this.email.bind(this)};
      this.state = this.state.bind(this);
    };


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(SignIn, div);
});

it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
  const renderer = TestRenderer.create(SignIn);
  renderer.toJSON();
});

describe('SignIn', () => {
  it('should render correctly in "debug" mode', () => {
    const component = (SignIn);
    expect(component).toMatchSnapshot();
  });
});

    // describe('render error messages', () => {
    //     // commonFormValidation.bind(this)(SignIn);
    //     test('render Email error message', () => {
    //         const component = shallow(<SignIn {...this.email} /> );                  //check using the format as password test below
    //         //Define all other fields
    //         component.find('button').simulate('click');
    //         component.update();
    //         expect(component.text()).toEqual(
    //             expect.stringContaining('Email field is required' || 'Email is invalid')
    //         );
    //     });

    //     test('render Password error message', () => {
    //         const component = shallow(SignIn, {...this.state.password} );
    //         //Define all other fields
    //         component.find('button').simulate('click');
    //         component.update();
    //         expect(component.text()).toEqual(
    //             expect.stringContaining('Incorrect username or password.')
    //         );
    //     });
    // });

    // describe('change events update states', () => {
    //     // commonFormOnUpdate.bind(this)(SignIn);
    //     test('update Email state', () => {
    //     const component = shallow(<form {...this.state.email} />);
    //     component
    //         .find('input[name="email"]')
    //         .simulate('change', onChange({target: {name: 'email', value: 'email'}}));
    //     expect(component.state('fields').email).toEqual('email');
    //     });

    //     test('update Password state', () => {
    //     const component = shallow(<form {...this.password} />);
    //     component
    //         .find('input[name="password"]')
    //         .simulate('change', onChange({target: {name: 'password', value: 'password'}}));
    //     expect(component.state('fields').password).toEqual('password');
    //     });

    // });
});

test('Fake test', ()=>{
    expect(true).toBeTruthy();          //here toBeTruthy is a predifined method whichif receives "true", considers to be expected.
});

