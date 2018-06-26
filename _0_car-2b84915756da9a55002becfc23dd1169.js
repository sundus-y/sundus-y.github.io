//noinspection JSUnresolvedFunction

var CustomerCarApp = CustomerCarApp || {};

(function () {

    CustomerCarApp.Car = React.createClass({
        displayName: 'Car',

        handleCarRemove: function (event) {
            this.props.onCarRemove(this.props.carData);
        },

        render: function () {
            var deleteButton = React.createElement('span', { className: 'fa fa-trash btn btn-danger',
                onClick: this.handleCarRemove });
            return React.createElement(
                'tr',
                { className: this.props.carData.markedForDeletion ? 'car_marked_for_delete' : '' },
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        'div',
                        { className: 'field form-group' },
                        this.props.viewOnly || this.props.carData.markedForDeletion ? '' : deleteButton,
                        React.createElement(
                            'span',
                            { className: 'line_number' },
                            this.props.lineNumber
                        ),
                        React.createElement('input', { type: 'hidden', value: this.props.carData.id, name: "customer[cars_attributes][" + this.props.lineNumber + "][id]" }),
                        React.createElement('input', { type: 'hidden', value: this.props.carData._destroy, name: "customer[cars_attributes][" + this.props.lineNumber + "][_destroy]" })
                    )
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        'div',
                        { className: 'field form-group' },
                        React.createElement('input', { className: 'form-control focus',
                            defaultValue: this.props.carData.vin_no,
                            required: true,
                            disabled: this.props.viewOnly || this.props.carData.markedForDeletion, name: "customer[cars_attributes][" + this.props.lineNumber + "][vin_no]" })
                    )
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        'div',
                        { className: 'field form-group' },
                        React.createElement('input', { className: 'form-control focus',
                            defaultValue: this.props.carData.plate_no,
                            required: true,
                            disabled: this.props.viewOnly || this.props.carData.markedForDeletion, name: "customer[cars_attributes][" + this.props.lineNumber + "][plate_no]" })
                    )
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        'div',
                        { className: 'field form-group' },
                        React.createElement('input', { className: 'form-control focus',
                            defaultValue: this.props.carData.year,
                            disabled: this.props.viewOnly || this.props.carData.markedForDeletion, name: "customer[cars_attributes][" + this.props.lineNumber + "][year]" })
                    )
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        'div',
                        { className: 'field form-group' },
                        React.createElement('input', { className: 'form-control focus',
                            defaultValue: this.props.carData.brand,
                            disabled: this.props.viewOnly || this.props.carData.markedForDeletion, name: "customer[cars_attributes][" + this.props.lineNumber + "][brand]" })
                    )
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        'div',
                        { className: 'field form-group' },
                        React.createElement('input', { className: 'form-control focus',
                            defaultValue: this.props.carData.model,
                            disabled: this.props.viewOnly || this.props.carData.markedForDeletion, name: "customer[cars_attributes][" + this.props.lineNumber + "][model]" })
                    )
                )
            );
        }
    });
})();