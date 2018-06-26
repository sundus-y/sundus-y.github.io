var ProformaItemApp = ProformaItemApp || {};

(function () {

    var ProformaItemFooter = ProformaItemApp.ProformaItemFooter;
    var ProformaItem = ProformaItemApp.ProformaItem;

    function clearSearchFields() {
        $('#search_item_id').val('');
    }

    ProformaItemApp.App = React.createClass({
        displayName: 'App',

        getInitialState: function () {
            return {
                data: [],
                loadingProformaItems: false,
                config: {}
            };
        },

        saveProformaItem: function (proformaId, itemId) {
            var deferred = $.Deferred();
            var newProformaItem = {
                proforma_item: {
                    proforma_id: proformaId,
                    item_id: itemId,
                    qty: 1,
                    unit_price: 0
                }
            };
            $.ajax({
                type: "POST",
                url: "/proforma_items/",
                data: newProformaItem,
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

        updateProformaItem: function (proformaItem) {
            var deferred = $.Deferred();
            var newQtyAndUnitPrice = {
                _method: 'PATCH',
                proforma_item: {
                    qty: proformaItem.qty,
                    unit_price: proformaItem.unit_price
                }
            };
            $.ajax({
                type: "POST",
                url: "/proforma_items/" + proformaItem.id,
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

        destroyProformaItem: function (proformaItem) {
            var deferred = $.Deferred();
            $.ajax({
                type: "DELETE",
                url: "/proforma_items/" + proformaItem.id,
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

        getProformaItems: function (proformaId) {
            var deferred = $.Deferred();
            this.setState({ loadingProformaItems: true });
            $.ajax({
                type: "GET",
                url: "/proformas/" + proformaId + "/proforma_items/",
                dataType: 'json',
                success: (function (data, response) {
                    deferred.resolve({ context: this, data: data, message: response });
                    this.setState({ loadingProformaItems: false });
                }).bind(this),
                error: function (err) {
                    deferred.reject({ context: this, err: err, message: 'Error' });
                    this.setState({ loadingProformaItems: false });
                }
            });
            return deferred.promise();
        },

        handleProformaItemCreate: function () {
            var itemId = $('#search_item_id').val();
            var proformaId = parseInt($('#proforma_id').val());
            if (itemId != '') {
                itemId = parseInt(itemId);
                var foundProformaItem = this.state.data.find(function (proformaItem) {
                    return proformaItem.item.id === itemId;
                });
                if (foundProformaItem) {
                    clearSearchFields();
                    alert('Item Already Exists');
                } else {
                    this.saveProformaItem(proformaId, itemId).done(function (response) {
                        var self = response.context;
                        var updatedData = self.state.data.concat([response.data]);
                        self.setState({ data: updatedData });
                    }).fail(function (response) {
                        alert("Error While Trying to Save Proforma Item" + response);
                    }).always(clearSearchFields);
                }
            }
        },

        handleProformaItemRemove: function (proformaItemToRemove) {
            this.destroyProformaItem(proformaItemToRemove).done(function (response) {
                var self = response.context;
                var updatedData = self.state.data.filter(function (proformaItem) {
                    return proformaItem.id != response.data.id;
                });
                self.setState({ data: updatedData });
            });
        },

        handleProformaItemUpdate: function (updatedProformaItem) {
            this.updateProformaItem(updatedProformaItem).done(function (response) {
                var self = response.context;
                var updatedData = self.state.data.map(function (proformaItem) {
                    if (proformaItem.id === response.data.id) {
                        proformaItem.qty = response.data.qty;
                        proformaItem.unit_price = response.data.unit_price;
                    }
                    return proformaItem;
                });
                self.setState({ data: updatedData });
            });
        },

        componentDidMount: function () {
            var proformaId = $('#proforma_id').val();
            var self = this;
            bindSearchSelectEvent();
            this.getProformaItems(proformaId).done(function (response) {
                var self = response.context;
                self.setState({ data: response.data });
            }).fail(function (response) {
                alert("Error While Trying to Get Proforma Item" + response);
            });
            service.config(function (response) {
                self.setState({ config: response });
            });
        },

        render: function () {
            var main;
            var proformaItemList = this.state.data;
            var totalPrice = proformaItemList.reduce(function (accum, proformaItem) {
                var qty = isNaN(proformaItem.qty) ? 0 : proformaItem.qty;
                var price = isNaN(proformaItem.unit_price) ? 0 : proformaItem.unit_price;
                return accum + qty * price;
            }, 0);
            var proformaItems = proformaItemList.map(function (proformaItem, index) {
                return React.createElement(ProformaItem, {
                    lineNumber: index + 1,
                    key: proformaItem.id,
                    proformaItemData: proformaItem,
                    onItemUpdate: this.handleProformaItemUpdate,
                    onProformaItemRemove: this.handleProformaItemRemove,
                    viewOnly: this.props.viewOnly,
                    hideItemNumber: this.props.hideItemNumber
                });
            }, this);

            var loadingItems = React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    { colSpan: this.props.hideItemNumber ? '5' : '6', className: 'center-aligned' },
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
                            onSelect: this.handleProformaItemCreate }),
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
                            React.createElement(
                                'div',
                                { className: 'field form-group' },
                                'No.'
                            )
                        ),
                        React.createElement(
                            'td',
                            { className: this.props.hideItemNumber ? 'hidden' : '' },
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
                                'Item Name'
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
                            { width: '11%' },
                            React.createElement(
                                'div',
                                { className: 'field form-group' },
                                'Qty'
                            )
                        ),
                        React.createElement(
                            'td',
                            { width: '11%' },
                            React.createElement(
                                'div',
                                { className: 'field form-group' },
                                'Unit Price'
                            )
                        ),
                        React.createElement(
                            'td',
                            { width: '10%' },
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
                    this.state.loadingProformaItems ? loadingItems : proformaItems,
                    React.createElement(ProformaItemFooter, { label: 'Total', value: totalPrice, hideItemNumber: this.props.hideItemNumber }),
                    React.createElement(ProformaItemFooter, { label: 'VAT(15%)', value: totalPrice * this.state.config.vat_rate, hideItemNumber: this.props.hideItemNumber }),
                    React.createElement(ProformaItemFooter, { label: 'Total With VAT', value: totalPrice * (1 + this.state.config.vat_rate), hideItemNumber: this.props.hideItemNumber })
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

    function render(viewMode, hideItemNumber, container) {
        var App = ProformaItemApp.App;
        ReactDOM.render(React.createElement(App, { viewOnly: viewMode, hideItemNumber: hideItemNumber }), container[0]);
    }
    $(document).ready(function () {
        if ($('.proforma_items_app').length != 0) {
            var hide_item_number = $('.proforma_items_app').data('hide_item_number');
            var view_only = $('.proforma_items_app').data('view_only');
            render(view_only, hide_item_number, $('.proforma_items_app'));
        }
    });
})();