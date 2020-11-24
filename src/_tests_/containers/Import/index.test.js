import React from 'react';
import ReactDOM from'react-dom';
import TestRenderer from 'react-test-renderer'; // ES6
import {Import} from '../../../containers/Import/index';

describe('Import', () => {
    // beforeAll(() => {
    //     this.commonProps = {};
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Import, div);
    });

    it('renders React components, traversing a ReactElement tree and represents as JSON object', () => {
      const renderer = TestRenderer.create(Import);
      renderer.toJSON();
    });
    

    describe('Import', () => {
      it('should render correctly in "debug" mode', () => {
        const component = (Import);
        expect(component).toMatchSnapshot();
      });
    });
    // test('uploads the file after a click event', () => {
    //     const fileUploaderMock = jest.fn();
    //     const component = shallow(<Import
    //       oldFileList={[]}                       //files here
    //       onFilesUploaded={fileUploaderMock}
    //     />, { context: {...} });
      
    //     const file = {
    //       name: 'test.jpg',
    //       type: 'image/jpg',
    //     };
      
    //     const fileList = {
    //       length: 1,
    //       item: () => null,
    //       0: file,
    //     };
      
    //     const event = {
    //       currentTarget: {
    //         oldFileList: fileList,
    //       }
    //     };
      
    //     const instance = component.instance();              //as Import
    //     instance.handleUploadFile(event);
    //     expect(fileUploaderMock).toBeCalledWith(fileList);
    //   });
});


// test('Fake test', ()=>{
//     expect(true).toBeTruthy();          //here toBeTruthy is a predifined method whichif receives "true", considers to be expected.
// });