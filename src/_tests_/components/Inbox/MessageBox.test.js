import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import {MessageBox} from '../../../components/Inbox/MessageBox';

describe('MessageBox', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });
    

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(MessageBox, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(MessageBox);
        renderer.toJSON();
      });

    describe('MessageBox', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (MessageBox);
          expect(component).toMatchSnapshot();
        });
      });
});