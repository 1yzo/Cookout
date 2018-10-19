import React from 'react';
import { shallow } from 'enzyme';
import { ListingForm } from '../../components/ListingForm';
import TimeSelect from '../../components/TimeSelect';

describe('ListingForm', () => {
    const oldFileReader = window.FileReader;
    
    beforeAll(() => {
        window.FileReader =  function () {
            this.readAsDataURL= () => {
                this.result = 'IMAGE';
                this.onloadend();
            }
        }
    });

    afterAll(() => {
        window.FileReader = oldFileReader;
    });
    
    it('should set the correct default state given no listing prop', () => {
        const wrapper = shallow(<ListingForm />);
        expect(wrapper.state('badges')).toEqual([]);
        expect(wrapper.state('images')).toBe(undefined);
        expect(wrapper.state('address')).toBe('');
        expect(wrapper.state('location')).toEqual({});
        expect(wrapper.state('price')).toBe('');
        expect(wrapper.state('occupancy')).toBe('');
        expect(wrapper.state('description')).toBe('');
        expect(wrapper.state('subImages')).toEqual([]);
        expect(wrapper.state('hours')).toEqual({ open: 0, close: 0 });
        expect(wrapper.state('error')).toBe('');
        expect(wrapper.state('s3ObjectKeysToDelete')).toEqual([]);
    });

    it('should add badge id to badges on a badge click', () => {
        const badgeId = 'tools';
        const wrapper = shallow(<ListingForm />);
        wrapper.find(`#${badgeId}`).simulate('click', {
            target: {
                id: badgeId
            }
        });
        expect(wrapper.state('badges').includes(badgeId)).toBeTruthy();
    });

    it('should set open hours on TimeSelect change', () => {
        const value = '1';
        const wrapper = shallow(<ListingForm />);
        wrapper.find(TimeSelect).at(0).simulate('change', {
            target: {
                value
            }
        });
        expect(wrapper.state('hours')).toEqual({
            open: Number(value),
            close: 0
        });
    });

    it('should set close hours on TimeSelect change', () => {
        const value = '1';
        const wrapper = shallow(<ListingForm />);
        wrapper.find(TimeSelect).at(1).simulate('change', {
            target: {
                value
            }
        });
        expect(wrapper.state('hours')).toEqual({
            open: 0,
            close: Number(value)
        });
    });

    it('should set image on image file change', () => {
        const wrapper = shallow(<ListingForm />);
        const file = {
            lastModified: 1525910391781,
            name: "image.jpg",
            size: 1000,
            type: "image/jpeg"
        };
        wrapper.find('#imageInput').simulate('change', {
            target: {
                files: [file]
            }
        });
        expect(wrapper.state('image')).toEqual({
            file,
            tag: 'IMAGE',
            fromS3: false
        });
    });
});

