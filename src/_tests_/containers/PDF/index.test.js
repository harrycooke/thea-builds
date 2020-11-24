import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import Provider from 'react-redux';
import sinon from 'sinon';

import {shallow, configure, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import {PDF} from '../../../containers/PDF/index';
import {callDownloadPDF} from '../../../containers/PDF/index';

describe('PDF', () => {
    beforeAll = () => {
        this.state = {
            channel_id: '',
            currentCase: '',
            readedMessages: [],
            isLoading: true,
            readedMessagesWasSetted: false,
            currentCaseWasSetted: false
        }
        this.callDownloadPDF = this.callDownloadPDF.bind(this)
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(PDF, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(PDF);
        renderer.toJSON();
      });    

    describe('PDF', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (PDF);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName callDownloadPDF', () => {
    //     sinon.spy(PDF.callDownloadPDF);
    //     const wrapper = mount(<PDF />);
    //     expect(PDF.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
    //   it('allows us to set props', () => {
    //     const wrapper = mount(<PDF bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <PDF onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});

test('Fake test', ()=>{
    expect(true).toBeTruthy();          //here toBeTruthy is a predifined method whichif receives "true", considers to be expected.
});