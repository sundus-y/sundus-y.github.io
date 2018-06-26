//noinspection JSUnresolvedFunction

var app = app || {};

(function () {

    app.TransferItem = React.createClass({
        displayName: "TransferItem",

        handleQtyChange: function (event) {
            var updatedTransferItem = this.props.transferItemData;
            var qty = parseInt(event.target.value);
            updatedTransferItem.qty = qty ? qty : 0;
            this.props.onItemUpdate(updatedTransferItem);
        },

        handleLocationChange: function (event) {
            var updatedTransferItem = this.props.transferItemData;
            updatedTransferItem.location = event.target.value;
            this.props.onItemUpdate(updatedTransferItem);
        },

        handleTransferItemRemove: function (event) {
            this.props.onTransferItemRemove(this.props.transferItemData);
        },

        render: function () {
            var qty = isNaN(this.props.transferItemData.qty) ? 0 : this.props.transferItemData.qty;
            var price = isNaN(this.props.transferItemData.unit_price) ? this.props.transferItemData.item.sale_price : this.props.transferItemData.unit_price;
            var totalPrice = qty * price;

            var deleteButton = React.createElement("span", { className: "fa fa-trash btn btn-danger",
                onClick: this.handleTransferItemRemove });
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group" },
                        this.props.viewOnly ? '' : deleteButton,
                        React.createElement(
                            "span",
                            { className: "line_number  " + this.props.transferItemData.status + "_item" },
                            this.props.lineNumber
                        )
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group " + this.props.transferItemData.status + "_item" },
                        this.props.transferItemData.item.name
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group item_number_focus " + this.props.transferItemData.status + "_item" },
                        this.props.transferItemData.item.item_number
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group " + this.props.transferItemData.status + "_item" },
                        this.props.transferItemData.item.original_number
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group " + this.props.transferItemData.status + "_item" },
                        this.props.transferItemData.item.description
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group" },
                        React.createElement("input", { className: "form-control " + this.props.transferItemData.status + "_item",
                            defaultValue: this.props.transferItemData.location,
                            onBlur: this.handleLocationChange,
                            required: true,
                            disabled: this.props.viewOnly })
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group" },
                        React.createElement("input", { className: "form-control right-align " + this.props.transferItemData.status + "_item",
                            defaultValue: this.props.transferItemData.qty,
                            onBlur: this.handleQtyChange,
                            required: true,
                            type: "number",
                            step: "any",
                            min: "1",
                            disabled: this.props.viewOnly })
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group" },
                        React.createElement("input", { className: "form-control right-align " + this.props.transferItemData.status + "_item",
                            defaultValue: this.props.transferItemData.item.sale_price,
                            onBlur: this.handleUnitPriceChange,
                            disabled: true })
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group right-align " + this.props.transferItemData.status + "_item" },
                        totalPrice.toFixed(2)
                    )
                )
            );
        }
    });
})();