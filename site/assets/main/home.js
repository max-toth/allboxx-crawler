(function() {
  $(function() {
    $(document).on('click', '.wrap-home .delete_cart_item', function(event) {
      if (confirm('Вы уверены?')) {
        $(this).closest('td').find('input[type=hidden]').val('true');
        $(this).closest('form').submit();
        return ga('send', 'event', 'Delete from cart', 'Delete from cart', 'Delete from cart');
      } else {
        return $(this).closest('td').find('input[type=hidden]').val('false');
      }
    });
    $(document).on('change', '.wrap-home td.amount input, .wrap-home  td.frequency select', function(event) {
      return $(this).closest('form').find('.apply_button').show(500);
    });
    $('.i_am_subscribed').hide();
    $(document).on('change', '.wrap-home .frequency select', function(event) {
      if ($('.frequency select:visible option:selected').text() === "") {
        return $('.i_am_subscribed').hide(500);
      } else {
        return $('.i_am_subscribed').show(1000);
      }
    });
    $(document).on('click', '.wrap-home .change_delivery_info', function(event) {
      $(this).hide().addClass('hidden');
      $(this).closest('form').find('.delivery_info.hidden').hide().removeClass('hidden').show(500);
      return $(this).closest('form').find('.apply_button').show(500);
    });
    return $(document).on('keypress', '.form-modal input', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        return $(this).closest('form.form-modal').find('input[type="submit"]').click();
      }
    });
  });

}).call(this);
