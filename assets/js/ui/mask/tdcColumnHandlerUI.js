/**
 * Created by tagdiv on 28.03.2016.
 */

/* global jQuery:{} */
/* global Backbone:{} */
/* global _:{} */

/* global tdcMaskUI:{} */


/*
 * The mask handler object
 *   - it creates the handler jquery object for 'tdc-column'
 *   - it has a reference to the 'tdc-column' jquery object
 *   - it registers to the mask as handler
 */

var tdcColumnHandlerUI;

(function( jQuery, backbone, _, undefined ) {

    'use strict';

    tdcColumnHandlerUI = {

        // The css class of the handler element
        _elementCssClass: 'tdc-column',

        //_handlerId: tdcInnerColumnHandlerUI._elementCssClass,
        _handlerId: 'tdc-column',

        // Handler text
        _handlerText: 'Column',

        // Handler css class
        _handlerCssClass: 'tdc-mask-column',




        // Handler element
        $elementColumn: undefined,

        _$handlerWrapper: undefined,

        // Handler jquery object
        _$handlerDrag: undefined,

        _$handlerEdit: undefined,

        // Initialization flag
        _isInitialized: false,




        init: function() {

            // Do nothing if it's already initialized
            if ( tdcColumnHandlerUI._isInitialized ) {
                return;
            }


            // Create the handler jquery object and append it to the mask wrapper
            var $handlerWrapper = jQuery( '<div id="' + tdcColumnHandlerUI._handlerCssClass + '"></div>'),
                $handlerDrag = jQuery( '<div class="tdc-mask-handler">' + tdcColumnHandlerUI._handlerText + '</div>' ),
                $handlerEdit = jQuery( '<div class="tdc-mask-edit">edit</div>' );

            $handlerWrapper.append( $handlerDrag );
            $handlerWrapper.append( $handlerEdit );

            tdcColumnHandlerUI._$handlerDrag = $handlerDrag;
            tdcColumnHandlerUI._$handlerEdit = $handlerEdit;
            tdcColumnHandlerUI._$handlerWrapper = $handlerWrapper;

            tdcMaskUI.$wrapper.append( $handlerWrapper );



            // Define the events the $_handlerDrag object will respond to

            tdcColumnHandlerUI._$handlerDrag.mousedown( function( event ) {

                // Send the event to its 'tdc-column' element
                tdcColumnHandlerUI._triggerEvent( event );

            }).mouseup( function() {

                // Send the event to its 'tdc-column' element
                tdcColumnHandlerUI._triggerEvent( event );

            }).mousemove( function( event ) {

                // Send the event to its 'tdc-column' element
                tdcColumnHandlerUI._triggerEvent( event );
                tdcMaskUI.show();

            }).mouseenter(function( event ) {

                // Send the event to its 'tdc-column' element
                tdcColumnHandlerUI._triggerEvent( event );
                tdcMaskUI.show();

            }).mouseleave( function( event ) {

                // Send the event to its 'tdc-column' element
                tdcColumnHandlerUI._triggerEvent( event );
            });



            // Define the events the _$handlerEdit object will respond to

            tdcColumnHandlerUI._$handlerEdit.click( function( event ) {

                event.preventDefault();

                alert( 'edit column' );

            }).mousemove( function( event ) {

                event.preventDefault();
                tdcMaskUI.show();

            }).mouseenter(function( event ) {

                event.preventDefault();
                tdcMaskUI.show();
            });



            // The final step of initialization is to add the handler object to the mask handlers and to mark it has initialized

            // Add the handler and its id to the mask handlers
            tdcMaskUI.addHandler( tdcColumnHandlerUI._handlerId, tdcColumnHandlerUI );

            // The handler is initialized here
            tdcColumnHandlerUI._isInitialized = true;
        },


        /**
         * Set the element ( 'tdc-column' ) where this handler will send its proper events
         *
         * @param $element
         */
        setElement: function( $element ) {

            var $elementColumn = $element.closest( '.' + tdcColumnHandlerUI._elementCssClass );
            if ( $elementColumn.length ) {
                tdcColumnHandlerUI.$elementColumn = $elementColumn;
                tdcColumnHandlerUI._$handlerWrapper.show();
            } else {
                tdcColumnHandlerUI._$handlerWrapper.hide();
            }
        },


        /**
         * Trigger the event to its element ( 'tdc-column' )
         *
         * @param event
         * @private
         */
        _triggerEvent: function( event ) {

            if ( ! _.isUndefined( event ) && ! _.isUndefined( tdcColumnHandlerUI.$elementColumn ) ) {
                tdcColumnHandlerUI.$elementColumn.trigger( event );
            }
        }

    };

})( jQuery, Backbone, _ );