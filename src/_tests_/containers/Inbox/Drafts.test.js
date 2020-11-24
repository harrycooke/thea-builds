import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import {Drafts} from '../../../containers/Inbox/Drafts';
import reducers from '../../../reducers';
import STATE from '../../state';
import sinon from 'sinon';
import { mount } from 'enzyme';

describe('Drafts', () => {
    beforeAll = () => {
        this.state = {
            redirectToChat: false,
            redirectToCreateCase: false,
            readAllDrafts: [],
            selectedSpecialty: '',
            searchResultsForDrafts: [],
            confirmDraftDelete: false,
            filesDraft: []
        }
        this.openDraftDialog = this.openDraftDialog.bind(this)
        this.removeDraft = this.removeDraft.bind(this)
        this.handleClose = this.handleClose.bind(this)
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Drafts, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(Drafts);
        renderer.toJSON();
    });
  
    describe('Drafts', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (Drafts);
          expect(component).toMatchSnapshot();
        });
      });


    // test('reducers', () => {
    //     let state;
    //     state = reducers(state);
    //     expect(state).toEqual(state);
    // });


    // it('calls funcName', () => {
    //     sinon.spy(Drafts.prototype, 'funcName');
    //     const wrapper = mount(<Drafts />);
    //     expect(Drafts.prototype.componentDidMount).to.have.property('callCount', 1);
    // });
    
    // it('allows us to set props', () => {
    //     const wrapper = mount(<Drafts bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    // });
    
    // it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //         <Drafts onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    // });
});