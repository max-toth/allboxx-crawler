(function() {
  $(function() {
    $(document).on('change', 'form #category_parent_id', function(event) {
      var id;
      id = $(this).val();
      if (id !== "") {
        return $('form #category_subcat_input').removeClass('hidden').find('select#category_subcat').attr('name', 'category[subcat]').val("").find('option').show().end().find("option:not([data-id=" + id + "])").hide();
      } else {
        return $('form #category_subcat_input').addClass('hidden').find('select#category_subcat').removeAttr('name');
      }
    });
    $(document).on('change', 'form #item_supercategory', function(event) {
      var id;
      id = $(this).val();
      if (id !== "") {
        return $('form #item_category_id_input').removeClass('hidden').find('select#item_category_id').attr('name', 'item[category_id]').val("").find('option').show().end().find("option:not([data-id=" + id + "])").hide();
      } else {
        return $('form #item_category_id_input').addClass('hidden').find('select#item_category_id').removeAttr('name');
      }
    });
    return $(document).on('change', 'form #item_category_id', function(event) {
      var id;
      id = $(this).val();
      if (id !== "") {
        return $('form #item_subcategory_input').removeClass('hidden').find('select#item_subcategory').attr('name', 'item[subcategory]').val("").find('option').show().end().find("option:not([data-id=" + id + "])").hide();
      } else {
        return $('form #item_subcategory_input').addClass('hidden').find('select#item_subcategory').removeAttr('name');
      }
    });
  });

}).call(this);
