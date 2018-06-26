var searchTransferApp = searchTransferApp || {};
window.globalSearchTransferApp = window.globalSearchTransferApp || {};

(function () {

    var Transfer = searchTransferApp.Transfer;

    var SearchTransferApp = React.createClass({
        displayName: "SearchTransferApp",

        getInitialState: function () {
            return {
                transfers: []
            };
        },

        componentWillMount: function () {
            window.globalSearchTransferApp.callback = (function (data) {
                this.setState({ transfers: data });
            }).bind(this);
        },

        render: function () {

            var transfersResultRow = this.state.transfers.map(function (transfer, index) {
                return React.createElement(Transfer, { key: transfer.id, data: transfer });
            }, this);

            var noResultRow = React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { colSpan: "9", className: "center-aligned" },
                    "No Transfers Found for the given criteria."
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
                            { width: "6%" },
                            "Tran #"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "From Store"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Sender"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "To Store"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Receiver"
                        ),
                        React.createElement(
                            "th",
                            { width: "5%" },
                            "Status"
                        ),
                        React.createElement(
                            "th",
                            { width: "8%" },
                            "Total ",
                            React.createElement("br", null),
                            "Item Type"
                        ),
                        React.createElement(
                            "th",
                            { width: "8%" },
                            "Total ",
                            React.createElement("br", null),
                            "Item Qty"
                        ),
                        React.createElement(
                            "th",
                            { width: "7%" },
                            "Actions"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.state.transfers.length == 0 ? noResultRow : transfersResultRow
                )
            );
        }
    });

    function render(container) {
        ReactDOM.render(React.createElement(SearchTransferApp, null), container[0]);
    }
    $(document).ready(function () {
        if ($('#transfers_search_results').length != 0) {
            render($('#transfers_search_results'));
        }
    });
})();