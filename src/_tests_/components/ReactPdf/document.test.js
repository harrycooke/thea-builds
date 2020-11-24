import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import Provider from 'react-redux';
import sinon from 'sinon';

import {shallow, configure, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import {MyDocument} from '../../../components/ReactPdf/document';
import {downloadPdf, addCreds, addTitle, addDOB, addAddress, addGender, addPhone, addIns, addInsSubNo, addHatDoc} from '../../../components/ReactPdf/document';

import store from "../../../store";

describe('MyDocument', () => {
    beforeAll = () => {
        this.state = {
            currentCase: this.props.currentCase,
            readedMessages: this.props.readedMessages,
            userData: this.props.userData,
            downloadPdfButton: false
          }
          this.downloadPdf = this.downloadPdf.bind(this)
    };

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(MyDocument);
        renderer.toJSON();
      });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(MyDocument, div);
    });
    
    describe('MyDocument', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (MyDocument);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName addTitle', () => {
    //     sinon.spy(MyDocument.addTitle);
    //     // const wrapper = shallow(<MyDocument />);
    //     const wrapper = shallow(                      //#3
    //         (MyDocument, store={store})                    //<NewCase store={store} />
    //       );
    //     expect(MyDocument.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
    //   it('allows us to set props', () => {
    //     const wrapper = mount(<MyDocument bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount(
    //       <MyDocument onButtonClick={onButtonClick} />
    //     );
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});