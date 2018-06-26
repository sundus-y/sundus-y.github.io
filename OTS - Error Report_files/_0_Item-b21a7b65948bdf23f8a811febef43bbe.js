var searchItemApp = searchItemApp || {};

(function () {

    searchItemApp.Item = React.createClass({
        displayName: "Item",

        cal_dubai_price: function () {
            if (this.props.data.dubai_price) {
                return this.props.data.dubai_price * this.props.config.dubai_rate;
            } else {
                return 0;
            }
        },

        cal_korea_price: function () {
            if (this.props.data.korea_price) {
                return this.props.data.korea_price * this.props.config.korea_rate;
            } else {
                return 0;
            }
        },

        cal_cost_price: function () {
            if (this.props.data.cost_price) {
                return this.props.data.cost_price;
            } else {
                return 0;
            }
        },

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
                    this.props.data.description
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.data.original_number
                ),
                React.createElement(
                    "td",
                    { className: "item_number_focus" },
                    this.props.data.item_number
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.data.prev_number
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.data.next_number
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.data.car
                ),
                React.createElement(
                    "td",
                    { className: this.props.data.default_sale_price ? "right-align default_sale_price" : "right-align" },
                    Math.round(this.props.data.sale_price).toLocaleString()
                ),
                React.createElement(
                    "td",
                    { className: "right-align" },
                    printCurrency(this.cal_dubai_price())
                ),
                React.createElement(
                    "td",
                    { className: "right-align" },
                    printCurrency(this.cal_korea_price())
                ),
                React.createElement(
                    "td",
                    { className: "right-align" },
                    printCurrency(this.cal_cost_price())
                ),
                React.createElement("td", { dangerouslySetInnerHTML: { __html: this.props.data.inventories_display } }),
                React.createElement("td", { dangerouslySetInnerHTML: { __html: this.props.data.proforma_display } }),
                React.createElement("td", { dangerouslySetInnerHTML: { __html: this.props.data.order_display } }),
                React.createElement(
                    "td",
                    null,
                    this.props.data.brand
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.data.made
                ),
                React.createElement("td", { dangerouslySetInnerHTML: { __html: this.props.data.actions } })
            );
        }
    });
})();