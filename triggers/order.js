const listOrders = (z, bundle) => {
  // `z.console.log()` is similar to `console.log()`.
  z.console.log('console says hello world!');

  const params = {};
  if (bundle.inputData.status) {
    params.status = bundle.inputData.status;
  }

  // You can build requests and our client will helpfully inject all the variables
  // you need to complete. You can also register middleware to control this.
  const requestOptions = {
    url: 'https://api.megaventory.com/v2017a/json/reply/SalesOrderGet',
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      "APIKEY": "40eb126f1e001a75@m73276",
      "mvSalesOrderStatus": "Cancelled"
    })
  };

//  let items = z.JSON.parse(response.content).items;

  //let item = items.mvSalesOrders[1];
  //item.forEach(i => {
  //  i.id = i.SalesOrderId;
  //})
//  return items;
  // You may return a promise or a normal data structure from any perform method.

   return z.request(requestOptions)
          .then((response) => {
            const raw_respponse = z.JSON.parse(response.content);
            return raw_response.mvSalesOrders
          });
          
};

// We recommend writing your triggers separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'order',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Order',
  display: {
    label: 'New Order',
    description: 'Trigger when an order is updated.'
  },

  // `operation` is where the business logic goes.
  operation: {

    // `inputFields` can define the fields a user could provide,
    // we'll pass them in as `bundle.inputData` later.
    inputFields: [
      {key: 'status',
      choices: {'pending': 'pending', 'dispatched': 'dispatched', 'cancelled':'cancelled' },
      helpText: 'Which order status this should trigger on.'}
    ],

    perform: listOrders,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {

      id: 7383,
      SalesOrderNo: "SO916",
      SalesOrderReferenceNo: "",
      SalesOrderReferenceApplication: "",
      SalesOrderDate: "/Date(1521064800000-0000)/",
      SalesOrderCustomOrderDate1: "/Date(1521151200000-0000)/",
      SalesOrderCustomOrderDate2: "/Date(-62135596800000-0000)/",
      SalesOrderCurrencyCode: "GBP",
      SalesOrderClientID: 92,
      SalesOrderBillingAddress: "16-1 Midori-machi\nKoriyama-city Fukushima 963-8023\nJapan ",
      SalesOrderShippingAddress: "6 Suwamae Nakakamado \nWatanabe-machi \nIwaki-city \nFukushima 972-8337 Japan\n+81-50-3716-5410",
      SalesOrderContactPerson: "Kayoko Wakamatsu",
      SalesOrderInventoryLocationID: 0,
      SalesOrderCustomFlag1: true,
      SalesOrderCustomFlag2: false,
      SalesOrderCustomFlag3: false,
      SalesOrderCustomFlag4: true,
      SalesOrderCustomFlag5: false,
      SalesOrderComments: "B81",
      SalesOrderTags: "",
      SalesOrderTotalQuantity: 104,
      SalesOrderAmountSubtotalWithoutTaxAndDiscount: 0,
      SalesOrderAmountShipping: 0,
      SalesOrderAmountTotalDiscount: 0,
      SalesOrderAmountTotalTax: 0,
      SalesOrderAmountGrandTotal: 1250,
      SalesOrderDetails: [

      {
      SalesOrderRowProductSKU: "34COR",
      SalesOrderRowProductDescription: "HALLA Small Purse - Coral ",
      SalesOrderRowQuantity: 5,
      SalesOrderRowShippedQuantity: 0,
      SalesOrderRowInvoicedQuantity: 0,
      SalesOrderRowUnitPriceWithoutTaxOrDiscount: 4.8,
      SalesOrderRowTaxID: 0,
      SalesOrderTotalTaxAmount: 0,
      SalesOrderRowDiscountID: 0,
      SalesOrderRowTotalDiscountAmount: 0,
      SalesOrderRowTotalAmount: 24,
      SalesOrderRowRemarks: ""
      }
      ],
      SalesOrderStatus: "Pending",
      SalesOrderCreationDate: "/Date(1521101059220-0000)/",
      SalesOrderLastUpdatedDate: "/Date(1521111463250-0000)/"
    },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'SalesOrderStatus', label: 'Status'},

    ]
  },

};
