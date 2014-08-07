(function() {
  $(function() {
    return $(document).on('change', '.wrap-catalog form input.input-short', function(event) {
      return $(this).closest('form').find('.apply_button').show(500);
    });
  });

}).call(this);
