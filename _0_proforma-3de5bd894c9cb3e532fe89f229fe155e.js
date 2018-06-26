var SearchProformaApp = SearchProformaApp || {};

(function () {

    SearchProformaApp.Proforma = React.createClass({
        displayName: 'Proforma',

        render: function () {
            var edit_action = React.createElement(
                'li',
                null,
                React.createElement(
                    'a',
                    { className: 'btn btn-primary item-pop-up-menu', href: '/proformas/' + this.props.data.id + '/edit' },
                    React.createElement('i', { className: 'fa fa-edit' }),
                    ' Edit'
                )
            );

            var print_action = React.createElement(
                'li',
                null,
                React.createElement(
                    'a',
                    { className: 'btn btn-primary item-pop-up-menu', href: '/proformas/' + this.props.data.id + '/print', target: '_blank' },
                    React.createElement('i', { className: 'fa fa-print' }),
                    ' Print'
                )
            );

            var submit_action = React.createElement(
                'li',
                null,
                React.createElement(
                    'a',
                    { className: 'btn btn-success item-pop-up-menu', href: '/proformas/' + this.props.data.id + '/submit_to_submitted', 'data-method': 'POST' },
                    React.createElement('i', { className: 'fa fa-send' }),
                    ' Submit'
                )
            );

            var mark_as_sold_action = React.createElement(
                'li',
                null,
                React.createElement(
                    'a',
                    { className: 'btn btn-success item-pop-up-menu', 'data-toggle': 'modal', 'data-target': '#confirm_proforma_mark_as_sold_' + this.props.data.id + '' },
                    React.createElement('i', { className: 'fa fa-send' }),
                    ' Mark as Sold'
                )
            );

            var delete_action = React.createElement(
                'li',
                null,
                React.createElement(
                    'a',
                    { className: 'btn btn-danger item-pop-up-menu', 'data-toggle': 'modal', 'data-target': '#confirm_proforma_delete_' + this.props.data.id + '' },
                    React.createElement('i', { className: 'fa fa-trash' }),
                    ' Delete'
                )
            );

            var delete_action_confirm = React.createElement(
                'div',
                { className: 'modal fade', 'data-duplicate': 'true', id: 'confirm_proforma_delete_' + this.props.data.id + '' },
                React.createElement(
                    'div',
                    { className: 'modal-dialog' },
                    React.createElement(
                        'div',
                        { className: 'modal-content' },
                        React.createElement(
                            'div',
                            { className: 'modal-header' },
                            React.createElement(
                                'button',
                                { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                                React.createElement(
                                    'span',
                                    { 'aria-hidden': 'true' },
                                    '×'
                                )
                            ),
                            React.createElement(
                                'h4',
                                { className: 'modal-title' },
                                'Warning'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'modal-body center-aligned' },
                            'This proforma contains ',
                            React.createElement(
                                'b',
                                null,
                                this.props.data.proforma_items_count
                            ),
                            ' proforma items.',
                            React.createElement('br', null),
                            'Are you sure you want to delete ',
                            React.createElement(
                                'b',
                                null,
                                'Proforma # ',
                                this.props.data.transaction_num
                            ),
                            '?'
                        ),
                        React.createElement(
                            'div',
                            { className: 'modal-footer' },
                            React.createElement(
                                'a',
                                { className: 'btn btn-info', 'data-dismiss': 'modal', 'data-remote': 'true', rel: 'nofollow', 'data-method': 'delete', href: '/proformas/' + this.props.data.id + '' },
                                'Yes'
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', className: 'btn btn-info', 'data-dismiss': 'modal' },
                                'No'
                            )
                        )
                    )
                )
            );

            var mark_as_sold_action_confirm = React.createElement(
                'div',
                { className: 'modal fade', 'data-duplicate': 'true', id: 'confirm_proforma_mark_as_sold_' + this.props.data.id + '' },
                React.createElement(
                    'div',
                    { className: 'modal-dialog' },
                    React.createElement(
                        'div',
                        { className: 'modal-content' },
                        React.createElement(
                            'div',
                            { className: 'modal-header' },
                            React.createElement(
                                'button',
                                { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                                React.createElement(
                                    'span',
                                    { 'aria-hidden': 'true' },
                                    '×'
                                )
                            ),
                            React.createElement(
                                'h4',
                                { className: 'modal-title' },
                                'Warning'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'modal-body center-aligned' },
                            'Marking this proforma as sold will create a new Sales Order.',
                            React.createElement('br', null),
                            'Are you sure you want to mark this ',
                            React.createElement(
                                'b',
                                null,
                                'Proforma # ',
                                this.props.data.transaction_num
                            ),
                            ' as sold?'
                        ),
                        React.createElement(
                            'div',
                            { className: 'modal-footer' },
                            React.createElement(
                                'a',
                                { className: 'btn btn-info', 'data-dismiss': 'modal', rel: 'nofollow', 'data-method': 'POST', href: '/proformas/' + this.props.data.id + '/mark_as_sold' },
                                'Yes'
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', className: 'btn btn-info', 'data-dismiss': 'modal' },
                                'No'
                            )
                        )
                    )
                )
            );

            return React.createElement(
                'tr',
                { 'data-id': this.props.data.id, className: this.props.data.status_upcase },
                React.createElement(
                    'td',
                    null,
                    this.props.data.transaction_num
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.data.customer.name
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.data.store.name
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.data.formatted_created_at
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.data.formatted_updated_at
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.data.formatted_sold_at
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        'span',
                        { className: 'badge' },
                        this.props.data.status_upcase
                    )
                ),
                React.createElement(
                    'td',
                    { className: 'right-align' },
                    printCurrency(this.props.data.grand_total)
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        'div',
                        { className: 'btn-group' },
                        React.createElement(
                            'a',
                            { className: 'btn btn-sm btn-primary dropdown-toggle', 'data-toggle': 'dropdown', href: '#' },
                            'Actions ',
                            React.createElement('span', { className: 'fa fa-caret-down' })
                        ),
                        React.createElement(
                            'ul',
                            { className: 'dropdown-menu context-menu' },
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'a',
                                    { className: 'btn btn-primary item-pop-up-menu', href: '/proformas/' + this.props.data.id + '' },
                                    React.createElement('i', { className: 'fa fa-folder-open' }),
                                    ' Open'
                                )
                            ),
                            this.props.data.can_edit ? edit_action : '',
                            this.props.data.can_submit ? submit_action : '',
                            this.props.data.can_mark_as_sold ? mark_as_sold_action : '',
                            this.props.data.can_print ? print_action : '',
                            this.props.data.can_delete ? delete_action : ''
                        )
                    ),
                    this.props.data.can_delete ? delete_action_confirm : '',
                    this.props.data.can_mark_as_sold ? mark_as_sold_action_confirm : ''
                )
            );
        }
    });
})();