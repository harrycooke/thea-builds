import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6\
import {CircularComponent} from '../../../components/SharedComponents/CircularComponent';

describe('CircularComponent', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(CircularComponent, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(CircularComponent);
        renderer.toJSON();
      });    

    describe('CircularComponent', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (CircularComponent);
          expect(component).toMatchSnapshot();
        });
      });
});