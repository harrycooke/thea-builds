import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import sinon from 'sinon';
import {shallow, configure, mount, render} from 'enzyme';

import {CreateButton} from '../../../components/CreateButton/CreateButton';

describe('CreateButton', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(CreateButton, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(CreateButton);
        renderer.toJSON();
      });    

    describe('CreateButton', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (CreateButton);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName handleSaveDraft', () => {
    //     sinon.spy(CreateButton.prototype, 'handleSaveDraft');
    //     const wrapper = mount(<CreateButton />);
    //     expect(CreateButton.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
    //   it('allows us to set props', () => {
    //     const wrapper = mount(<CreateButton bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <CreateButton onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });
});