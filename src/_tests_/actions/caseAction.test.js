import React from 'react';
import ReactDOM from'react-dom';

import {
    sendCase,
    setCurrentCase,
    fetchAllCases,
    modifyCase,
    getNumOfNewMessage,
    setSnackbar,
} from '../../actions/caseAction';


describe('sendCase', () => {
    beforeAll = () => {
        this.caseData = {};
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(sendCase, div);
    });
});

describe('setCurrentCase', () => {
    beforeAll = () => {
        this.request = {};
    };
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(setCurrentCase, div);
    });
});

describe('fetchAllCases', () => {
    beforeAll = () => {
        this.currentUserData = {};
    };
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(fetchAllCases, div);
    });
});

describe('modifyCase', () => {
    beforeAll = () => {
        this.caseData = {};
    };
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(modifyCase, div);
    });
});

describe('getNumOfNewMessage', () => {
    beforeAll = () => {
        this.userData = {};
    };
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(getNumOfNewMessage, div);
    });
});

describe('setSnackbar', () => {
    beforeAll = () => {
        this.snackbarValue = {};
    };
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(setSnackbar, div);
    });
});