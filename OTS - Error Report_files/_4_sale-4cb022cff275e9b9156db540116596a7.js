var returnSalesApp = returnSalesApp || {};

(function () {

    var ReturnItem = returnSalesApp.ReturnItem;

    returnSalesApp.Sale = React.createClass({
        displayName: "Sale",

        handleReturnSaleItem: function (returnItem) {
            this.props.onReturn(returnItem);
        },

        render: function () {
            var loadingRow = React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { colSpan: "7", className: "center-aligned" },
                    React.createElement("i", { className: "fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom" })
                )
            );

            var noResultRow = React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { colSpan: "7", className: "center-aligned" },
                    "No Sales Found for the selected Item."
                )
            );

            var resultsRow = this.props.data.map(function (sale_item, index) {
                return React.createElement(ReturnItem, { onReturn: this.handleReturnSaleItem, key: sale_item.id, saleItem: sale_item, index: index + 1 });
            }, this);

            var tHead = React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        "No."
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "div",
                            { className: "field form-group" },
                            "Customer"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "div",
                            { className: "field form-group" },
                            "Item"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "div",
                            { className: "field form-group" },
                            "Sale Order Number"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "div",
                            { className: "field form-group" },
                            "Sale Order Date"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "div",
                            { className: "field form-group" },
                            "Details"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "div",
                            { className: "field form-group" },
                            "Action"
                        )
                    )
                )
            );
            return React.createElement(
                "div",
                { className: "field form-group" },
                React.createElement(
                    "label",
                    null,
                    "Sales With Selected Item and Store"
                ),
                React.createElement(
                    "table",
                    { className: "table-responsive display table table-striped table-bordered" },
                    tHead,
                    React.createElement(
                        "tbody",
                        null,
                        this.props.loading ? loadingRow : this.props.data.length == 0 ? noResultRow : resultsRow
                    )
                )
            );
        }
    });
})();