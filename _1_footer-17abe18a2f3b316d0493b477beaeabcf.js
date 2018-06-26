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
                    { className: "total", colSpan: "7" },
                    React.createElement(
                        "span",
                        null,
                        React.createElement(
                            "b",
                            null,
                            this.props.label,
                            ":"
                        )
                    )
                ),
                React.createElement(
                    "td",
                    { className: "total" },
                    React.createElement(
                        "strong",
                        null,
                        printCurrency(this.props.value)
                    )
                )
            );
        }

    });
})();