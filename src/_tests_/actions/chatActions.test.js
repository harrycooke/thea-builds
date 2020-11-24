import React from 'react';
import ReactDOM from'react-dom';

import {
    sendMessages,
    readMessages,
} from '../../actions/chatActions';


describe('sendMessages', () => {
    beforeAll = () => {
        this.commonProps = {};
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(sendMessages, div);
    });
});

describe('readMessages', () => {
    beforeAll = () => {
        this.channelData = {};
    };
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(readMessages, div);
    });
});
