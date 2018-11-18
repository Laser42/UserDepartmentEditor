var ViewModel = function() {

	// Define self VM
	var self = this;
	self.users = ko.observableArray();
	self.departments = ko.observableArray();
	self.error = ko.observable;

	// Define Uri
	var usersUri = '/api/users/';

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

	// Define Get all users function
	function getAllUsers() {
		ajax(usersUri, 'GET').done(function (data) {

			// Put users data
			self.users(data);

			// Catch table row click
			$('#users tbody tr').on('click', function () {
				var id = $(this).find('[data-bind="text: Id"]').text();
				$('#clicked-row').attr('clicked-row', id);
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
                $('#card-header-user').text('Edit User');
                $('#user-action').text('Save changes');
                $('#user-action').attr('action', 'edit');
                $('#card-user').show();
            });

		});

	}

	// Define Delete user function
	function deleteUser() {
		if (confirm('Are you sure to delete this user?')) {
			var id = $('#clicked-row').attr('clicked-row');
			ajax(usersUri + id, 'DELETE').done(function () {
				window.location.href(usersUri);
			});
		}
    }

    // Define Add user function
    function addUser() {

    }

	// Launch (initially)
	getAllUsers();

}

// Apply binddings
ko.applyBindings(new ViewModel());