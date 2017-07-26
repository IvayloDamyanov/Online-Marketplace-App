const { $ } = require('jquery');

$.ajax({
   url: '/settings/users/:id',
   type: 'DELETE',
   success: (res) => {
   },
});
