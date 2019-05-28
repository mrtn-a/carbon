import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import MultiActionButton from './multi-action-button.component';
import Button from '../button';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('MultiActionButton', () => {
  let instance;
  const handleSecondButton = jasmine.createSpy('second');
  const handleFirstButton = jasmine.createSpy('first');

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <MultiActionButton className='test' text='Main Button'>
        <Button className='first-button' onClick={ handleFirstButton }>First Button</Button>
        <Button className='second-button' onClick={ handleSecondButton }>Second Button</Button>
      </MultiActionButton>
    );
  });

  describe('mainClasses', () => {
    let wrapper;
    const multiActionButtonSelector = '[data-component="multi-action-button"]';

    beforeEach(() => {
      wrapper = shallow(<MultiActionButton />);
    });

    it('adds all super classes', () => {
      expect(wrapper.find(multiActionButtonSelector).hasClass('carbon-split-button')).toBe(true);
    });

    it('adds multi action button classes', () => {
      expect(wrapper.find(multiActionButtonSelector).hasClass('carbon-multi-action-button')).toBe(true);
    });

    describe('when additional buttons are open', () => {
      it('adds an open class', () => {
        wrapper.setState({ showAdditionalButtons: true });
        expect(wrapper.find(multiActionButtonSelector).hasClass('carbon-multi-action-button--open')).toBe(true);
        expect(wrapper.find(multiActionButtonSelector).hasClass('carbon-split-button--open')).toBe(true);
      });
    });
  });

  describe('additionalButtonsClasses', () => {
    it('adds all super classes', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-split-button').length).toEqual(1);
    });

    it('adds multi action button classes', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-multi-action-button').length).toEqual(1);
    });

    it('adds right aligned class', () => {
      instance = TestUtils.renderIntoDocument(<MultiActionButton align='right' text='Main Button' />);
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-multi-action-button--align-right').length).toEqual(1);
    });
  });

  describe('toggleButtonClasses', () => {
    it('adds all super classes', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-split-button__toggle').length).toEqual(1);
    });

    it('adds multi action button classes', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-multi-action-button__toggle').length).toEqual(1);
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const multiActionButtonSelector = '[data-component="multi-action-button"]';
      const wrapper = shallow(
        <MultiActionButton
          data-element='bar'
          data-role='baz'
          text='Test'
        >
          <Button>Test</Button>
        </MultiActionButton>
      );

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper.find(multiActionButtonSelector), 'multi-action-button', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      const wrapper = shallow(
        <MultiActionButton text='Test'>
          <Button>Test</Button>
        </MultiActionButton>
      );
      wrapper.setState({ showAdditionalButtons: true });

      elementsTagTest(wrapper, [
        'additional-buttons',
        'main-button'
      ]);
    });
  });
});
