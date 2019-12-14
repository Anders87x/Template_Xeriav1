/*
Template Name: Xeria - Responsive Bootstrap 4 Admin Dashboard
Author: CoderThemes
Version: 1.0.0
Website: https://coderthemes.com/
Contact: support@coderthemes.com
File: Treeview init js
*/

$( document ).ready(function() {
    // Basic
    $('#basicTree').jstree({
		'core' : {
			'themes' : {
				'responsive': false
			}
		},
        'types' : {
            'default' : {
                'icon' : 'mdi mdi-folder-plus'
            },
            'file' : {
                'icon' : 'mdi mdi-file-document-box-outline'
            }
        },
        'plugins' : ['types']
    });
    
    // Checkbox
    $('#checkTree').jstree({
		'core' : {
			'themes' : {
				'responsive': false
			}
		},
        'types' : {
            'default' : {
                'icon' : 'mdi mdi-folder-plus'
            },
            'file' : {
                'icon' : 'mdi mdi-file-document-box-outline'
            }
        },
        'plugins' : ['types', 'checkbox']
    });
    
    // Drag & Drop
    $('#dragTree').jstree({
		'core' : {
			'check_callback' : true,
			'themes' : {
				'responsive': false
			}
		},
        'types' : {
            'default' : {
                'icon' : 'mdi mdi-folder-plus'
            },
            'file' : {
                'icon' : 'mdi mdi-file-document-box-outline'
            }
        },
        'plugins' : ['types', 'dnd']
    });
    
    // Ajax
    $('#ajaxTree').jstree({
		'core' : {
			'check_callback' : true,
			'themes' : {
				'responsive': false
			},
            'data' : {
                'url' : function (node) {
                    return node.id === '#' ? 'assets/data/ajax_roots.json' : 'assets/data/ajax_children.json';
                },
                'data' : function (node) {
                    return { 'id' : node.id };
                }
            }
        },
        'types' : {
            'default' : {
                'icon' : 'mdi mdi-folder-plus'
            },
            'file' : {
                'icon' : 'mdi mdi-file-document-box-outline'
            }
        },
        "plugins" : [ "contextmenu", "dnd", "search", "state", "types", "wholerow" ]
    });
});