import React from 'react';
import renderer from 'react-test-renderer';
import RecipeItem from '../client/src/components/CustomDialog.jsx';

test('component does something when clicked', () => {
  const testRecipe = rendere.create(<Recipe/>)
  let recipeSnap = testRecipe.toJSON()
  expect(recipeSnap).toMatchSnapshot();

  recipeSnap.onClick()

})