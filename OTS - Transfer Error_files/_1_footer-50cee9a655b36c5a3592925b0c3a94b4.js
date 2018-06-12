var app = app || {};

(function () {

    app.SaleItemFooter = React.createClass({
        displayName: "SaleItemFooter",

        render: function () {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { className: "grand_total", colSpan: "5" },
                    React.createElement(
                        "span",
                        null,
                        React.createElement(
                            "b",
                            null,
                            "Grand Total"
                        )
                    )
                ),
                React.createElement(
                    "td",
                    { className: "grand_total" },
                    React.createElement(
                        "strong",
                        null,
                        this.props.grandTotalQty
                    )
                ),
                React.createElement(
                    "td",
                    { className: "grand_total", colSpan: "2" },
                    React.createElement(
                        "strong",
                        null,
                        printCurrency(this.props.grandTotalPrice)
                    )
                )
            );
        }

    });
})();