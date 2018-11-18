var ViewModel = function() {

	// Define self VM
	var self = this;
	self.users = ko.observableArray();
	self.departments = ko.observableArray();
    self.error = ko.observable();
    self.user = ko.observable();
    self.newUser = {
        Id: ko.observable(),
        Username: ko.observable(),
        DepartmentId: ko.observable()
    };
    self.editUser = {
        Id: ko.observable(),
        Username: ko.observable(),
        DepartmentId: ko.observable()
    };

	// Define Uri
    var usersUri = '/api/users/';
    var departmentsUri = '/api/departments/';

	// Define Ajax wrap function
	function ajax(uri, method, data) {
		self.error = '';
		return $.ajax({
			type: method,
			url: uri,
			dataType: 'json',
			contentType: 'application.json',
			data: data ? JSON.stringify(data) : null
		}).fail(function (jqXHR, textStatus, err) {
			self.error(err);
		});
    }

    // Define Get selected user id function
    function getSelectedUserId() {
        var id = $('#clicked-row').attr('clicked-row');
        if (id != "" && id != undefined) { return id; } else { alert('User not selected'); }
    }

	// Define Get all users function
	function getAllUsers() {
		ajax(usersUri, 'GET').done(function (data) {

			// Put users data
			self.users(data);

			// Catch table row click
			$('#users tbody tr').on('click', function () {
                var id = $(this).find('[data-bind="text: Id"]').text();
                var department = $(this).find('[department-id]').text();
                var departmentId = $(this).find('[department-id]').attr('department-id')
                var username = $(this).find('[data-bind="text: Username"]').text();
                $('#clicked-row').attr('clicked-row', id);
                $('#clicked-row').attr('department', department);
                $('#clicked-row').attr('department-id', department-id);
                $('#clicked-row').attr('username', username);
				$(this).siblings().removeClass('table-primary');
				$(this).addClass('table-primary');
			});

			// Catch delete button click
            $('#delete-user').on('click', function () {
				deleteUser();
			});

			// Catch add button click
            $('#add-user').on('click', function () {
                $('#card-header-user').text('Add User');
                $('#user-action').text('Save new user');
                $('#user-action').attr('action','add');
                $('#card-user').show();
            });

            // Catch edit button click
            $('#edit-user').on('click', function () {
                var id = getSelectedUserId();
                if (id == undefined) { return; }
                $('#card-header-user').text('Edit User');
                $('#user-action').text('Save changes');
                $('#user-action').attr('action', 'edit');
                getSelectedUser();
                $('#card-user').show();
            });

            // Catch Department click
            $('.dropdown-menu').on('click','a',function () {
                $(".dropdown .btn:first-child").text($(this).text());
                $(".dropdown .btn:first-child").attr('department-id', $(this).attr('department-id'));
            });

            // Catch Save new user / Save changes button click
            $('#user-action').on('click', function () {

                var action = $('#user-action').attr('action');
                var enterUsername = $('#enter-username').text();
                var selectDepartment = $('#dropdownMenuButton').text();

                if (enterUsername == null) {
                    alert('Please enter username!');
                    return;
                }
                if (selectDepartment == null || selectDepartment == 'Department') {
                    alert('Please select department!');
                    return;
                }

                if (action == "add") {
                    addUser();
                }
                if (action == "edit") {
                    editUser();
                }

            });

		});

    }

    // Define Get all departments function
    function getAllDepartments() {
        ajax(departmentsUri, 'GET').done(function (data) {
            self.departments(data);
        });
    }

    // Define Get selelcted user function
    function getSelectedUser() {
        var id = getSelectedUserId();
        if (id == undefined) { return; }
        ajax(usersUri + id, 'GET').done(function (user) {
            self.user(user);
        });
    }

	// Define Delete user function
    function deleteUser() {
        var id = getSelectedUserId();
        if (id == undefined) { return; }
		if (confirm('Are you sure to delete this user?')) {
			ajax(usersUri + id, 'DELETE').done(function () {

                // Delete old element from array
                self.users = $.grep(self.users, function (e) {
                    return e.Id != getSelectedUserId()
                });

			});
		}
    }

    // Define Add user function
    function addUser() {
        var newUser = {
            Id: getSelectedUserId(),
            Username: self.newUser.Username,
            DepartmentId: $(".dropdown .btn:first-child").attr('department-id')
        };
        ajax(usersUri, 'POST', newUser).done(function (item) {

            // Push new element into array
            self.users.push(item);

        });
    }

    // Define Edit user function
    function editUser() {
        var editedUser = {
            Id: getSelectedUserId(),
            Username: self.newUser.Username,
            DepartmentId: $(".dropdown .btn:first-child").attr('department-id')
        };
        ajax(usersUri, 'PUT', editedUser).done(function (item) {

            // Delete old element from array
            self.users = $.grep(self.users, function (e) {
                return e.Id != getSelectedUserId()
            });

            // Push new element into array
            self.users.push(item);

        });
    }

	// Launch (initially)
    getAllUsers();
    getAllDepartments();

}

// Apply bindings
ko.applyBindings(new ViewModel());