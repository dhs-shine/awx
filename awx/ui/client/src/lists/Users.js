/*************************************************
 * Copyright (c) 2015 Ansible, Inc.
 *
 * All Rights Reserved
 *************************************************/


export default
    angular.module('UserListDefinition', [])
    .factory('UserList', ['i18n', function(i18n) {
    return {

        name: 'users',
        stateTree: 'users',
        search: {
            order_by: 'username'
        },
        defaultSearchParams: function(term){
            return {or__username__icontains: term,
                    or__first_name__icontains: term,
                    or__last_name__icontains: term
                };
        },
        iterator: 'user',
        selectTitle: i18n._('Add Users'),
        editTitle: i18n._('Users'),
        listTitle: i18n._('Users'),
        selectInstructions: '<p>Select existing users by clicking each user or checking the related checkbox. When finished, click the blue ' +
            '<em>Select</em> button, located bottom right.</p> <p>When available, a brand new user can be created by clicking the ' +
            '<i class=\"fa fa-plus\"></i> button.</p>',
        index: false,
        hover: true,

        fields: {
            username: {
                key: true,
                label: i18n._('Username'),
                columnClass: 'col-md-3 col-sm-3 col-xs-9'
            },
            first_name: {
                label: i18n._('First Name'),
                columnClass: 'col-md-3 col-sm-3 hidden-xs'
            },
            last_name: {
                label: i18n._('Last Name'),
                columnClass: 'col-md-3 col-sm-3 hidden-xs'
            }
        },

        actions: {
            add: {
                label: 'Create New',
                mode: 'all', // One of: edit, select, all
                ngClick: 'addUser()',
                basePaths: ['organizations', 'users'], // base path must be in list, or action not available
                awToolTip: i18n._('Create a new user'),
                actionClass: 'btn List-buttonSubmit',
                buttonContent: '&#43; ' + i18n._('ADD'),
                ngShow: 'canAdd'
            }
        },

        fieldActions: {

            columnClass: 'col-md-3 col-sm-3 col-xs-3',

            edit: {
                label: i18n._('Edit'),
                ngClick: "editUser(user.id)",
                icon: 'icon-edit',
                "class": 'btn-xs btn-default',
                awToolTip: i18n._('Edit user'),
                dataPlacement: 'top',
                ngShow: 'user.summary_fields.user_capabilities.edit'
            },

            view: {
                label: i18n._('View'),
                ngClick: "editUser(user.id)",
                "class": 'btn-xs btn-default',
                awToolTip: i18n._('View user'),
                dataPlacement: 'top',
                ngShow: '!user.summary_fields.user_capabilities.edit'
            },

            "delete": {
                label: i18n._('Delete'),
                ngClick: "deleteUser(user.id, user.username)",
                icon: 'icon-trash',
                "class": 'btn-xs btn-danger',
                awToolTip: i18n._('Delete user'),
                dataPlacement: 'top',
                ngShow: 'user.summary_fields.user_capabilities.delete'
            }
        }
    };}]);
