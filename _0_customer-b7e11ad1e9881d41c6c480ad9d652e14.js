var searchCustomerApp = searchCustomerApp || {};

(function () {

    searchCustomerApp.Customer = React.createClass({
        displayName: "Customer",

        render: function () {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    this.props.lineNumber
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.data.name
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.data.company
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.data.phone
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.data.tin_no
                ),
                React.createElement("td", { dangerouslySetInnerHTML: { __html: this.props.data.actions } })
            );
        }
    });
})();