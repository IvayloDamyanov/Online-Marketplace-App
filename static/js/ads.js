$(function() {
    fetch('/categories')
        .then((res) => {
            return res.json();
        })
        .then((categories) => {
            const names = categories.map((cat) => cat.name);
            console.log(names);
            $('#autocomplete').typeahead({ source: names });
        });
});
