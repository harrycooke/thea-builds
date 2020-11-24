import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6\
import {Inbox} from '../../../containers/Inbox/Inbox';
import reducers from '../../../reducers';
// import {state} from '../state';
import sinon from 'sinon';
import { mount } from 'enzyme';

describe('Inbox', () => {
    beforeAll = () => {
        this.state = {
            redirectToChat: false,
            redirectToAssignConsult: false,
            cases_id: null,
            specialty: null,
            redirectToCreateCase: false,
            readAllCases: [],
            readAllDrafts: [],
            selectedSpecialty: '',
            searchResultsForCases: [],
            searchResultsForDrafts: [],
            confirmDraftDelete: false,
            files: []
        }
        this.removeDraft = this.removeDraft.bind(this)
        this.openDraftDialog = this.openDraftDialog.bind(this)
        this.handleClose = this.handleClose.bind(this)
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Inbox, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(Inbox);
        renderer.toJSON();
      });
      
    describe('Inbox', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (Inbox);
          expect(component).toMatchSnapshot();
        });
      });


    // it('calls funcName', () => {
    //     sinon.spy(Inbox.prototype, 'funcName');
    //     const wrapper = mount(<Inbox />);
    //     expect(Inbox.prototype.componentDidMount).to.have.property('callCount', 1);
    // });
    
    // it('allows us to set props', () => {
    //     const wrapper = mount(<Inbox bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    // });
    
    // it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //         <Inbox onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    // });
});

test('Fake test', ()=>{
    expect(true).toBeTruthy();          //here toBeTruthy is a predifined method whichif receives "true", considers to be expected.
});