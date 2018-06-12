var searchItemApp = searchItemApp || {};
window.globalSearchItemApp = window.globalSearchItemApp || {};

(function () {

    var Item = searchItemApp.Item;

    var SearchItemApp = React.createClass({
        displayName: "SearchItemApp",

        getInitialState: function () {
            return {
                result: [],
                searching: false,
                params: {},
                lookup: { cars: [], part_classes: [], mades: [], brands: [] },
                config: {}
            };
        },

        getItemLookup: function () {
            var deferred = $.Deferred();
            $.ajax({
                type: "GET",
                url: "/searches/item_lookup/",
                dataType: 'json',
                success: (function (data, response) {
                    deferred.resolve({ context: this, data: data, message: response });
                }).bind(this),
                error: function (err) {
                    deferred.reject({ context: this, err: err, message: 'Error' });
                }
            });
            return deferred.promise();
        },

        getConfig: function () {
            var deferred = $.Deferred();
            $.ajax({
                type: "GET",
                url: "/configs",
                dataType: 'json',
                success: (function (data, response) {
                    deferred.resolve({ context: this, data: data, message: response });
                }).bind(this),
                error: function (err) {
                    deferred.reject({ context: this, err: err, message: 'Error' });
                }
            });
            return deferred.promise();
        },

        componentDidMount: function () {
            this.getItemLookup().done(function (response) {
                var self = response.context;
                self.setState({ lookup: response.data });
            }).fail(function (response) {
                alert("Error While Trying to load lookup" + response);
            });
            this.getConfig().done(function (response) {
                var self = response.context;
                self.setState({ config: response.data });
            }).fail(function (response) {
                alert('Error While Trying to Load Config Values' + response);
            });
        },

        componentWillMount: function () {
            window.globalSearchItemApp.callback = (function (data) {
                this.setState({ result: data });
                this.setState({ searching: false });
            }).bind(this);
        },

        handleSubmit: function (event) {
            this.setState({ searching: true });
        },

        render: function () {

            var selectOptions = function (item, index) {
                return React.createElement(
                    "option",
                    { key: index },
                    item
                );
            };

            var searchForm = React.createElement(
                "form",
                { id: "search_item_form", "data-remote": "true", acceptCharset: "UTF-8", method: "get", action: "/searches/items", onSubmit: this.handleSubmit },
                React.createElement(
                    "div",
                    { className: "container-fluid" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-sm-4" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "name" },
                                    "Name: "
                                ),
                                React.createElement("input", { id: "name", type: "search", results: "5", autosave: "name_search_hs", className: "form-control", name: "name", placeholder: "Item Name" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-sm-2" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "item_number" },
                                    "Item Number: "
                                ),
                                React.createElement("input", { id: "item_number", className: "form-control", name: "item_number", placeholder: "Item Number" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-sm-1" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "item_number" },
                                    "Car Identifier: "
                                ),
                                React.createElement("input", { id: "car_identifier", className: "form-control", name: "car_identifier", placeholder: "Car Identifier" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-sm-2" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "other_numbers" },
                                    "Other Numbers: "
                                ),
                                React.createElement("input", { id: "other_numbers", className: "form-control", name: "other_numbers", placeholder: "Original/Prev/Next Number or Description" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-sm-1" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "other_numbers" },
                                    "Size: "
                                ),
                                React.createElement("input", { id: "size", className: "form-control", name: "size", placeholder: "Size" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-sm-1" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "made" },
                                    "Made: "
                                ),
                                React.createElement("input", { id: "made", name: "made", className: "form-control", list: "mades" }),
                                React.createElement(
                                    "datalist",
                                    { id: "mades" },
                                    this.state.lookup.mades.map(selectOptions)
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-sm-1" },
                            React.createElement(
                                "div",
                                { className: "checkbox" },
                                React.createElement(
                                    "label",
                                    null,
                                    React.createElement("input", { id: "inventory", name: "inventory", type: "checkbox" }),
                                    "Show only Items with Inventory"
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-sm-2" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "car" },
                                    "Car: "
                                ),
                                React.createElement("input", { id: "car", name: "car", className: "form-control", list: "cars" }),
                                React.createElement(
                                    "datalist",
                                    { id: "cars" },
                                    this.state.lookup.cars.map(selectOptions)
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-sm-2" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "brand" },
                                    "Brand: "
                                ),
                                React.createElement("input", { id: "brand", name: "brand", className: "form-control", list: "brands" }),
                                React.createElement(
                                    "datalist",
                                    { id: "brands" },
                                    this.state.lookup.brands.map(selectOptions)
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-sm-2" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "part_class" },
                                    "Part Class: "
                                ),
                                React.createElement("input", { id: "part_class", name: "part_class", className: "form-control", list: "part_classes" }),
                                React.createElement(
                                    "datalist",
                                    { id: "part_classes" },
                                    this.state.lookup.part_classes.map(selectOptions)
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-sm-2" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "sale_price" },
                                    "Sale Price: "
                                ),
                                React.createElement("input", { id: "sale_price", className: "form-control", name: "sale_price", placeholder: "Sale Price" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-sm-2" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "dubai_price" },
                                    "Dubai Price: "
                                ),
                                React.createElement("input", { id: "dubai_price", className: "form-control", name: "dubai_price", placeholder: "Dubai Price" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-sm-2" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "korea_price" },
                                    "Korea Price: "
                                ),
                                React.createElement("input", { id: "korea_price", className: "form-control", name: "korea_price", placeholder: "Korea Price" })
                            )
                        )
                    ),
                    React.createElement(
                        "button",
                        { id: "item-search-button", className: "btn btn-primary btn-block" },
                        "Search"
                    )
                ),
                React.createElement("hr", null)
            );

            var itemsResultRow = this.state.result.map(function (item, index) {
                return React.createElement(Item, { lineNumber: index + 1,
                    key: item.id,
                    data: item,
                    config: this.state.config });
            }, this);

            var noResultRow = React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { colSpan: "17", className: "center-aligned" },
                    "No Items Found."
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
                                { width: "3%", rowSpan: "2" },
                                "ID"
                            ),
                            React.createElement(
                                "th",
                                { rowSpan: "2" },
                                "Name"
                            ),
                            React.createElement(
                                "th",
                                { rowSpan: "2" },
                                "Description"
                            ),
                            React.createElement(
                                "th",
                                { rowSpan: "2" },
                                "Original Number"
                            ),
                            React.createElement(
                                "th",
                                { rowSpan: "2" },
                                "Item Number"
                            ),
                            React.createElement(
                                "th",
                                { rowSpan: "2" },
                                "Prev Number"
                            ),
                            React.createElement(
                                "th",
                                { rowSpan: "2" },
                                "Next Number"
                            ),
                            React.createElement(
                                "th",
                                { width: "4%", rowSpan: "2" },
                                "Car"
                            ),
                            React.createElement(
                                "th",
                                { colSpan: "4", className: "center-aligned" },
                                "Price"
                            ),
                            React.createElement(
                                "th",
                                { width: "12%", rowSpan: "2" },
                                "Stock"
                            ),
                            React.createElement(
                                "th",
                                { width: "9%", rowSpan: "2" },
                                "Order"
                            ),
                            React.createElement(
                                "th",
                                { rowSpan: "2" },
                                "Brand"
                            ),
                            React.createElement(
                                "th",
                                { rowSpan: "2" },
                                "Made"
                            ),
                            React.createElement(
                                "th",
                                { width: "7%", rowSpan: "2" },
                                "Actions"
                            )
                        ),
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "Sale"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Dubai"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Korea"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Cost"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        this.state.searching ? searchingRow : this.state.result.length == 0 ? noResultRow : itemsResultRow
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
        ReactDOM.render(React.createElement(SearchItemApp, null), container[0]);
    }
    $(document).ready(function () {
        if ($('#search-item-app').length != 0) {
            render($('#search-item-app'));
        }
    });
})();