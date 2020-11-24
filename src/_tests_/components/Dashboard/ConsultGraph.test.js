import React from 'react';
import ReactDOM from'react-dom';

import {YourLineGraph} from '../../../components/Dashboard/ConsultGraph';

describe('YourLineGraph', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(YourLineGraph, div);
    });
});