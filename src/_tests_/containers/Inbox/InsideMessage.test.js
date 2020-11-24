import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import {InsideMessage} from '../../../containers/Inbox/InsideMessage';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('InsideMessage', () => {
    beforeAll = () => {
        this.state = {
            expanded: false,
            client: socket(),
            currentCase: '',
            // displayModal: false,
            // closed: false,
            // documentModal: false,
            // downloadPDF: true 
        }
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(InsideMessage, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(InsideMessage);
        renderer.toJSON();
      });
      
    describe('InsideMessage', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (InsideMessage);
          expect(component).toMatchSnapshot();
        });
      });
    // test.only('this will be the only test that runs', () => {
    //     expect(true).toBe(false);
    //   });
      
    //   test('this test will not run', () => {
    //     expect('A').toBe('A');
    //   });

    // it('renders without anytime crashing', () => {              
    //     shallow(<InsideMessage />);       
    //   });


    // it('calls funcName', () => {
    //     sinon.spy(InsideMessage.prototype, 'funcName');
    //     const wrapper = mount(<InsideMessage />);
    //     expect(InsideMessage.prototype.componentDidMount).to.have.property('callCount', 1);
    // });
    
    // it('allows us to set props', () => {
    //     const wrapper = mount(<InsideMessage bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    // });
    
    // it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //         <InsideMessage onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    // });
});