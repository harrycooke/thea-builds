import React from 'react';
import ReactDOM from'react-dom';

import TestRenderer from 'react-test-renderer'; // ES6\
import sinon from 'sinon';
import { mount } from 'enzyme';

import {DropzonePlugin} from '../../../components/NewCase/DropzonePlugin';

describe('DropzonePlugin', () => {
    beforeAll = () => {
        this.props = {};
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(DropzonePlugin, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(DropzonePlugin);
        renderer.toJSON();
      });
      
    describe('DropzonePlugin', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (DropzonePlugin);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName handleSnackbarClose', () => {
    //     sinon.spy(DropzonePlugin.prototype, 'handleSnackbarClose');
    //     const wrapper = mount(<DropzonePlugin />);
    //     expect(DropzonePlugin.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
    //   it('allows us to set props', () => {
    //     const wrapper = mount(<DropzonePlugin bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <DropzonePlugin onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});