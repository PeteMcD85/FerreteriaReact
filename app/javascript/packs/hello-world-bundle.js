import ReactOnRails from 'react-on-rails';

import HelloWorld from '../bundles/HelloWorld/components/HelloWorld';
import Orders from '../bundles/HelloWorld/components/Orders';
import Order from '../bundles/HelloWorld/components/Order';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld, Orders, Order
});
