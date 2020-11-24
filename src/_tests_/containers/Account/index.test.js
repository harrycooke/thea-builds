import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import sinon from 'sinon';
import { mount } from 'enzyme';

import {Account} from '../../../containers/Account/index';

describe('Account', () => {
    beforeAll = () => {
        this.state = {
            isAvatarLoader: false
          }
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Account, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(Account);
        renderer.toJSON();
      });
    

    describe('Account', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (Account);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName handleSnackbarClose', () => {
    //     sinon.spy(Account.prototype, 'handleSnackbarClose');
    //     const wrapper = mount(<Account />);
    //     expect(Account.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
    //   it('allows us to set props', () => {
    //     const wrapper = mount(<Account bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <Account onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});

test('Fake test', ()=>{
    expect(true).toBeTruthy();          //here toBeTruthy is a predifined method whichif receives "true", considers to be expected.
});