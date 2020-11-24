import React from 'react';
import ReactDOM from'react-dom';

import {NewCaseLayout} from '../../layouts/NewCaseLayout';

describe('NewCaseLayout', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(NewCaseLayout, div);
    });
});