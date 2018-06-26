var returnSalesApp = returnSalesApp || {};

(function () {

    returnSalesApp.ReturnDialog = React.createClass({
        displayName: 'ReturnDialog',

        getInitialState: function () {
            return {
                showModal: false
            };
        },

        setStateValues: function (data) {
            this.setState({ qty: data.qty - data.totalReturnedQty });
            this.setState({ unitPrice: data.unitPrice });
            this.setState({ totalPrice: (data.qty * data.unitPrice).toFixed(2) });
            this.setState({ returnableQty: data.qty - data.totalReturnedQty });
            if (data.qty === data.totalReturnedQty) {
                this.setState({ returnLabel: ' View Returns' });
            } else {
                this.setState({ returnLabel: ' Return Sale' });
            }
        },

        close: function (event) {
            if (event !== undefined) {
                var action = $(event.target).attr('action');
                if (action === "return") {
                    var returnItem = { qty: this.state.qty,
                        sale_item_id: this.props.data.saleItemId,
                        note: this.state.note
                    };
                    this.props.onReturn(returnItem);
                }
            }
            this.setState({ showModal: false });
        },

        open: function () {
            this.setState({ showModal: true });
        },

        handleQtyChange: function (event) {
            this.setState({ qty: parseInt(event.target.value) });
            this.setState({ totalPrice: (parseInt(event.target.value) * this.state.unitPrice).toFixed(2) });
        },

        handleNoteChange: function (event) {
            this.setState({ note: $(event.target).val() });
        },

        componentDidMount: function () {
            this.setStateValues(this.props.data);
        },

        componentWillReceiveProps: function (props) {
            this.setStateValues(props.data);
        },

        render: function () {
            var qtyOptions = [];
            for (var i = 1; i <= this.state.returnableQty; i++) {
                qtyOptions.push(React.createElement(
                    'option',
                    { key: i - 1, value: i },
                    i
                ));
            }

            var returnedItemRows = this.props.data.returnedItems.map(function (returnedItem, index) {
                return React.createElement(
                    'tr',
                    { key: returnedItem.id },
                    React.createElement(
                        'td',
                        null,
                        returnedItem.id
                    ),
                    React.createElement(
                        'td',
                        null,
                        returnedItem.qty
                    ),
                    React.createElement(
                        'td',
                        null,
                        returnedItem.note
                    ),
                    React.createElement(
                        'td',
                        null,
                        returnedItem.created_at
                    )
                );
            }, this);

            var returnedItemsHead = React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'td',
                        null,
                        'Id.'
                    ),
                    React.createElement(
                        'td',
                        null,
                        'Qty'
                    ),
                    React.createElement(
                        'td',
                        null,
                        'Note'
                    ),
                    React.createElement(
                        'td',
                        null,
                        'Date'
                    )
                )
            );

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'a',
                    { onClick: this.open, href: '#', className: 'btn btn-sm btn-danger fa fa-undo' },
                    this.state.returnLabel
                ),
                React.createElement(
                    ReactBootstrap.Modal,
                    { show: this.state.showModal || this.props.show, onHide: this.close },
                    React.createElement(
                        ReactBootstrap.Modal.Header,
                        { closeButton: true },
                        React.createElement(
                            ReactBootstrap.Modal.Title,
                            null,
                            'Return Item'
                        )
                    ),
                    React.createElement(
                        ReactBootstrap.Modal.Body,
                        null,
                        React.createElement(
                            'div',
                            { className: this.state.returnLabel === ' Return Sale' ? '' : 'hidden' },
                            React.createElement(
                                'p',
                                null,
                                'Are you sure you want to return ',
                                React.createElement(
                                    'b',
                                    null,
                                    this.props.data.itemName,
                                    ' '
                                ),
                                'from sale ',
                                React.createElement(
                                    'b',
                                    null,
                                    '#',
                                    this.props.data.saleId
                                ),
                                ' of customer ',
                                React.createElement(
                                    'b',
                                    null,
                                    this.props.data.customerName
                                ),
                                ' ?'
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-sm-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'field form-group' },
                                        'Qunatity: ',
                                        React.createElement(
                                            'select',
                                            { className: 'form-control',
                                                defaultValue: this.state.returnableQty,
                                                onChange: this.handleQtyChange },
                                            qtyOptions
                                        ),
                                        ' ',
                                        React.createElement('br', null)
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-sm-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'field form-group' },
                                        'Unit Price: ',
                                        React.createElement('input', { defaultValue: this.state.unitPrice, disabled: 'true', className: 'form-control' }),
                                        ' ',
                                        React.createElement('br', null)
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'field form-group' },
                                        'Total Price: ',
                                        React.createElement('input', { value: this.state.totalPrice, disabled: 'true', className: 'form-control' }),
                                        ' ',
                                        React.createElement('br', null)
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-sm-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'field form-group' },
                                        'Note: ',
                                        React.createElement('textarea', { rows: '5', className: 'form-control', placeholder: 'Please type reason for return.', onChange: this.handleNoteChange })
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'h4',
                            null,
                            'Already Returned Items'
                        ),
                        React.createElement('hr', null),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-sm-12' },
                                React.createElement(
                                    'table',
                                    { className: 'table-responsive display table table-striped table-bordered' },
                                    returnedItemsHead,
                                    React.createElement(
                                        'tbody',
                                        null,
                                        returnedItemRows
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        ReactBootstrap.Modal.Footer,
                        null,
                        this.state.returnLabel === ' Return Sale' ? React.createElement(
                            'a',
                            { href: '#', className: 'btn btn-sm btn-danger fa fa-undo', action: 'return', onClick: this.close },
                            ' Return'
                        ) : '',
                        React.createElement(
                            'a',
                            { href: '#', className: 'btn btn-sm btn-info fa fa-times', action: 'cancel', onClick: this.close },
                            ' Cancel'
                        )
                    )
                )
            );
        }
    });
})();