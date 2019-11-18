import ReactOnRails from "react-on-rails";

import Orders from "../bundles/Orders/components/Orders";
import RefundOrder from "../bundles/Orders/components/RefundOrder";
import RefundedOrder from "../bundles/Orders/components/RefundedOrder";
import UpdateOrderPayment from "../bundles/Orders/components/UpdateOrderPayment";

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({ Orders, UpdateOrderPayment, RefundOrder, RefundedOrder });
