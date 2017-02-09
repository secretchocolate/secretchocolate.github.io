;(function ( $, window, document, undefined ) {

    var pluginName = 'jqGoogleForms',
        defaults = {},
        options = {};

    function jqGoogleForms( element, customOptions ) {
        options = $.extend( {}, defaults, customOptions) ;
        if (options.formKey){
            options["url"] = "https://docs.google.com/forms/d/" + options.formKey + "/viewform?embedded=true"
        }
    }

    /**
     * A really lightweight plugin wrapper around the constructor,
        preventing against multiple instantiations
     * @param  {Object} options
     * @return {jQuery Object}
     */
    $.fn[pluginName] = function ( options ) {
        return this.each(function(i) {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new jqGoogleForms( this, options ));
            }
        });
    };

    $.fn[pluginName]().sendFormData = function(data){ //appends to main function, reduce namespace footprint
        if (options.formKey) {
            $.ajax({
                url: "https://docs.google.com/forms/d/" + options.formKey + "/formResponse",
                data: data,
                type: "POST",
                dataType: "xml"
            });
        } else {
            console.log("jqGoogleForms: No form key!");
        }
    };

})( jQuery, window, document );
