import React from 'react';
import ReactDOM from'react-dom';

import {
    saveDraft,
    setCurrentDraft,
    fetchAllDrafts,
    modifyDraft,
    removeDraft,
} from '../../actions/draftActions';


describe('saveDraft', () => {
    beforeAll = () => {
        this.draftData = {};
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(saveDraft, div);
    });
});

describe('setCurrentDraft', () => {
    beforeAll = () => {
        this.request = {};
    };
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(setCurrentDraft, div);
    });
});

describe('fetchAllDrafts', () => {
    beforeAll = () => {
        this.currentUserData = {};
    };
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(fetchAllDrafts, div);
    });
});

describe('modifyDraft', () => {
    beforeAll = () => {
        this.draftData = {};
    };
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(modifyDraft, div);
    });
});

describe('removeDraft', () => {
    beforeAll = () => {
        this.request = {};
    };
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(removeDraft, div);
    });
});
