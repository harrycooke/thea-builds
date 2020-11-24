import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import sinon from 'sinon';
import { mount } from 'enzyme';

import {CardDetails} from '../../../components/Account/CardDetails';

describe('CardDetails', () => {
    beforeAll = () => {
        this.state = {
            secret: "",
            name: "",
            lastFour: "",
            brand: "",
            updateCard: false,
            errors: {},
            stripeKey: "",
        };
        this.handler = this.handler.bind(this);
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(CardDetails, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(CardDetails);
        renderer.toJSON();
      });

    describe('CardDetails', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (CardDetails);
          expect(component).toMatchSnapshot();
        });
      });


    // it('calls funcName', () => {
    //     sinon.spy(CardDetails.prototype, 'funcName');
    //     const wrapper = mount(<CardDetails />);
    //     expect(CardDetails.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
    //   it('allows us to set props', () => {
    //     const wrapper = mount(<CardDetails bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <CardDetails onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});

test('Fake test', ()=>{
    expect(true).toBeTruthy();          //here toBeTruthy is a predifined method whichif receives "true", considers to be expected.
});