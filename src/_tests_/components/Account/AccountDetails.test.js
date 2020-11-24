import React from 'react';
import ReactDOM from'react-dom';

import AccountDetails from '../../../components/Account/AccountDetails';

describe('AccountDetails', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });
    
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AccountDetails/>, div);
    });
});

test('Fake test', ()=>{
    expect(true).toBeTruthy();          //here toBeTruthy is a predifined method whichif receives "true", considers to be expected.
});