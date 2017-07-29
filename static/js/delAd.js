var del = document.querySelector('#delete-ad');
del.addEventListener('click', function (e) {
      const num = $('#delete-ad').data('adnum');
      $.ajax({
            url: '/adverts/ads/',
            type: 'DELETE',
            data: {num: num},
      })
      .then((response) => {
            location = response.redirect('search');
      });
});