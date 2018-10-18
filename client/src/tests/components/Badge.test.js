import React from 'react';
import { shallow } from 'enzyme';
import Badge from '../../components/Badge';

describe('Badge', () => {
    it('has badge--active className when active', () => {
        const props = {
            id: 'abc',
            isActive: true,
            onClick: jest.fn(),
            children: <div></div>
        };
        const wrapper = shallow(<Badge {...props} />);
        expect(wrapper.find('#abc').hasClass('badge--active')).toBeTruthy();
    });

    it('does not have badge--active className when not active', () => {
        const props = {
            id: 'abc',
            isActive: false,
            onClick: jest.fn(),
            children: <div></div>   
        };
        const wrapper = shallow(<Badge {...props} />);
        expect(wrapper.find('#abc').hasClass('badge--active')).toBeFalsy();
    });
});