import React from 'react';
import ReactDOM from'react-dom';

import {Checkout} from '../../../containers/Checkout/Checkout';

describe('Checkout', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Checkout, div);
    });
});