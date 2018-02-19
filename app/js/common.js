var myModule = (function () {

    // Initialization module
    var init = function () {
        _setUpListeners();
    };

    // Listening of action
    var _setUpListeners = function () {
        $("#loginFormButton").on('click', _showModal);
        $("#form").on('submit', _logIn);
    };

    // Work with modal window
    var _showModal = function (e) {

        e.preventDefault();

        var divPopup = $("#loginForm"),
            form = divPopup.find("#form");

        divPopup.bPopup({
            speed: 650,
            transition: 'slideDown',
            onClose: function () {
                form.find('.error-message').text('').hide();
                form.trigger('reset');
            }
        });
    };

    var _logIn = function (e) {

        e.preventDefault();

        var form = $(this),
            url = 'submit_action.php',
            errorBox = form.find('.error-message'),
            defObj = _ajaxForm(form, url);

            if(defObj){
                defObj.done(function (answer) {

                    console.log(errorBox);

                    if (answer.status === "Ok") {
                        errorBox.hide();
                    } else {
                        errorBox.text(answer.text).show();
                    }
                })
            }
    };

    // Take all data from form
    // Check form field
    // Make request to the server and return response
    var _ajaxForm = function (form, url) {

        if(!validation.validateForm(form)) return false

        data = form.serialize();

        var result = $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data
        }).fail(function (answer) {
            console.log('Problems in PHP!');
            form.find('.error-message').text('You have a trouble on server!')
        });

        return result;
    };

    // Return object
    return {
        init: init
    };

})();

var validation = (function () {

    // Initialization module
    var init = function () {
        _setUpListeners();
    };

    // Listening of action
    var _setUpListeners = function () {
        $('form').on('keydown', '.has-error', _removeError);
        $('form').on('reset', _clearForm);
    };

    var _removeError = function () {
        $(this).removeClass('has-error');
    };

    var _clearForm = function (form) {

        var form = $(this);
        form.find('.input').trigger('hideTooltip');
        form.find('.has-error').removeClass('has-error');
    };

    var _createQtip = function (element, position) {

        if(position === "right"){
            position = {
                my: 'left center',
                at: 'right center'
            }
        } else {
            position = {
                my: 'right center',
                at: 'left center',
                adjust: {
                    method: 'shift none'
                }
            }
        }

        element.qtip({
            content: {
                text: function () {
                    return $(this).attr('qtip-content');
                }
            },
            show: {
                event: 'show'
            },
            hide: {
                event: 'keydown hideTooltip'
            },
            position: position,
            style: {
                classes: 'qtip-mystyle qtip-rounded',
                tip: {
                    height: 10,
                    width: 16
                }
            }
        }).trigger('show');
    };

    var validateForm = function (form) {

        var elements = form.find('input').not('input[type="file"], input[type="hidden"]'),
            valid = true;

        $.each(elements, function (index, value) {
            var element = $(value),
                value = element.val(),
                position = element.attr('qtip-position');

            if(value.length === 0){
                element.addClass('has-error');
                _createQtip(element, position);
                valid = false;
            }
        });

        return valid;
    };

    // Return object
    return {
        init: init,
        validateForm: validateForm
    };

})();

var contactMe = (function () {

    // Initialization module
    var init = function () {
        _setUpListeners();
    };

    // Listening of action
    var _setUpListeners = function () {
        $('#form').on('submit', _submitForm);
    };

    var _submitForm = function (e) {
        console.log('Send form');
        e.preventDefault();

        var form = $(this),
            url = 'contactme.php',
            defObject = _ajaxForm(form, url);
    };

    var _ajaxForm = function (form, url) {
        console.log('Ajax with checking');
        if(!validation.validateForm(form)) return false
    };

    // Return object
    return {
        init: init
    };

})();

myModule.init();
validation.init();
contactMe.init();