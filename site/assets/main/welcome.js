(function() {
  $(function() {
    $('.row.landing_flash').fadeOut(10000);
    return $(document).on('click', 'a[href="#"]', function(event) {
      return event.preventDefault();
    });
  });

}).call(this);
