(function() {
  $(function() {
    var maskList, maskOpts, validateInput;
    maskList = $.masksSort($.masksLoad("/phone-codes/phone-codes.json"), ['#'], /[0-9]|#/, "mask");
    maskOpts = {
      inputmask: {
        definitions: {
          '#': {
            validator: "[0-9]",
            cardinality: 1
          }
        },
        autoUnmask: true
      },
      match: /[0-9]/,
      replace: '#',
      list: maskList,
      listKey: "mask",
      onMaskChange: function(maskObj, determined) {
        var hint;
        if (determined) {
          hint = maskObj.name_ru;
          if (maskObj.desc_ru && maskObj.desc_ru(!"")) {
            hint += " (" + maskObj.desc_ru + ")";
          }
          $("#descr").html(hint);
        } else {
          $("#descr").html("Маска ввода");
        }
        return $(this).attr("placeholder", $(this).inputmask("getemptymask"));
      }
    };
    $('.phone').each(function() {
      if ($(this).val() === '') {
        $(this).val('+7(9__)___-__-__');
      }
      return $(this).inputmasks(maskOpts).on('keypress', function(e) {
        return validateInput('digits', 'Здесь могут быть только цифры', e);
      });
    });
    return validateInput = function(type, message, ev) {
      var alphar, anumar, digar, num, _i;
      digar = (function() {
        var _i, _results;
        _results = [];
        for (num = _i = 48; _i <= 57; num = ++_i) {
          _results.push(num);
        }
        return _results;
      })();
      alphar = (function() {
        var _i, _results;
        _results = [];
        for (num = _i = 48; _i <= 57; num = ++_i) {
          _results.push(num);
        }
        return _results;
      })();
      for (num = _i = 97; _i <= 122; num = ++_i) {
        alphar.push(num);
      }
      anumar = (function() {
        var _j, _results;
        _results = [];
        for (num = _j = 97; _j <= 122; num = ++_j) {
          _results.push(num);
        }
        return _results;
      })();
      if (digar.every(function(el) {
        return (type === 'digits' && el !== ev.which) || (type === 'alpha' && alphar.some(function(el2) {
          return el2 === ev.which;
        })) || (type === 'alphanum' && anumar.some(function(el3) {
          return el3 === ev.which;
        }));
      })) {
        return $(ev.target).attr('data-original-title', message).tooltip('show');
      } else {
        return $(ev.target).removeAttr('data-original-title');
      }
    };
  });

}).call(this);
