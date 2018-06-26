var ProformaItemApp = ProformaItemApp || {};

(function () {

    ProformaItemApp.ProformaItemFooter = React.createClass({
        displayName: 'ProformaItemFooter',

        render: function () {
            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    { className: 'total', colSpan: this.props.hideItemNumber ? '5' : '6' },
                    React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            this.props.label,
                            ':'
                        )
                    )
                ),
                React.createElement(
                    'td',
                    { className: 'total' },
                    React.createElement(
                        'strong',
                        null,
                        printCurrency(this.props.value)
                    )
                )
            );
        }

    });
})();