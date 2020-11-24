// import ReactDOM from 'react-dom';
// import App from './App';
// import expect from 'expect';
// import { shallow } from 'enzyme';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(App, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

// import { NotFund } from './App';
// console.log(NotFund);
import TestRenderer from 'react-test-renderer'; // ES6

import App from '../App';
describe('App', () => {
  it('should render correctly in "debug" mode', () => {
    const component = (App);
    expect(component).toMatchSnapshot();
  });
});

it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
    const renderer = TestRenderer.create(App);
    renderer.toJSON();
  });

describe('App', () => {
  it('should be able to run tests', () => {
      expect(1 + 2).toEqual(3);
  });
});

test('Fake test', ()=>{
    expect(true).toBeTruthy();          //here toBeTruthy is a predifined method whichif receives "true", considers to be expected.
});



// test('Fake tes', ()=>{
//     expect(false).toBeFalsy();           //here toBeFalsy is a predifined method whichif receives "false", considers to be expected.
// });
 
// //Basic component rendering
// it('should render correctly with no props', () => {
//     const component = shallow(<MyComponent/>);
    
//     expect(component).toMatchSnapshot(); 
//   });
//   it('should render banner text correctly with given strings', () => {
//     const strings = ['one', 'two'];
//     const component = shallow(<MyComponent list={strings} />);
//     expect(component).toMatchSnapshot();
//   });


// //Events
//   it('should be possible to activate button with Spacebar', () => {
//     const component = mount(<MyComponent />);
//     component
//       .find('button#my-button-one')
//       .simulate('keydown', { keyCode: 32 });
//     expect(component).toMatchSnapshot();
//     component.unmount();
//   });

// //Mock functions
// const clickFn = jest.fn();
// describe('MyComponent', () => {
//   it('button click should hide component', () => {
//     const component = shallow(<MyComponent onClick={clickFn} />);
//     component
//       .find('button#my-button-two')
//       .simulate('click');
//     expect(clickFn).toHaveBeenCalled();
//   });
// });