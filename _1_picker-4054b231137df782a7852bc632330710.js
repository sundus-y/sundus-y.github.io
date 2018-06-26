var CustomerCarApp = CustomerCarApp || {};

(function () {

    CustomerCarApp.Picker = React.createClass({
        displayName: "Picker",

        getInitialState: function () {
            return {
                data: [],
                loadingCustomerCars: false
            };
        },

        getCustomerCars: function (customerId) {
            var deferred = $.Deferred();
            this.setState({ loadingCustomerCars: true });
            $.ajax({
                type: "GET",
                url: "/customers/" + customerId + "/cars/",
                dataType: 'json',
                success: (function (data, response) {
                    deferred.resolve({ context: this, data: data, message: response });
                    this.setState({ loadingCustomerCars: false });
                }).bind(this),
                error: function (err) {
                    deferred.reject({ context: this, err: err, message: 'Error' });
                    this.setState({ loadingCustomerCars: false });
                }
            });
            return deferred.promise();
        },

        componentWillMount: function () {
            CustomerCarApp.callback = (function (data) {
                var clear = data.clear;
                this.getCustomerCars(data.customerId).done(function (response) {
                    var self = response.context;
                    self.setState({ data: response.data });
                    if (clear) self.clearUpdateElements();
                }).fail(function (response) {
                    alert("Error While Trying to Get Customer Car" + response);
                });
            }).bind(this);
        },

        handleCarSelect: function () {
            var self = this;
            if (this.props.updateElements) {
                var selectedCar = this.state.data.filter(function (car) {
                    return car.id.toString() === $('#' + self.props.pickerId).val();
                })[0];
                selectedCar = selectedCar || { vin_no: '', plate_no: '', year: '', brand: '', model: '' };
                ['id', 'vin_no', 'plate_no', 'year', 'brand', 'model'].forEach(function (field) {
                    $('#' + self.props.updateElements + '_' + field).val(selectedCar[field]);
                });
            }
        },

        clearUpdateElements: function () {
            var self = this;
            ['id', 'vin_no', 'plate_no', 'year', 'brand', 'model'].forEach(function (field) {
                $('#' + self.props.updateElements + '_' + field).val('');
            });
        },

        render: function () {
            var carsList = this.state.data;
            var carsListUI = carsList.map(function (car, index) {
                return React.createElement(
                    "option",
                    { key: car.id, value: car.id },
                    car.vin_no + " / " + car.plate_no
                );
            }, this);

            return React.createElement(
                "div",
                { className: "input-group" },
                React.createElement(
                    "label",
                    { htmlFor: this.props.pickerId },
                    "Select Car"
                ),
                React.createElement(
                    "select",
                    { className: "form-control", id: this.props.pickerId, onChange: this.handleCarSelect },
                    React.createElement(
                        "option",
                        null,
                        "Select Car..."
                    ),
                    carsListUI
                )
            );
        }
    });

    function render(viewMode, container) {
        var Picker = CustomerCarApp.Picker;
        ReactDOM.render(React.createElement(Picker, { pickerId: container.data('picker-id'), updateElements: container.data('update-elements') }), container[0]);
    }
    $(document).ready(function () {
        if ($('.customer_cars_picker_app').length != 0) {
            render(false, $('.customer_cars_picker_app'));
        }
    });
})();