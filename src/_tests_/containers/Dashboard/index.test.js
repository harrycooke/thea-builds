import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import Provider from 'react-redux';
import sinon from 'sinon';

import {shallow, configure, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import {Dashboard} from '../../../containers/Dashboard/index';
import {shouldComponentRender, getOpenConsults, getStartDate, getMonthArray, getMonthlyTotals} from '../../../containers/Dashboard/index';
import reducers from '../../../reducers';
// import {state} from '../state';


configure({adapter: new Adapter()});

describe('Dashboard', () => {
    beforeAll = () => {
        state = {
            readAllCases: [],
            loading: true,
            amount: 9500,
            period: 4,
            start: 0,
            data: [],
            labels: [] 
          };
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Dashboard, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
        const renderer = TestRenderer.create(Dashboard);
        renderer.toJSON();
      });
      
    describe('Dashboard', () => {
        it('should render correctly in "debug" mode', () => {
          const component = (Dashboard);
          expect(component).toMatchSnapshot();
        });
      });

    // it('calls funcName shouldComponentRender', () => {
    //     sinon.spy(Dashboard.shouldComponentRender);
    //     const wrapper = mount(<Dashboard />);
    //     expect(Dashboard.prototype.componentDidMount).to.have.property('callCount', 1);
    //   });
    
    // it('allows us to set props', () => {
    //     const wrapper = mount(<Dashboard bar="baz" />);
    //     expect(wrapper.props().bar).to.equal('baz');
    //     wrapper.setProps({ bar: 'foo' });
    //     expect(wrapper.props().bar).to.equal('foo');
    //   });
    
    // it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //       <Dashboard onButtonClick={onButtonClick} />
    //     ));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });

    // describe('render', () => {
    //     it('should render the chart', () => {
    //         const dashboard = shallow(<Dashboard i={32}/>);
    //         const count = 32;

    //         expect(dashboard.contains(count)).toEqual(true);
    //     });
    // });

    // describe('getOpenConsults', () => {
    //     it('should format number of consults', () => {
    //         const consults = shallow(<Dashboard/>);
    //         const count = 32;
    //         const expected = '32';
    //         const actual = consults.instance().getOpenConsults();

    //         expect(actual).toBe(expected);
    //     });
    // });
});

test('Fake test', ()=>{
    expect(true).toBeTruthy();          //here toBeTruthy is a predifined method whichif receives "true", considers to be expected.
});