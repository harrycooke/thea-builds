import React from 'react';
import ReactDOM from'react-dom';

import {AddressForm} from '../../../containers/Checkout/AddressForm';

describe('AddressForm', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(AddressForm, div);
    });
});