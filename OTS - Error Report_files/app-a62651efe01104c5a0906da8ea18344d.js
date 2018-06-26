var SearchProformaApp = SearchProformaApp || {};

(function () {

    var Proforma = SearchProformaApp.Proforma;

    SearchProformaApp.App = React.createClass({
        displayName: "App",

        getInitialState: function () {
            return {
                proformas: [],
                searching: false
            };
        },

        componentWillMount: function () {
            SearchProformaApp.callback = (function (data) {
                if (data.searching) {
                    this.setState({ searching: true });
                } else {
                    this.setState({ searching: false });
                    this.setState({ proformas: data });
                }
            }).bind(this);
        },

        render: function () {

            var proformasResultRow = this.state.proformas.map(function (proforma, index) {
                return React.createElement(Proforma, { key: proforma.id, data: proforma });
            }, this);

            var grandTotal = this.state.proformas.reduce(function (total, proforma) {
                if (proforma.status_upcase !== 'DRAFT') {
                    total += proforma.grand_total;
                }
                return total;
            }, 0);

            var noResultRow = React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { colSpan: "9", className: "center-aligned" },
                    "No Proforma Found for the given criteria."
                )
            );

            var searchingRow = React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { colSpan: "9", className: "center-aligned" },
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
                            "Proforma #"
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
                    this.state.searching ? searchingRow : this.state.proformas.length == 0 ? noResultRow : proformasResultRow
                ),
                React.createElement(
                    "tfoot",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            { className: "grand_total", colSpan: "7" },
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
        var App = SearchProformaApp.App;
        ReactDOM.render(React.createElement(App, null), container[0]);
    }
    $(document).ready(function () {
        if ($('#proformas_search_results').length != 0) {
            render($('#proformas_search_results'));
        }
    });
})();