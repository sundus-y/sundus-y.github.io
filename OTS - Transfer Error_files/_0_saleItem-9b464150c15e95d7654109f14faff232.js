//noinspection JSUnresolvedFunction

var app = app || {};

(function () {

    app.SaleItem = React.createClass({
        displayName: "SaleItem",

        handleQtyChange: function (event) {
            var updatedSaleItem = this.props.saleItemData;
            var qty = parseInt(event.target.value);
            updatedSaleItem.qty = qty ? qty : 0;
            this.props.onItemUpdate(updatedSaleItem);
        },

        handleUnitPriceChange: function (event) {
            var updatedSaleItem = this.props.saleItemData;
            var unitPirce = parseFloat(event.target.value);
            updatedSaleItem.unit_price = unitPirce ? unitPirce : 0.0;
            this.props.onItemUpdate(updatedSaleItem);
        },

        handleSaleItemRemove: function (event) {
            this.props.onSaleItemRemove(this.props.saleItemData);
        },

        componentDidMount: function () {
            var last_input = $($('input.focus')[0]);
            last_input.focus().val(last_input.val()).select();
        },

        render: function () {
            var qty = isNaN(this.props.saleItemData.qty) ? 0 : this.props.saleItemData.qty;
            var price = isNaN(this.props.saleItemData.unit_price) ? 0 : this.props.saleItemData.unit_price;
            var totalPrice = qty * price;

            var deleteButton = React.createElement("span", { className: "fa fa-trash btn btn-danger",
                onClick: this.handleSaleItemRemove });
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
                            { className: "line_number  " + this.props.saleItemData.status + "_item" },
                            this.props.lineNumber
                        )
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group " + this.props.saleItemData.status + "_item" },
                        this.props.saleItemData.item.name
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group " + this.props.saleItemData.status + "_item" },
                        this.props.saleItemData.item.item_number
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group " + this.props.saleItemData.status + "_item" },
                        this.props.saleItemData.item.original_number
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group " + this.props.saleItemData.status + "_item" },
                        this.props.saleItemData.item.brand
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group" },
                        React.createElement("input", { className: "form-control right-align focus " + this.props.saleItemData.status + "_item",
                            defaultValue: this.props.saleItemData.qty,
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
                        React.createElement("input", { className: "form-control right-align " + this.props.saleItemData.status + "_item",
                            defaultValue: this.props.saleItemData.unit_price,
                            onBlur: this.handleUnitPriceChange,
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
                        { className: "field form-group right-align " + this.props.saleItemData.status + "_item" },
                        printCurrency(totalPrice)
                    )
                )
            );
        }
    });
})();