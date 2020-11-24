import React from 'react';
import ReactDOM from'react-dom';

import {AdminLayout} from '../../layouts/AdminLayout';

describe('AdminLayout', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(AdminLayout, div);
    });
});