var ProformaItemApp = ProformaItemApp || {};

(function () {

    ProformaItemApp.ProformaItemFooter = React.createClass({
        displayName: "ProformaItemFooter",

        render: function () {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { className: "total", colSpan: "5" },
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
                    { className: "total", colSpan: "2" },
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