$(function() {
    $('.dropdown .dropdown-toggle').on('click', function() {
        const $this = $(this);
        $('.dropdown .dropdown-list').css('display', 'none');
        const $list = $this.next('.dropdown-list');
        $list.css('display', 'block');
    });
});
