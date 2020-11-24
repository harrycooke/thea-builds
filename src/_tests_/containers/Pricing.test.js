import React from 'react';
import ReactDOM from'react-dom';

import {Pricing} from '../../containers/Pricing';

describe('Pricing', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Pricing, div);
    });
});