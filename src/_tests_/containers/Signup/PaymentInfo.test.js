import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import Provider from 'react-redux';
import sinon from 'sinon';

import {shallow, configure, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import {PaymentInfo} from '../../../containers/Signup/PaymentInfo';
import {getSetupIntent, onChange, handler, handleHitEnter, handleChangeInput} from '../../../containers/Signup/PaymentInfo';

describe('PaymentInfo', () => {
    beforeAll = () => {
        this.state = {
            secret: "",
            name: "",
            lastName: "",
            errors: {}
        };  
        this.handler = this.handler.bind(this)
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(PaymentInfo, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(PaymentInfo);
        renderer.toJSON();
      });    

    describe('PaymentInfo', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (PaymentInfo);
          expect(component).toMatchSnapshot();
        });
      });
    // it('calls funcName onChange', () => {
    //     sinon.spy(PaymentInfo.componentDidMount);
    //     const wrapper = mount(<PaymentInfo />);
    //     expect(PaymentInfo.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
    //   it('allows us to set props', () => {
    //     const wrapper = mount(<PaymentInfo bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <PaymentInfo onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});