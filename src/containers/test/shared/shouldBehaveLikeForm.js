import React from 'react';
import {shallow} from 'enzyme';
import fakeEvent from 'fake-event';

export const commonFormValidation = function(Form) {
  test('render Email error message', () => {
    const component = shallow(<Form {...this.commonProps} />);
    // component.setState({fields: {age: 12, gender: 'male'}});             //Define all other fields
    component.find('form').simulate('submit', fakeEvent());
    expect(component.text()).toEqual(
      expect.stringContaining('Email field is required' || 'Email is invalid')
    );
  });

  test('render password error message', () => {
    const component = shallow(<Form {...this.commonProps} />);
    // component.setState({fields: {name: 'Name', gender: 'male'}});               //Define all other fields
    component.find('form').simulate('submit', fakeEvent());
    expect(component.text()).toEqual(
      expect.stringContaining('Incorrect username or password.')
    );
  });
};


export const commonFormValidation2 = function(Form) {
  test('render firstname error message', () => {
    const component = shallow(<Form {...this.commonProps} />);
    // component.setState({fields: {age: 12, gender: 'male'}});             //Define all other fields
    component.find('form').simulate('submit', fakeEvent());
    expect(component.text()).toEqual(
      expect.stringContaining('Name field is required')
    );
  });

  test('render lastname error message', () => {
    const component = shallow(<Form {...this.commonProps} />);
    // component.setState({fields: {age: 12, gender: 'male'}});             //Define all other fields
    component.find('form').simulate('submit', fakeEvent());
    expect(component.text()).toEqual(
      expect.stringContaining('Name field is required')
    );
  });

  test('render Practice error message', () => {                             //This wont be requoired as field is auto-filled 
    const component = shallow(<Form {...this.commonProps} />);
    // component.setState({fields: {age: 12, gender: 'male'}});             //Define all other fields
    component.find('form').simulate('submit', fakeEvent());
    expect(component.text()).toEqual(
      expect.stringContaining('Practice Name is required')
    );
  });

  test('render Specialty error message', () => {
    const component = shallow(<Form {...this.commonProps} />);
    // component.setState({fields: {age: 12, gender: 'male'}});             //Define all other fields
    component.find('form').simulate('submit', fakeEvent());
    expect(component.text()).toEqual(
      expect.stringContaining('Specialty field is required')
    );
  });

  test('render User type field error message', () => {
    const component = shallow(<Form {...this.commonProps} />);
    // component.setState({fields: {age: 12, gender: 'male'}});             //Define all other fields
    component.find('form').simulate('submit', fakeEvent());
    expect(component.text()).toEqual(
      expect.stringContaining('User Type field is required')
    );
  });

  test('render Email error message', () => {
    const component = shallow(<Form {...this.commonProps} />);
    // component.setState({fields: {age: 12, gender: 'male'}});             //Define all other fields
    component.find('form').simulate('submit', fakeEvent());
    expect(component.text()).toEqual(
      expect.stringContaining('Email field is required' || 'Email is invalid')
    );
  });

  test('render password error message', () => {
    const component = shallow(<Form {...this.commonProps} />);
    // component.setState({fields: {name: 'Name', gender: 'male'}});               //Define all other fields
    component.find('form').simulate('submit', fakeEvent());
    expect(component.text()).toEqual(
      expect.stringContaining('Incorrect username or password.')
    );
  });

  test('render Confirm password error message', () => {
    const component = shallow(<Form {...this.commonProps} />);
    // component.setState({fields: {name: 'Name', gender: 'male'}});               //Define all other fields
    component.find('form').simulate('submit', fakeEvent());
    expect(component.text()).toEqual(
      expect.stringContaining('Confirm password field is required' || 'Passwords must match')
    );
  });
};


export const commonFormOnUpdate = function(Form) {
  test('update Email state', () => {
    const component = shallow(<Form {...this.commonProps} />);
    component
      .find('input[ name ="email"]') 
      .simulate('change', fakeEvent({target: {name: 'email', value: 'email'}}));
    expect(component.state('fields').email).toEqual('email');
  });

  test('update Password state', () => {
    const component = shallow(<Form {...this.commonProps} />);
    component
      .find('input[name="password"]')
      .simulate('change', fakeEvent({target: {name: 'password', value: 'password'}}));
    expect(component.state('fields').password).toEqual('password');
  });
};