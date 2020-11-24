import React from 'react';
import ReactDOM from'react-dom';

import {AssignConsultLayout} from '../../layouts/AssignConsultLayout';

describe('AssignConsultLayout', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(AssignConsultLayout, div);
    });
});