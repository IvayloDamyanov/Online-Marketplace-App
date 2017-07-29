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