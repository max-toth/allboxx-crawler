(function() {
  $(function() {
    var stop;
    if ((typeof rails_env !== 'undefined') && rails_env === 'production') {
      $(document).on('click', '.ga_subscribe_me_header', function(event) {
        return ga('send', 'event', 'Oformit podpisku', 'Oformit podpisku on header', '');
      });
      $(document).on('click', '.go_btn:not(.go_btn_bottom)', function(event) {
        return ga('send', 'event', 'Oformit podpisku', 'Oformit podpisku on page', '');
      });
      $(document).on('click', '.go_btn_bottom', function(event) {
        return ga('send', 'event', 'Oformit podpisku', 'Oformit podpisku on footer', '');
      });
      $(document).on('click', '.ga_login_header_link', function(event) {
        return ga('send', 'event', 'Login', 'Login', 'Login');
      });
      $(document).on('click', '.new_client_button', function(event) {
        var capacity, cats;
        capacity = $(this).attr('data-cart-capacity');
        cats = $(this).attr('data-categories');
        ga('send', 'event', 'Finish goods picking', "Full cart with " + capacity, "Full cart with " + cats, {
          'page': '/finish-goods-picking'
        });
        return ga('send', 'pageview', '/finish-goods-picking');
      });
      $(document).on('click', '.ga_didnt_find', function(event) {
        return ga('send', 'event', 'New goods request', 'New goods request', 'New goods request');
      });
      if ($('.mini-cart').length > 0) {
        $(document).on('click', '.category_open_link', function(event) {
          var name, parent_name;
          parent_name = $(this).attr('data-parent-name');
          name = $(this).attr('data-name');
          ga('send', 'event', 'Category open', "" + parent_name + " cat open", "" + name + " open");
          return ga('send', 'pageview', "/" + parent_name + "-" + name);
        });
        $(document).on('click', '.subcategory_open_link', function(event) {
          var name, parent_name, root_name;
          root_name = $(this).attr('data-root-name');
          parent_name = $(this).attr('data-parent-name');
          name = $(this).attr('data-name');
          ga('send', 'event', 'subCategory open', "" + root_name + "-" + parent_name + " cat open", "" + name + " open");
          return ga('send', 'pageview', "/" + root_name + "-" + parent_name + "-" + name);
        });
        stop = false;
        $(window).scroll(function() {
          if ($(this).scrollTop() > 900 && !stop) {
            ga('send', 'event', 'Catalog viewing', 'catalog viewing', 'catalog viewing');
            ga('send', 'pageview', '/catalog-viewing');
            return stop = true;
          }
        });
        $(document).on('click', '.add_to_cart_button', function(event) {
          var cat_name, order_n;
          cat_name = $(this).attr('data-cat-name');
          order_n = $(this).attr('data-order-n');
          return ga('send', 'event', 'Add to cart', "Add to cart " + cat_name, "Add to cart " + order_n);
        });
        $(document).on('click', '.remove_from_cart_button', function(event) {
          return ga('send', 'event', 'Delete from cart', 'Delete from cart', 'Delete from cart');
        });
      }
      $(document).on('click', '.delete_cart_item', function(event) {
        return ga('send', 'event', 'Delete from list', 'Delete from list', 'Delete from list');
      });
      $(document).on('change', '.delivery_items .frequency select', function(event) {
        return ga('send', 'event', 'Friquency picking', 'Friquency picking', 'Friquency picking');
      });
      $(document).on('click', '.ga_remove_item_from_delivery', function(event) {
        return ga('send', 'event', 'Delete from supply', 'Delete from supply', 'Delete from supply');
      });
      $(document).on('click', '.ga_change_all_items', function(event) {
        return ga('send', 'event', 'Supply creation', 'Supply creation', 'Supply creation');
      });
      $(document).on('click', '.ga_change_delivery', function(event) {
        return ga('send', 'event', 'Supply changing', 'Supply changing', 'Supply changing');
      });
      $(document).on('click', '.login_with_password_link', function(event) {
        return ga('send', 'event', 'Login', 'Login', 'Login');
      });
      $(document).on('blur', '.ga_email_field, .ga_name_field', function(event) {
        var field;
        if ($(this).val() !== '') {
          field = (function() {
            switch (false) {
              case !$(this).attr('class').match('ga_email_field'):
                return 1;
              case !$(this).attr('class').match('ga_name_field'):
                return 2;
            }
          }).call(this);
          ga('send', 'event', 'registration data filling', "" + field + " field filling", "" + field + " field filling");
          return ga('send', 'pageview', "/registration-data-filling-" + field);
        }
      });
      $(document).on('submit', 'form.ga_submit_registration', function(event) {
        ga('send', 'event', 'registration data submit', 'registration data submit', 'registration data submit');
        ga('send', 'pageview', '/registration-data-submit');
        return yaCounter25237208.reachGoal('registration-data-submit');
      });
      $(document).on('blur', '.ga_name_field, .ga_phone_field, .ga_district_field, .ga_street_field, .ga_house_field, .ga_corp_field, .ga_apartment_field, .ga_d_day_field, .ga_d_time_field', function(event) {
        var field;
        if ($(this).val() !== '') {
          field = (function() {
            switch (false) {
              case !$(this).attr('class').match('ga_name_field'):
                return 1;
              case !$(this).attr('class').match('ga_phone_field'):
                return 2;
              case !$(this).attr('class').match('ga_district_field'):
                return 3;
              case !$(this).attr('class').match('ga_street_field'):
                return 4;
              case !$(this).attr('class').match('ga_house_field'):
                return 5;
              case !$(this).attr('class').match('ga_corp_field'):
                return 6;
              case !$(this).attr('class').match('ga_apartment_field'):
                return 7;
              case !$(this).attr('class').match('ga_d_day_field'):
                return 8;
              case !$(this).attr('class').match('ga_d_time_field'):
                return 9;
            }
          }).call(this);
          ga('send', 'event', 'personal data filling', "" + field + " field filling(pd)", "" + field + " field filling(pd)");
          return ga('send', 'pageview', "/personal-data-filling-" + field);
        }
      });
      return $(document).on('click', '.ga_submit_subscription', function(event) {
        ga('send', 'event', 'personal data submit', 'personal data submit', 'personal data submit');
        return ga('send', 'pageview', '/personal-data-submit');
      });
    }
  });

}).call(this);
