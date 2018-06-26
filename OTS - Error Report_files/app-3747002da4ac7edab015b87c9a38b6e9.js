var searchSaleApp = searchSaleApp || {};
window.globalSearchSaleApp = window.globalSearchSaleApp || {};

(function () {

    var Sale = searchSaleApp.Sale;

    var SearchSaleApp = React.createClass({
        displayName: "SearchSaleApp",

        getInitialState: function () {
            return {
                sales: [],
                searching: false
            };
        },

        componentWillMount: function () {
            window.globalSearchSaleApp.callback = (function (data) {
                if (data.searching) {
                    this.setState({ searching: true });
                } else {
                    this.setState({ searching: false });
                    this.setState({ sales: data });
                }
            }).bind(this);
        },

        render: function () {

            var salesResultRow = this.state.sales.map(function (sale, index) {
                return React.createElement(Sale, { key: sale.id, data: sale });
            }, this);

            var grandTotal = this.state.sales.reduce(function (total, sale) {
                if (sale.status_upcase !== 'DRAFT') {
                    total += sale.grand_total;
                }
                return total;
            }, 0);

            var noResultRow = React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { colSpan: "10", className: "center-aligned" },
                    "No Sales Found for the given criteria."
                )
            );

            var searchingRow = React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { colSpan: "10", className: "center-aligned" },
                    React.createElement("i", { className: "fa fa-spinner fa-spin fa-3x fa-fw", "aria-hidden": "true" }),
                    React.createElement(
                        "span",
                        { className: "searching" },
                        "Loading . . ."
                    )
                )
            );

            return React.createElement(
                "table",
                { className: "table-responsive display table table-striped table-bordered" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { width: "13%" },
                            "Sales Order #"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "FS #"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Customer"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Store"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Created At"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Updated At"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Sold At"
                        ),
                        React.createElement(
                            "th",
                            { width: "5%" },
                            "Status"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Grand Total"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Actions"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.state.searching ? searchingRow : this.state.sales.length == 0 ? noResultRow : salesResultRow
                ),
                React.createElement(
                    "tfoot",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            { className: "grand_total", colSpan: "8" },
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
                                printCurrency(grandTotal)
                            )
                        ),
                        React.createElement("td", null)
                    )
                )
            );
        }
    });

    function render(container) {
        ReactDOM.render(React.createElement(SearchSaleApp, null), container[0]);
    }
    $(document).ready(function () {
        if ($('#sales_search_results').length != 0) {
            render($('#sales_search_results'));
        }
    });
})();