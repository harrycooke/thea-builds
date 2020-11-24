import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import sinon from 'sinon';

import {Provider} from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
// import {state} from '../state';

import toJson from 'enzyme-to-json';

//To be used for configuring the shallow adapter
import Enzyme from 'enzyme';
import {shallow, configure, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
// configure({ adapter: new Adapter() });                 //Older version????

import {NewCase} from '../../../containers/NewCase/index';
import {CircularProgressCustom} from '../../../components/SharedComponents/CircularProgress';
import store from "../../../store";
import reducers from '../../../reducers';


import {componentDidMount, handleSaveDraft, handleSpecialtyChange, handlePatientNameChange, handleQuestionChange, handleFileUpload, handleSubmit} from '../../../containers/NewCase/index';

export const log = logMsg => console.log(logMsg);

const mockStore = configureStore([]);

describe('NewCase', () => {
  let store;
  let component;
  const root = TestRenderer.create(<NewCase />).root;   //defining root for TEST:'should dispatch an action on button click'


  beforeEach = () => {
    store = mockStore({
      myState: 'sample text',
    });

    store.dispatch = jest.fn();


    component = renderer.create(
      <Provider store={store}>
        <NewCase />
      </Provider>
    ).toJSON();

    const initialState = {
      specialist_id: '',
      specialty: '',
      patientName: '',
      question: '',
      files: [],
      // filePaths: [],
      // labelWidth: 0,
      // errors: {},
      // success: false,
      // isSubmitting: false,
      // client: socket(),
      // isChecked: false,
      // isDraft: false,
      // draftId: '',
      // isLoading: false,
    }
    return initialState;
  }

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
      const renderer = TestRenderer.create(NewCase);
      renderer.toJSON();
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(NewCase, div);
    });

    it('should render with given state from Redux store', () => {
      expect(component).toMatchSnapshot();
    });



    describe('NewCase', () => {
      it('should render correctly in "debug" mode', () => {
        const component = (NewCase);
        expect(component).toMatchSnapshot();
      });
    });

    it('should dispatch an action on button click', () => {             //root has been defined above
      renderer.act(() => {
        component.root.findByType('button').props.onClick();
      });
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      // expect(store.dispatch).toHaveBeenCalledWith(
      //   myAction({ payload: 'sample text' })
      // );
    });
  
    // test('uploads the file after a click event', () => {
    //   const fileUploaderMock = jest.fn();
    //   const component = shallow(<NewCase
    //     files={[]}                       //files here
    //     onFilesUploaded={fileUploaderMock}
    //   />);
    
    //   const file = {
    //     name: 'test.jpg',
    //     type: 'image/jpg',
    //   };
    
    //   const files = {
    //     length: 1,
    //     item: () => null,
    //     0: file,
    //   };
    
    //   const event = {
    //     currentTarget: {
    //       files: files,
    //     }
    //   };
    
    //   const instance = component.instance();
    //   instance.handleUploadFile(event);
    //   expect(fileUploaderMock).toBeCalledWith(files);
    // });


    // it('calls handleSaveDraft', () => {
    //   sinon.spy(NewCase.handleSaveDraft);
    //   // const wrapper = shallow(<NewCase />);      //#1 the first iteration of simulating 
    //   const wrapper = shallow(                      //#2
    //     //store={this.state.store}                    
    //     <Provider store={store}>       
    //       {/* <LocalizeProvider store={this.state.store}> */}
    //         <NewCase />
    //       {/* </LocalizeProvider> */}
    //     </Provider>
    //   );
    //   // const wrapper = shallow(                      //#3
    //   //   <NewCase store={store} />                   //<NewCase store={store} />   //(NewCase, store={store})
    //   // );
    //   expect(NewCase.handleSaveDraft).toHaveProperty('id', 1);
    //   // expect(wrapper.find(NewCase)).toHaveProperty('id');
    // });



    // test('reducers', () => {
    //   let state;
    //   state = reducers({auth:{isAuthenticated:true,user:{iat:1595006120,exp:1626542120},userdata:{email:'chirag@theahealth.com',id:'10',firstName:'Chirag',lastName:'Jain',password:'001b072b33f469c0',created:'2019-08-10T04:42:00.000Z',user_type:'PCP',specialty:'none',notification:true,avatar:{name:'https://theahealth-aws.s3.us-east-2.amazonaws.com/files-for-case/1594194909067Untitleddesign.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJJHGEGPNWNHNBXUQ%2F20200717%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200717T171520Z&X-Amz-Expires=900&X-Amz-Signature=991d6536550479f39374847fb1d204216a0f54de827fb036e1e08da91355ba5d&X-Amz-SignedHeaders=host',type:'image/png'},licenseNumber:null,npi:null,practice_id:null,practice_name:null,is_admin:null,existedAvatar:{name:'1594194909067Untitleddesign.png',type:'image/png'}},clientdata:{},loading:false,forgotPasswordState:false,specialtyData:[],showSnackbar:false,practiceData:{},stripeData:{}},chat:{sendMessages:[],readMessages:[]},'case':{sendCases:[],currentCase:[],readAllCases:[],numberOfNewMessage:0,caseLoader:false,showSnackbar:false},draft:{saveDraft:[],currentDraft:[],readAllDrafts:[],isDraftDeleted:false,draftLoader:false},errors:{}}, {type:'GET_NUM_NEW_MESSAGE',payload:0});
    //   expect(state).toEqual({auth:{isAuthenticated:true,user:{iat:1595006120,exp:1626542120},userdata:{email:'chirag@theahealth.com',id:'10',firstName:'Chirag',lastName:'Jain',password:'001b072b33f469c0',created:'2019-08-10T04:42:00.000Z',user_type:'PCP',specialty:'none',notification:true,avatar:{name:'https://theahealth-aws.s3.us-east-2.amazonaws.com/files-for-case/1594194909067Untitleddesign.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJJHGEGPNWNHNBXUQ%2F20200717%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200717T171520Z&X-Amz-Expires=900&X-Amz-Signature=991d6536550479f39374847fb1d204216a0f54de827fb036e1e08da91355ba5d&X-Amz-SignedHeaders=host',type:'image/png'},licenseNumber:null,npi:null,practice_id:null,practice_name:null,is_admin:null,existedAvatar:{name:'1594194909067Untitleddesign.png',type:'image/png'}},clientdata:{},loading:false,forgotPasswordState:false,specialtyData:[],showSnackbar:false,practiceData:{},stripeData:{}},chat:{sendMessages:[],readMessages:[]},'case':{sendCases:[],currentCase:[],readAllCases:[],numberOfNewMessage:0,caseLoader:false,showSnackbar:false},draft:{saveDraft:[],currentDraft:[],readAllDrafts:[],isDraftDeleted:false,draftLoader:false},errors:{}});
    // });
  
    // it('allows us to set props', () => {
    //   const wrapper = mount(<NewCase question="question?" />);
    //   // const wrapper = mount((NewCase.question="question?" ));           
    //   expect(wrapper.props().question).to.equal('question?');        //wrapper.dive({ context: { store }).simulate('click');
    //   wrapper.setProps({ question: 'foo' });
    //   expect(wrapper.props().question).to.equal('foo');
    // });
  
    // it('simulates click events', () => {
    //   const onButtonClick = sinon.spy();
    //   const wrapper = mount((
    //     <NewCase onButtonClick={onButtonClick} />
    //   ));
    //   wrapper.find('button').simulate('click');
    //   expect(onButtonClick).to.have.property('callCount', 1);
    // });


    // describe('render error messages', () => {
    //     // commonFormValidation.bind(this)(NewCase);
    //     test('render specialty error message', () => {
    //         const component = shallow(<NewCase {...this.specialty} />);
    //         //Define all other fields
    //         component.find('button').simulate('click');
    //         component.update();
    //         expect(component.text()).toEqual(
    //             expect.stringContaining('Specialty field is required.')
    //         );
    //     });

    //     test('render patientName error message', () => {
    //         const component = shallow(<NewCase {...this.patientName} />);
    //         //Define all other fields
    //         component.find('button').simulate('click');
    //         component.update();
    //         expect(component.text()).toEqual(
    //             expect.stringContaining('Patient name field is required.')
    //         );
    //     });
    // });

    // describe('change events update states', () => {
    //     // commonFormOnUpdate.bind(this)(SignIn);
    //     test('update Email state', () => {
    //     const component = shallow(<Form {...this.commonProps} />);
    //     component
    //         .find('input[name="email"]')
    //         .simulate('change', fakeEvent({target: {name: 'email', value: 'email'}}));
    //     expect(component.state('fields').email).toEqual('email');
    //     });

    //     test('update Password state', () => {
    //     const component = shallow(<Form {...this.commonProps} />);
    //     component
    //         .find('input[name="password"]')
    //         .simulate('change', fakeEvent({target: {name: 'password', value: 'password'}}));
    //     expect(component.state('fields').password).toEqual('password');
    //     });

    // });

});

test('Fake test', ()=>{
    expect(true).toBeTruthy();          //here toBeTruthy is a predifined method whichif receives "true", considers to be expected.
});

// // Testing console.log    
//     it('console.log the text "hello"', () => {
//       console.log = jest.fn();
//       log('hello');
//       // The first argument of the first call to the function was 'hello'
//       expect(console.log.mock.calls[0][0]).toBe('hello');
//     });