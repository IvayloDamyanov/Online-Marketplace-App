$(() => {
      $('#delete-user').on('click', function (e) {
         const id = $('#delete-user').data('userid');
         $.ajax({
            url: '/settings/users/' + id,
            type: 'DELETE',
            data: {id: id},
         })
        .then((response) => {
            location = response.redirect;
        });
      });
});
