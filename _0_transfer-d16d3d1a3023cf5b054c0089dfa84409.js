var searchTransferApp = searchTransferApp || {};

(function () {

    searchTransferApp.Transfer = React.createClass({
        displayName: 'Transfer',

        render: function () {
            var edit_action = React.createElement(
                'li',
                null,
                React.createElement(
                    'a',
                    { className: 'btn-primary item-pop-up-menu', href: '/transfers/' + this.props.data.id + '/edit' },
                    React.createElement('i', { className: 'fa fa-edit' }),
                    ' Edit'
                )
            );

            var transfer_action = React.createElement(
                'li',
                null,
                React.createElement(
                    'a',
                    { className: 'btn-primary item-pop-up-menu', href: '/transfers/' + this.props.data.id + '/submit', 'data-method': 'POST' },
                    React.createElement('i', { className: 'fa fa-exchange' }),
                    ' Transfer'
                )
            );

            var receive_action = React.createElement(
                'li',
                null,
                React.createElement(
                    'a',
                    { className: 'btn-primary item-pop-up-menu', href: '/transfers/' + this.props.data.id + '/receive', 'data-method': 'POST' },
                    React.createElement('i', { className: 'fa fa-exchange' }),
                    ' Receive'
                )
            );

            var delete_action = React.createElement(
                'li',
                null,
                React.createElement(
                    'a',
                    { className: 'btn-danger item-pop-up-menu', 'data-toggle': 'modal', href: '#', 'data-target': '#confirm_transfer_delete_' + this.props.data.id + '' },
                    React.createElement('i', { className: 'fa fa-trash' }),
                    ' Delete'
                )
            );

            var delete_action_confirm = React.createElement(
                'div',
                { className: 'modal fade', 'data-duplicate': 'true', id: 'confirm_transfer_delete_' + this.props.data.id + '' },
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
                            { className: 'modal-body' },
                            'This transfer contains ',
                            React.createElement(
                                'b',
                                null,
                                this.props.data.transfer_items_count
                            ),
                            ' transfer items.',
                            React.createElement('br', null),
                            'Are you sure you want to delete ',
                            React.createElement(
                                'b',
                                null,
                                'Transfer #',
                                this.props.data.id
                            ),
                            '?'
                        ),
                        React.createElement(
                            'div',
                            { className: 'modal-footer' },
                            React.createElement(
                                'a',
                                { className: 'btn btn-info', 'data-dismiss': 'modal', 'data-remote': 'true', rel: 'nofollow', 'data-method': 'delete', href: '/transfers/' + this.props.data.id },
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
                { 'data-id': this.props.data.id },
                React.createElement(
                    'td',
                    null,
                    this.props.data.id
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.data.from_store.name
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.data.sender ? this.props.data.sender.name : 'NA'
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.data.to_store.name
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.data.receiver ? this.props.data.receiver.name : 'NA'
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
                    this.props.data.transfer_items_count
                ),
                React.createElement(
                    'td',
                    { className: 'right-align' },
                    this.props.data.transfer_total_items_count
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
                                    { className: 'btn-primary item-pop-up-menu', href: '/transfers/' + this.props.data.id + '' },
                                    React.createElement('i', { className: 'fa fa-folder-open' }),
                                    ' Open'
                                )
                            ),
                            this.props.data.can_edit ? edit_action : '',
                            this.props.data.can_transfer ? transfer_action : '',
                            this.props.data.can_receive ? receive_action : '',
                            this.props.data.can_delete ? '' : ''
                        )
                    ),
                    this.props.data.can_delete ? delete_action_confirm : ''
                )
            );
        }
    });
})();