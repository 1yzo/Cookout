import React from 'react';
import { shallow } from 'enzyme';
import { App }  from '../../components/App';

describe('App', () => {
    it('should render correctly with no token', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.state('isLoaded')).toBeTruthy();
    });

    it('should render correctly with a token', () => {
        const mockStartSetUser = jest.fn(() => new Promise(resolve => { resolve() }));
        const wrapper = shallow(<App token="abc123" startSetUser={mockStartSetUser} />);
        expect(wrapper.state('isLoaded')).toBeFalsy();
        expect(wrapper).toMatchSnapshot();
        expect(mockStartSetUser).toHaveBeenCalled();
    });
});