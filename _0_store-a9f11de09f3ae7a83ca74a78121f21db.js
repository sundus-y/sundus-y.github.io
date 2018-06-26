var returnSalesApp = returnSalesApp || {};

(function () {

    returnSalesApp.Store = React.createClass({
        displayName: "Store",

        handleStoreSelect: function (event) {
            this.props.onStoreSelect(event.target.selectedOptions[0].value);
        },

        render: function () {
            var stores = this.props.data;
            var selectOptions = stores.map(function (store, index) {
                return React.createElement(
                    "option",
                    { key: store.id, value: store.id },
                    store.name
                );
            }, this);

            return React.createElement(
                "div",
                { className: "col-sm-3" },
                React.createElement(
                    "div",
                    { className: "field form-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "store" },
                        "Store"
                    ),
                    React.createElement(
                        "select",
                        { id: "store", className: "form-control", onChange: this.handleStoreSelect },
                        selectOptions
                    )
                )
            );
        }
    });
})();