import React from 'react';
import ReactDOM from'react-dom';

import TestRenderer from 'react-test-renderer'; // ES6
import sinon from 'sinon';
import {shallow, configure, mount, render} from 'enzyme';

import {InboxSideBar} from '../../../components/Sidebar/InboxSideBar';

describe('InboxSideBar', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });


    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(InboxSideBar, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(InboxSideBar);
        renderer.toJSON();
      });
      
    describe('InboxSideBar', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (InboxSideBar);
          expect(component).toMatchSnapshot();
        });
      });
});