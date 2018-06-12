var ProformaItemApp = ProformaItemApp || {};

(function () {

    ProformaItemApp.ProformaItem = React.createClass({
        displayName: "ProformaItem",

        handleQtyChange: function (event) {
            var updatedProformaItem = this.props.proformaItemData;
            var qty = parseInt(event.target.value);
            updatedProformaItem.qty = qty ? qty : 0;
            this.props.onItemUpdate(updatedProformaItem);
        },

        handleUnitPriceChange: function (event) {
            var updatedProformaItem = this.props.proformaItemData;
            var unitPirce = parseFloat(event.target.value);
            updatedProformaItem.unit_price = unitPirce ? unitPirce : 0.0;
            this.props.onItemUpdate(updatedProformaItem);
        },

        handleProformaItemRemove: function (event) {
            this.props.onProformaItemRemove(this.props.proformaItemData);
        },

        componentDidMount: function () {
            var last_input = $('input.focus').last();
            last_input.focus().val(last_input.val()).select();
        },

        render: function () {
            var qty = isNaN(this.props.proformaItemData.qty) ? 0 : this.props.proformaItemData.qty;
            var price = isNaN(this.props.proformaItemData.unit_price) ? 0 : this.props.proformaItemData.unit_price;
            var totalPrice = qty * price;

            var deleteButton = React.createElement("span", { className: "fa fa-trash btn btn-danger",
                onClick: this.handleProformaItemRemove });
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
                            { className: "line_number  " + this.props.proformaItemData.status + "_item" },
                            this.props.lineNumber
                        )
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group " + this.props.proformaItemData.status + "_item" },
                        this.props.proformaItemData.item.item_number
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group " + this.props.proformaItemData.status + "_item" },
                        this.props.proformaItemData.item.name
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group " + this.props.proformaItemData.status + "_item" },
                        this.props.proformaItemData.item.brand
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "field form-group" },
                        React.createElement("input", { className: "form-control right-align focus " + this.props.proformaItemData.status + "_item",
                            defaultValue: this.props.proformaItemData.qty,
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
                        React.createElement("input", { className: "form-control right-align " + this.props.proformaItemData.status + "_item",
                            defaultValue: this.props.proformaItemData.unit_price,
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
                        { className: "field form-group right-align " + this.props.proformaItemData.status + "_item" },
                        printCurrency(totalPrice)
                    )
                )
            );
        }
    });
})();