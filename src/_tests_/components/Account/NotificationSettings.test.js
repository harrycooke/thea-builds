import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import sinon from 'sinon';
import { mount } from 'enzyme';

import {NotificationSettings} from '../../../components/Account/NotificationSettings';

describe('NotificationSettings', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(NotificationSettings, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(NotificationSettings);
        renderer.toJSON();
      });    

    describe('NotificationSettings', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (NotificationSettings);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName handleChangeSwitch', () => {
    //     sinon.spy(NotificationSettings.prototype, 'handleChangeSwitch');
    //     const wrapper = mount(<NotificationSettings />);
    //     expect(NotificationSettings.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
    //   it('allows us to set props', () => {
    //     const wrapper = mount(<NotificationSettings bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <NotificationSettings onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});