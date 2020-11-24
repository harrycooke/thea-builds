import React from 'react';
import ReactDOM from'react-dom';

import {InsideMessageLayout} from '../../layouts/InsideMessageLayout';

describe('InsideMessageLayout', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(InsideMessageLayout, div);
    });
});