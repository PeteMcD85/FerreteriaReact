import ReactOnRails from 'react-on-rails';

import HelloWorld from '../bundles/HelloWorld/components/HelloWorld';
import Items from '../bundles/HelloWorld/components/Items';
import CategoryList from '../bundles/HelloWorld/components/CategoryList'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld, Items, CategoryList
});
