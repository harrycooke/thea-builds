import React from 'react';
import ReactDOM from'react-dom';

import {ForgotPassword} from '../../../../containers/Signin/ForgotPassword';

describe('ForgotPassword', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(ForgotPassword, div);
    });
});