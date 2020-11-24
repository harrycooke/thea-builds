import React from 'react';
import ReactDOM from'react-dom';

import {Review} from '../../../containers/Checkout/Review';

describe('Review', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Review, div);
    });
});