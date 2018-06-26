var returnSalesApp = returnSalesApp || {};

(function () {

    var ReturnDialog = returnSalesApp.ReturnDialog;

    returnSalesApp.ReturnItem = React.createClass({
        displayName: "ReturnItem",

        handleReturnSaleItem: function (returnItem) {
            this.props.onReturn(returnItem);
        },

        render: function () {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    this.props.index
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "b",
                        null,
                        "Name:"
                    ),
                    " ",
                    this.props.saleItem.sale.customer.name,
                    " ",
                    React.createElement("br", null),
                    React.createElement(
                        "b",
                        null,
                        "Phone:"
                    ),
                    " ",
                    this.props.saleItem.sale.customer.phone
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "b",
                        null,
                        "Item Name:"
                    ),
                    " ",
                    this.props.saleItem.item.name,
                    " ",
                    React.createElement("br", null),
                    React.createElement(
                        "b",
                        null,
                        "Original Number:"
                    ),
                    " ",
                    this.props.saleItem.item.original_number
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.saleItem.sale.id
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.saleItem.sale.created_at
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "b",
                        null,
                        "Qty:"
                    ),
                    " ",
                    this.props.saleItem.qty,
                    " ",
                    React.createElement("br", null),
                    React.createElement(
                        "b",
                        null,
                        "Returned Qty:"
                    ),
                    " ",
                    this.props.saleItem.total_returned_qty,
                    " ",
                    React.createElement("br", null),
                    React.createElement(
                        "b",
                        null,
                        "Unit Price:"
                    ),
                    " ",
                    this.props.saleItem.unit_price
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(ReturnDialog, { onReturn: this.handleReturnSaleItem, data: {
                            saleItemId: this.props.saleItem.id,
                            saleId: this.props.saleItem.sale.id,
                            itemName: this.props.saleItem.item.name,
                            customerName: this.props.saleItem.sale.customer.name,
                            qty: this.props.saleItem.qty,
                            totalReturnedQty: this.props.saleItem.total_returned_qty,
                            unitPrice: this.props.saleItem.unit_price,
                            returnedItems: this.props.saleItem.return_items
                        } })
                )
            );
        }
    });
})();