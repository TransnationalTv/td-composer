/**
 * Created by ra on 3/23/2016.
 */

/* global jQuery:{} */
/* global Backbone:{} */
/* global _:{} */

var tdcSidebar;

(function( jQuery, _, undefined ) {

    'use strict';

    tdcSidebar = {

        $editRow: undefined,
        $editColumn: undefined,
        $editInnerRow: undefined,
        $editInnerColumn: undefined,

        _$currentElement: undefined,

        _$currentRow: undefined,
        _$currentColumn: undefined,
        _$currentInnerRow: undefined,
        _$currentInnerColumn: undefined,

        $currentElementTitle: undefined,
        $inspector: undefined,

        // Row - Columns settings
        _$rowColumns: undefined,
        // Inner Row - Inner Columns settings
        _$innerRowInnerColumns: undefined,


        _rowColumnsPrevVal: undefined,
        _innerRowInnerColumnsPrevVal: undefined,




        init: function() {

            tdcSidebar.$editRow = jQuery( '#tdc-breadcrumb-row' );
            tdcSidebar.$editRow.data( 'name', 'Row' );

            tdcSidebar.$editColumn = jQuery( '#tdc-breadcrumb-column' );
            tdcSidebar.$editColumn.data( 'name', 'Column' );

            tdcSidebar.$editInnerRow = jQuery( '#tdc-breadcrumb-inner-row' );
            tdcSidebar.$editInnerRow.data( 'name', 'Inner Row' );

            tdcSidebar.$editInnerColumn = jQuery( '#tdc-breadcrumb-inner-column' );
            tdcSidebar.$editInnerColumn.data( 'name', 'Inner Column' );

            tdcSidebar.$currentElementTitle = jQuery( '.tdc-current-element-title' );
            tdcSidebar.$inspector = jQuery( '.tdc-inspector' );


            tdcSidebar.$editRow.click(function() {
                tdcSidebar.activeBreadcrumbItem( tdcSidebar.$editRow, tdcSidebar._$currentRow );

            }).mouseenter(function( event ) {

                if ( ! _.isUndefined( tdcSidebar._$currentElement ) ) {
                    tdcMaskUI.setCurrentElement( tdcSidebar._$currentElement );
                    tdcMaskUI.$wrapper.hide();
                }

                if ( ! _.isUndefined( tdcSidebar._$currentRow ) ) {
                    tdcMaskUI.setCurrentContainer( tdcSidebar._$currentRow );
                }

            }).mouseleave(function( event ) {
                tdcMaskUI.hide();
            });


            tdcSidebar.$editColumn.click(function() {
                tdcSidebar.activeBreadcrumbItem( tdcSidebar.$editColumn, tdcSidebar._$currentColumn );

            }).mouseenter(function( event ) {

                if ( ! _.isUndefined( tdcSidebar._$currentElement ) ) {
                    tdcMaskUI.setCurrentElement( tdcSidebar._$currentElement );
                    tdcMaskUI.$wrapper.hide();
                }

                if ( ! _.isUndefined( tdcSidebar._$currentColumn ) ) {
                    tdcMaskUI.setCurrentContainer( tdcSidebar._$currentColumn );
                }

            }).mouseleave(function( event ) {
                tdcMaskUI.hide();
            });


            tdcSidebar.$editInnerRow.click(function() {
                tdcSidebar.activeBreadcrumbItem( tdcSidebar.$editInnerRow, tdcSidebar._$currentInnerRow );

            }).mouseenter(function( event ) {

                if ( ! _.isUndefined( tdcSidebar._$currentElement ) ) {
                    tdcMaskUI.setCurrentElement( tdcSidebar._$currentElement );
                    tdcMaskUI.$wrapper.hide();
                }

                if ( ! _.isUndefined( tdcSidebar._$currentInnerRow ) ) {
                    tdcMaskUI.setCurrentContainer( tdcSidebar._$currentInnerRow );
                }

            }).mouseleave(function( event ) {
                tdcMaskUI.hide();
            });


            tdcSidebar.$editInnerColumn.click(function() {
                tdcSidebar.activeBreadcrumbItem( tdcSidebar.$editInnerColumn, tdcSidebar._$currentInnerColumn );

            }).mouseenter(function( event ) {

                if ( ! _.isUndefined( tdcSidebar._$currentElement ) ) {
                    tdcMaskUI.setCurrentElement( tdcSidebar._$currentElement );
                    tdcMaskUI.$wrapper.hide();
                }

                if ( ! _.isUndefined( tdcSidebar._$currentInnerColumn ) ) {
                    tdcMaskUI.setCurrentContainer( tdcSidebar._$currentInnerColumn );
                }

            }).mouseleave(function( event ) {
                tdcMaskUI.hide();
            });


            jQuery( '.tdc-sidebar-element').each(function( index, element ) {
                tdcSidebar._bindElement( jQuery( element ) );
            });



            tdcSidebar._$rowColumns = tdcSidebar.$inspector.find( 'select[name=tdc-row-column]' );
            tdcSidebar._rowColumnsPrevVal = tdcSidebar._$rowColumns.val();

            tdcSidebar._$rowColumns.change(function( event ) {

                var rowModelId = tdcSidebar._$currentRow.data( 'model_id' ),
                    rowModel = tdcIFrameData.getModel( rowModelId );

                tdcSidebar.changeColumns( rowModel, tdcSidebar._rowColumnsPrevVal, jQuery(this).val() );
                tdcSidebar._rowColumnsPrevVal = jQuery(this).val();
            });


            tdcSidebar._$innerRowInnerColumns = tdcSidebar.$inspector.find( 'select[name=tdc-inner-row-inner-column]' );
            tdcSidebar._innerRowInnerColumnsPrevVal = tdcSidebar._$innerRowInnerColumns.val();

            tdcSidebar._$innerRowInnerColumns.change(function( event ) {

                var innerRowModelId = tdcSidebar._$currentInnerRow.data( 'model_id' ),
                    innerRowModel = tdcIFrameData.getModel( innerRowModelId );

                tdcIFrameData.changeInnerRowModel( innerRowModel, tdcSidebar._innerRowInnerColumnsPrevVal, jQuery(this).val() );
                tdcSidebar._innerRowInnerColumnsPrevVal = jQuery(this).val();

                innerRowModel.getShortcodeRender( 1, null, true, Math.random() + Math.random() + Math.random());
            });


            tdcSidebar.sidebarModal();
            tdcSidebar.liveInspectorTabs();
        },



        activeBreadcrumbItem: function( $item, $currentContainer ) {
            tdcSidebar.setCurrentElementContent( $item.data( 'name' ) );
            $item.show();
            $item.nextAll().hide();
            tdcSidebar._showLayoutInspector( $currentContainer );
        },



        setCurrentElementContent: function( content ) {



            tdcSidebar.$currentElementTitle.html( content );
        },



        closeModal: function() {
            jQuery( '.tdc-sidebar-modal-elements' ).removeClass( 'tdc-modal-open' );
        },



        sidebarModal: function () {
            // Sidebar elements modal window - open
            jQuery('.tdc-add-element').click(function(){
                jQuery('.tdc-sidebar-modal-elements').addClass('tdc-modal-open');
            });

            // Sidebar elements modal window - close
            jQuery('.tdc-modal-close').click(function(){
                jQuery('.tdc-sidebar-modal-elements').removeClass('tdc-modal-open');

                //jQuery('.tdc-sidebar-modal-row').removeClass('tdc-modal-open');
                //jQuery('.tdc-sidebar-modal-column').removeClass('tdc-modal-open');
                //jQuery('.tdc-sidebar-modal-inner-row').removeClass('tdc-modal-open');
                //jQuery('.tdc-sidebar-modal-inner-column').removeClass('tdc-modal-open');
            });

        },



        _bindElement: function( $element ) {

            $element.click(function( event ) {
                //tdcDebug.log( 'click sidebar element' );

                event.preventDefault();

            }).mousedown(function( event ) {
                //tdcDebug.log( 'sidebar element mouse down' );

                // Consider only the left button
                if ( 1 !== event.which ) {
                    return;
                }

                event.preventDefault();

                tdcOperationUI.activeDraggedElement( $element );
                tdcOperationUI.showHelper( event );

            }).mouseup(function( event ) {

                // Respond only if dragged element is 'tdc-sidebar-element'
                if ( tdcOperationUI.isSidebarElementDragged() ) {

                    //tdcDebug.log( 'sidebar element mouse up' );
                    event.preventDefault();

                    tdcOperationUI.deactiveDraggedElement();
                    tdcOperationUI.hideHelper();
                }
            });
        },




        liveInspectorTabs: function () {

            jQuery('body').on('click', '.tdc-tabs a', function() {

                if (jQuery(this).hasClass('tdc-tab-active') === true) {
                    return;
                }


                // the tab
                jQuery('.tdc-tabs a').removeClass('tdc-tab-active');
                jQuery(this).addClass('tdc-tab-active');


                // content - remove all visible classes
                jQuery('.tdc-tab-content-wrap .tdc-tab-content').removeClass( 'tdc-tab-content-visible' );

                // add the class to the good content
                var tabContentId = jQuery(this).data('tab-id');
                jQuery('#' + tabContentId).addClass('tdc-tab-content-visible');
            });
        },



        setCurrentElement: function( $currentElement ) {
            tdcSidebar._$currentElement = $currentElement;

            if (_.isUndefined($currentElement)) {
                return;
            }

            tdcSidebarPanel.bindPanelToDomElement($currentElement);

        },
        getCurrentElement: function() {
            return tdcSidebar._$currentElement;
        },


        setCurrentRow: function( $currentRow ) {
            tdcSidebar._$currentRow = $currentRow;

            if (_.isUndefined($currentRow)) {
                return;
            }

            tdcSidebarPanel.bindPanelToDomElement($currentRow);
        },
        getCurrentRow: function() {
            return tdcSidebar._$currentRow;
        },


        setCurrentColumn: function( $currentColumn ) {
            tdcSidebar._$currentColumn = $currentColumn;
        },
        getCurrentColumn: function() {
            return tdcSidebar._$currentColumn;
        },


        setCurrentInnerRow: function( $currentInnerRow ) {
            tdcSidebar._$currentInnerRow = $currentInnerRow;


            if (_.isUndefined($currentInnerRow)) {
                return;
            }

            tdcSidebarPanel.bindPanelToDomElement($currentInnerRow);
        },
        getCurrentInnerRow: function() {
            return tdcSidebar._$currentInnerRow;
        },


        setCurrentInnerColumn: function( $currentInnerColumn ) {
            tdcSidebar._$currentInnerColumn = $currentInnerColumn;
        },
        getCurrentInnerColumn: function() {
            return tdcSidebar._$currentInnerColumn;
        },



        _showInspector: function() {

            if ( ! _.isUndefined( tdcSidebar._$currentElement ) ) {

                tdcSidebar.$inspector.find( '.tdc-tabs > a' ).each( function( index, element ) {

                    var $element = jQuery( element ),
                        $tabContent = tdcSidebar.$inspector.find( '#' + $element.data( 'tab-id' ) );

                    if ( 0 === index ) {
                        $element.show();
                        $element.addClass( 'tdc-tab-active' );
                        $tabContent.addClass( 'tdc-tab-content-visible' );
                    } else {
                        if ( $element.hasClass( 'tdc-layout' ) ) {
                            $element.hide();
                        } else {
                            $element.show();
                        }
                        $element.removeClass( 'tdc-tab-active' );
                        $tabContent.removeClass( 'tdc-tab-content-visible' );
                    }
                });
            }

            tdcSidebar.$inspector.show();
        },



        _showLayoutInspector: function( $currentContainer ) {

            //tdcDebug.log( '_showLayoutInspector' );

            var classLayout;

            if ( ! _.isUndefined( $currentContainer ) ) {

                if ( tdcRowHandlerUI.isRow( $currentContainer ) ) {
                    classLayout = 'tdc-layout-row';
                    tdcSidebar._setRowColumnSettings( $currentContainer );

                } else if ( tdcColumnHandlerUI.isColumn( $currentContainer ) ) {
                    classLayout = 'tdc-layout-column';

                } else if ( tdcInnerRowHandlerUI.isInnerRow( $currentContainer ) ) {
                    classLayout = 'tdc-layout-inner-row';
                    tdcSidebar._setInnerRowInnerColumnSettings( $currentContainer );

                } else if ( tdcInnerColumnHandlerUI.isInnerColumn( $currentContainer ) ) {
                    classLayout = 'tdc-layout-inner-column';
                }
            }

            tdcSidebar.$inspector.find( '.tdc-tabs > a' ).each( function( index, element ) {

                var $element = jQuery( element ),
                    $tabContent = tdcSidebar.$inspector.find( '#' + $element.data( 'tab-id' ) );

                //tdcDebug.log( classLayout );

                if ( _.isUndefined( classLayout ) ) {
                    if ( 0 === index ) {
                        $element.show();
                        $element.addClass( 'tdc-tab-active' );
                        $tabContent.addClass( 'tdc-tab-content-visible' );
                    } else {
                        if ( $element.hasClass( 'tdc-layout' ) ) {
                            $element.hide();
                        } else {
                            $element.show();
                        }
                        $element.removeClass( 'tdc-tab-active' );
                        $tabContent.removeClass( 'tdc-tab-content-visible' );
                    }
                } else {
                    if ( $element.hasClass( classLayout ) ) {
                        $element.show();
                        $element.addClass( 'tdc-tab-active' );
                        $tabContent.addClass( 'tdc-tab-content-visible' );
                    } else {
                        $element.hide();
                        $element.removeClass( 'tdc-tab-active' );
                        $tabContent.removeClass( 'tdc-tab-content-visible' );
                    }
                }
            });

            tdcSidebar.$inspector.show();
        },



        _setInnerRowInnerColumnSettings: function( $currentContainer ) {

            var modelId = $currentContainer.data( 'model_id' );

            if ( ! _.isUndefined( modelId ) ) {
                var model = tdcIFrameData.getModel( modelId );

                if ( _.isUndefined( model ) ) {
                    // The following error should not exist. The structure data should have consistency!
                    alert('tdcSidebar._setInnerRowInnerColumnSettings Error: Model not in structure data!');
                }

                var modelTag = model.get( 'tag' );

                if ( 'vc_row_inner' !== modelTag ) {
                    // The following error should not exist. The structure data should have consistency!
                    alert('tdcSidebar._setInnerRowInnerColumnSettings Error: Model is not an inner row!');
                    return;
                }

                var childCollection = model.get( 'childCollection' );

                if ( ! _.isUndefined( childCollection ) ) {

                    //tdcDebug.log( childCollection );

                    var width = tdcIFrameData.getChildCollectionWidths( childCollection );

                    //tdcDebug.log( width );

                    if ( width.length ) {
                        tdcSidebar._$innerRowInnerColumns.val( width );
                    } else {
                        // Default value
                        tdcSidebar._$innerRowInnerColumns.val( '11' );
                    }

                    var columnModel = model.get( 'parentModel' ),
                        attrsColumnModel = columnModel.get( 'attrs' ),
                        columnWidth = '';

                    if ( _.has( attrsColumnModel, 'width' ) ) {
                        columnWidth = attrsColumnModel.width.replace( '/', '' );
                    }

                    switch ( columnWidth ) {
                        case '' :
                            tdcSidebar._$innerRowInnerColumns.find('option[value=12_12]').hide();
                            tdcSidebar._$innerRowInnerColumns.find('option[value=23_13]').show();
                            tdcSidebar._$innerRowInnerColumns.find('option[value=13_23]').show();
                            tdcSidebar._$innerRowInnerColumns.find('option[value=13_13_13]').show();
                            break;

                        case '13' :
                            tdcSidebar._$innerRowInnerColumns.find('option[value=12_12]').hide();
                            tdcSidebar._$innerRowInnerColumns.find('option[value=23_13]').hide();
                            tdcSidebar._$innerRowInnerColumns.find('option[value=13_23]').hide();
                            tdcSidebar._$innerRowInnerColumns.find('option[value=13_13_13]').hide();
                            break;

                        case '23' :
                            tdcSidebar._$innerRowInnerColumns.find('option[value=12_12]').show();
                            tdcSidebar._$innerRowInnerColumns.find('option[value=23_13]').hide();
                            tdcSidebar._$innerRowInnerColumns.find('option[value=13_23]').hide();
                            tdcSidebar._$innerRowInnerColumns.find('option[value=13_13_13]').hide();
                            break;
                    }

                    tdcSidebar._innerRowInnerColumnsPrevVal = tdcSidebar._$innerRowInnerColumns.val();
                }
            }
        },



        _setRowColumnSettings: function( $currentContainer ) {

            var modelId = $currentContainer.data( 'model_id' );

            if ( ! _.isUndefined( modelId ) ) {
                var model = tdcIFrameData.getModel( modelId );

                if ( _.isUndefined( model ) ) {
                    // The following error should not exist. The structure data should have consistency!
                    alert('tdcSidebar._setRowColumnSettings Error: Model not in structure data!');
                }

                var modelTag = model.get( 'tag' );

                if ( 'vc_row' !== modelTag ) {
                    // The following error should not exist. The structure data should have consistency!
                    alert('tdcSidebar._setRowColumnSettings Error: Model is not a row!');
                    return;
                }

                var childCollection = model.get( 'childCollection' );

                if ( ! _.isUndefined( childCollection ) ) {

                    //tdcDebug.log( childCollection );

                    var width = tdcIFrameData.getChildCollectionWidths( childCollection );

                    //tdcDebug.log( width );

                    if ( width.length ) {
                        tdcSidebar._$rowColumns.val( width );
                    } else {
                        // Default value
                        tdcSidebar._$rowColumns.val( '11' );
                    }
                    tdcSidebar._rowColumnsPrevVal = tdcSidebar._$rowColumns.val();
                }
            }
        },







        changeColumns: function( rowModel, columnOldWidth, columnNewWidth ) {

            if ( '11' === columnOldWidth ) {

                // 1 column -> 2 columns
                // 1 column -> 2 columns
                // 1 column -> 3 columns
                if ( '23_13' === columnNewWidth || '13_23' === columnNewWidth || '13_13_13' === columnNewWidth ) {
                    tdcIFrameData.changeRowModel( rowModel, columnOldWidth, columnNewWidth );
                    rowModel.getShortcodeRender( 1, null, true, Math.random() + Math.random() + Math.random());
                }

            } else if ( '23_13' === columnOldWidth ) {

                // 2 columns -> 1 column
                // 2 columns -> 2 columns
                // 2 columns -> 3 columns
                if ( '11' === columnNewWidth || '13_23' === columnNewWidth || '13_13_13' === columnNewWidth ) {
                    tdcIFrameData.changeRowModel( rowModel, columnOldWidth, columnNewWidth );
                    rowModel.getShortcodeRender( 1, null, true, Math.random() + Math.random() + Math.random() );
                }

            } else if ( '13_23' === columnOldWidth ) {

                // 2 column -> 1 column
                // 2 column -> 2 columns
                // 2 column -> 3 columns
                if ( '11' === columnNewWidth || '23_13' === columnNewWidth || '13_13_13' === columnNewWidth ) {
                    tdcIFrameData.changeRowModel( rowModel, columnOldWidth, columnNewWidth );
                    rowModel.getShortcodeRender( 1, null, true, Math.random() + Math.random() + Math.random() );
                }

            } else if ( '13_13_13' === columnOldWidth ) {

                // 3 column -> 1 column
                // 3 column -> 2 columns
                // 3 column -> 2 columns
                if ( '11' === columnNewWidth || '23_13' === columnNewWidth || '13_23' === columnNewWidth ) {
                    tdcIFrameData.changeRowModel( rowModel, columnOldWidth, columnNewWidth );
                    rowModel.getShortcodeRender( 1, null, true, Math.random() + Math.random() + Math.random() );
                }
            }
        }


    };

    tdcSidebar.init();

})( jQuery, _ );