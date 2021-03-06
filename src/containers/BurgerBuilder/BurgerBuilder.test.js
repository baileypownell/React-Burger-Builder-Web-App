import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';


configure({adapter: new Adapter()});

describe('<burgerBuilder />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
  });

  it('should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({ings: {Lettuce: 0}});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
