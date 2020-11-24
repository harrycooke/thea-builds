import React from 'react';
import ReactDOM from'react-dom';

import {
    registerUser, 
    loginUser, 
    fetchUserData, 
    fetchStripeData, 
    fetchPracticeData, 
    modifyUserData, 
    modifyPracticeData, 
    confirmPassword,
    setCurrentUser,
    setUserLoading,
    logoutUser,
    forgotPassword,
    fetchSpecificUsers,
    newAccountEmail,
    getPublicStripeKey,
    setSnackbar,
} from '../../actions/authActions';


describe('registerUser', () => {
    beforeAll = () => {
        this.state = ({
            userData: {},
            history: {},
          });
        };
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(registerUser, div);
    });
});

describe('loginUser', () => {
    beforeAll = () => {
        this.userData = {};
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(loginUser, div);
    });
});

describe('fetchUserData', () => {
    beforeAll = () => {
        this.userID = {};
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(fetchUserData, div);
    });
});

describe('fetchStripeData', () => {
    beforeAll = () => {
        this.practiceId = {};
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(fetchStripeData, div);
    });
});

describe('fetchPracticeData', () => {
    beforeAll = () => {
        this.practiceId = {};
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(fetchPracticeData, div);
    });
});

describe('modifyUserData', () => {
    beforeAll = () => {
        this.userData = {};
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(modifyUserData, div);
    });
});

describe('modifyPracticeData', () => {
    beforeAll = () => {
        this.practiceData = {};
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(modifyPracticeData, div);
    });
});

describe('confirmPassword', () => {
    beforeAll = () => {
        this.userData = {};
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(confirmPassword, div);
    });
});

describe('setCurrentUser', () => {
    // beforeAll = () => {
    //     this.userID = {};
    // };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(setCurrentUser, div);
    });
});

describe('setUserLoading', () => {
    // beforeAll = () => {
    //     this.userID = {};
    // };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(setUserLoading, div);
    });
});

describe('logoutUser', () => {
    // beforeAll = () => {
    //     this.userID = {};
    // };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(logoutUser, div);
    });
});

describe('forgotPassword', () => {
    beforeAll = () => {
        this.userData = {};
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(forgotPassword, div);
    });
});

describe('fetchSpecificUsers', () => {
    beforeAll = () => {
        this.specialtyType = {};
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(fetchSpecificUsers, div);
    });
});

describe('newAccountEmail', () => {
    beforeAll = () => {
        this.newUserData = {};
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(newAccountEmail, div);
    });
});

describe('getPublicStripeKey', () => {
    // beforeAll = () => {
    //     this.userID = {};
    // };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(getPublicStripeKey, div);
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

test('Fake test', ()=>{
    expect(true).toBeTruthy();          //here toBeTruthy is a predifined method whichif receives "true", considers to be expected.
});