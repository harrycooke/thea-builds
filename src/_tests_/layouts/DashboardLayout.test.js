import React from 'react';
import ReactDOM from'react-dom';

import {DashboardLayout} from '../../layouts/DashboardLayout';

describe('DashboardLayout', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(DashboardLayout, div);
    });
});