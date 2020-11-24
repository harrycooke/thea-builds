import React from 'react';
import ReactDOM from'react-dom';

import {MySnackbarContentWrapper} from '../../../components/SharedComponents/Snackbar';

describe('MySnackbarContentWrapper', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(MySnackbarContentWrapper, div);
    });
});