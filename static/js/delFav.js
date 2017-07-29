var delFav = document.getElementsByClassName('delete-fav');
for (let i = 0; i < delFav.length; i += 1) {
      delFav[i].addEventListener('click', function (e) {
      const num = $(delFav[i]).data('adnum');
      $.ajax({
            url: '/adverts/favs/',
            type: 'DELETE',
            data: {num: num},
      })
      .then((response) => {
            location = response.redirect('');
      });
})};