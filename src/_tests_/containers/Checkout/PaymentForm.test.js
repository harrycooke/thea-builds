import React from 'react';
import ReactDOM from'react-dom';

import {PaymentForm} from '../../../containers/Checkout/PaymentForm';

describe('PaymentForm', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(PaymentForm, div);
    });
});