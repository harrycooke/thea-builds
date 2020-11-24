import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import {Settings} from '../../../containers/Settings/index';

describe('Settings', () => {
    beforeAll = () => {
        state = {
            open: false
          };
    };


    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Settings, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(Settings);
        renderer.toJSON();
      });
      
    describe('Settings', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (Settings);
          expect(component).toMatchSnapshot();
        });
      });
});