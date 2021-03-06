var app = app || {};

(function () {

    var SaleItemFooter = app.SaleItemFooter;
    var SaleItem = app.SaleItem;

    function clearSearchFields() {
        $('#search_item_id').val('');
    }

    var App = React.createClass({
        displayName: 'App',

        getInitialState: function () {
            return {
                data: [],
                loadingSaleItems: false,
                config: {}
            };
        },

        saveSaleItem: function (saleId, itemId) {
            var deferred = $.Deferred();
            var newSaleItem = {
                sale_item: {
                    sale_id: saleId,
                    item_id: itemId,
                    qty: 1,
                    unit_price: 0
                }
            };
            $.ajax({
                type: "POST",
                url: "/sale_items/",
                data: newSaleItem,
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

        updateSaleItem: function (saleItem) {
            var deferred = $.Deferred();
            var newQtyAndUnitPrice = {
                _method: 'PATCH',
                sale_item: {
                    qty: saleItem.qty,
                    unit_price: saleItem.unit_price
                }
            };
            $.ajax({
                type: "POST",
                url: "/sale_items/" + saleItem.id,
                data: newQtyAndUnitPrice,
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

        destroySaleItem: function (saleItem) {
            var deferred = $.Deferred();
            $.ajax({
                type: "DELETE",
                url: "/sale_items/" + saleItem.id,
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

        getSaleItems: function (saleId) {
            var deferred = $.Deferred();
            this.setState({ loadingSaleItems: true });
            $.ajax({
                type: "GET",
                url: "/sales/" + saleId + "/sale_items/",
                dataType: 'json',
                success: (function (data, response) {
                    deferred.resolve({ context: this, data: data, message: response });
                    this.setState({ loadingSaleItems: false });
                }).bind(this),
                error: function (err) {
                    this.setState({ loadingSaleItems: false });
                    deferred.reject({ context: this, err: err, message: 'Error' });
                }
            });
            return deferred.promise();
        },

        handleSaleItemCreate: function () {
            var itemId = $('#search_item_id').val();
            var saleId = parseInt($('#sale_id').val());
            if (itemId != '') {
                itemId = parseInt(itemId);
                var foundSaleItem = this.state.data.find(function (saleItem) {
                    return saleItem.item.id === itemId;
                });
                if (foundSaleItem) {
                    clearSearchFields();
                    alert('Item Already Exists');
                } else {
                    this.saveSaleItem(saleId, itemId).done(function (response) {
                        var self = response.context;
                        var updatedData = self.state.data.concat([response.data]);
                        self.setState({ data: updatedData });
                    }).fail(function (response) {
                        alert("Error While Trying to Save Sale Item" + response);
                    }).always(clearSearchFields);
                }
            }
        },

        handleSaleItemRemove: function (saleItemToRemove) {
            this.destroySaleItem(saleItemToRemove).done(function (response) {
                var self = response.context;
                var updatedData = self.state.data.filter(function (saleItem) {
                    return saleItem.id != response.data.id;
                });
                self.setState({ data: updatedData });
            });
        },

        handleSaleItemUpdate: function (updatedSaleItem) {
            this.updateSaleItem(updatedSaleItem).done(function (response) {
                var self = response.context;
                var updatedData = self.state.data.map(function (saleItem) {
                    if (saleItem.id === response.data.id) {
                        saleItem.qty = response.data.qty;
                        saleItem.unit_price = response.data.unit_price;
                    }
                    return saleItem;
                });
                self.setState({ data: updatedData });
            });
        },

        componentDidMount: function () {
            var self = this;
            var saleId = $('#sale_id').val();
            bindSearchSelectEvent();
            this.getSaleItems(saleId).done(function (response) {
                var self = response.context;
                self.setState({ data: response.data });
            }).fail(function (response) {
                alert("Error While Trying to Get Sale Item" + response);
            });
            service.config(function (response) {
                self.setState({ config: response });
            });
        },

        render: function () {
            var main;
            var saleItemList = this.state.data;
            var totalPrice = saleItemList.reduce(function (accum, saleItem) {
                var qty = isNaN(saleItem.qty) ? 0 : saleItem.qty;
                var price = isNaN(saleItem.unit_price) ? 0 : saleItem.unit_price;
                return accum + qty * price;
            }, 0);
            var saleItems = saleItemList.map(function (saleItem, index) {
                return React.createElement(SaleItem, {
                    lineNumber: index + 1,
                    key: saleItem.id,
                    saleItemData: saleItem,
                    onItemUpdate: this.handleSaleItemUpdate,
                    onSaleItemRemove: this.handleSaleItemRemove,
                    viewOnly: this.props.viewOnly
                });
            }, this);

            var loadingItems = React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    { colSpan: '7', className: 'center-aligned' },
                    React.createElement('i', { className: 'fa fa-spinner fa-spin fa-3x fa-fw', 'aria-hidden': 'true' }),
                    React.createElement(
                        'span',
                        { className: 'searching' },
                        'Loading . . .'
                    )
                )
            );

            var search = React.createElement(
                'div',
                { id: 'item_search_row', className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-sm-4' },
                    React.createElement(
                        'div',
                        { className: 'field form-group' },
                        React.createElement('input', { id: 'search_item_field',
                            type: 'text',
                            className: 'form-control',
                            'data-autocomplete': '/items/autocomplete_item_sale_order',
                            'data-name-element': '#search_item_id',
                            placeholder: 'Enter item to search. . .',
                            onSelect: this.handleSaleItemCreate }),
                        React.createElement(
                            'div',
                            { className: 'form-group hidden' },
                            React.createElement('input', { type: 'text', id: 'search_item_id' })
                        )
                    )
                )
            );

            main = React.createElement(
                'table',
                { className: 'table-responsive display table table-striped table-bordered' },
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'td',
                            null,
                            'No.'
                        ),
                        React.createElement(
                            'td',
                            null,
                            React.createElement(
                                'div',
                                { className: 'field form-group' },
                                'Item Name'
                            )
                        ),
                        React.createElement(
                            'td',
                            null,
                            React.createElement(
                                'div',
                                { className: 'field form-group' },
                                'Item Number'
                            )
                        ),
                        React.createElement(
                            'td',
                            null,
                            React.createElement(
                                'div',
                                { className: 'field form-group' },
                                'Original Number'
                            )
                        ),
                        React.createElement(
                            'td',
                            null,
                            React.createElement(
                                'div',
                                { className: 'field form-group' },
                                'Brand'
                            )
                        ),
                        React.createElement(
                            'td',
                            { width: '9%' },
                            React.createElement(
                                'div',
                                { className: 'field form-group' },
                                'Qty'
                            )
                        ),
                        React.createElement(
                            'td',
                            { width: '9%' },
                            React.createElement(
                                'div',
                                { className: 'field form-group' },
                                'Unit Price'
                            )
                        ),
                        React.createElement(
                            'td',
                            null,
                            React.createElement(
                                'div',
                                { className: 'field form-group' },
                                'Total Price'
                            )
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    this.state.loadingSaleItems ? loadingItems : saleItems,
                    React.createElement(SaleItemFooter, { label: 'Total', value: totalPrice }),
                    React.createElement(SaleItemFooter, { label: 'VAT(15%)', value: totalPrice * this.state.config.vat_rate }),
                    React.createElement(SaleItemFooter, { label: 'Total With VAT', value: totalPrice * (1 + this.state.config.vat_rate) })
                )
            );

            return React.createElement(
                'div',
                null,
                this.props.viewOnly ? '' : search,
                main
            );
        }
    });

    function render(viewMode, container) {
        ReactDOM.render(React.createElement(App, { viewOnly: viewMode }), container[0]);
    }
    $(document).ready(function () {
        if ($('.sales_item_app').length != 0) {
            render(false, $('.sales_item_app'));
        }
        if ($('.sales_item_show_app').length != 0) {
            render(true, $('.sales_item_show_app'));
        }
    });
})();