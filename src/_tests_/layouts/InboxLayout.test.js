import React from 'react';
import ReactDOM from'react-dom';

import {InboxLayout} from '../../layouts/InboxLayout';

describe('InboxLayout', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(InboxLayout, div);
    });
});