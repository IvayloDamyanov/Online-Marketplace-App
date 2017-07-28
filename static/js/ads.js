$('#delete-ad').on('click', function (e) {
      const num = $('#delete-ad').data('adnum');
      console.log('EVENT...');
      $.ajax({
            url: 'adverts/ads/' + num,
            type: 'DELETE',
            data: {num: num},
      })
      .then((response) => {
            location = response.redirect;
      });
});