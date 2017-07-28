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

var fav = document.querySelector('#fav-ad');
fav.addEventListener('click', function (e) {
      const num = $('#fav-ad').data('adnum');
      $.ajax({
            url: '/adverts/favs/',
            type: 'POST',
            data: {num: num},
      })
      .then((response) => {
            location = response.redirect('');
      });
});