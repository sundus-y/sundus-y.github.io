var searchCustomerApp = searchCustomerApp || {};
window.globalSearchCustomerApp = window.globalSearchCustomerApp || {};

(function () {

    var Customer = searchCustomerApp.Customer;

    var SearchCustomerApp = React.createClass({
        displayName: "SearchCustomerApp",

        getInitialState: function () {
            return {
                result: [],
                searching: false,
                params: {}
            };
        },

        componentWillMount: function () {
            window.globalSearchCustomerApp.callback = (function (data) {
                this.setState({ result: data });
                this.setState({ searching: false });
            }).bind(this);
        },

        handleSubmit: function (event) {
            this.setState({ searching: true });
        },

        render: function () {

            var searchForm = React.createElement(
                "form",
                { id: "search_customer_form", "data-remote": "true", acceptCharset: "UTF-8", method: "get", action: "/searches/customers", onSubmit: this.handleSubmit },
                React.createElement(
                    "div",
                    { className: "container-fluid" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-sm-3" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "name" },
                                    "Customer Name: "
                                ),
                                React.createElement("input", { id: "name", type: "search", className: "form-control", name: "name", placeholder: "Customer Name" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-sm-3" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "name" },
                                    "Company: "
                                ),
                                React.createElement("input", { id: "company", type: "search", className: "form-control", name: "company", placeholder: "Company" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-sm-3" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "phone" },
                                    "Phone Numbers: "
                                ),
                                React.createElement("input", { id: "phone", className: "form-control", name: "phone", placeholder: "Phone Number" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-sm-3" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "tin_no" },
                                    "TIN No: "
                                ),
                                React.createElement("input", { id: "tin_no", className: "form-control", name: "tin_no", placeholder: "TIN No" })
                            )
                        )
                    ),
                    React.createElement(
                        "button",
                        { id: "customer-search-button", className: "btn btn-primary btn-block" },
                        "Search"
                    )
                ),
                React.createElement("hr", null)
            );

            var customersResultRow = this.state.result.map(function (customer, index) {
                return React.createElement(Customer, { lineNumber: index + 1,
                    key: customer.id,
                    data: customer });
            }, this);

            var noResultRow = React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { colSpan: "17", className: "center-aligned" },
                    "No Customers Found."
                )
            );

            var searchingRow = React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { colSpan: "17", className: "center-aligned" },
                    React.createElement("i", { className: "fa fa-spinner fa-spin fa-3x fa-fw", "aria-hidden": "true" }),
                    React.createElement(
                        "span",
                        { className: "searching" },
                        "Loading . . ."
                    )
                )
            );

            var searchResult = React.createElement(
                "div",
                { className: "table-container" },
                React.createElement(
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
                                null,
                                "ID"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Name"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Company"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Phone Number"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "TIN No"
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
                        this.state.searching ? searchingRow : this.state.result.length == 0 ? noResultRow : customersResultRow
                    )
                )
            );

            return React.createElement(
                "div",
                null,
                searchForm,
                searchResult
            );
        }
    });

    function render(container) {
        ReactDOM.render(React.createElement(SearchCustomerApp, null), container[0]);
    }
    $(document).ready(function () {
        if ($('#search-customer-app').length != 0) {
            render($('#search-customer-app'));
        }
    });
})();