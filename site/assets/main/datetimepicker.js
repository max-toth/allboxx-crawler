(function() {
  $(function() {
    $('#b_date').datepicker({
      changeYear: true,
      yearRange: "" + (new Date().getFullYear() - 80) + ":" + (new Date().getFullYear()) + "",
      dateFormat: 'dd.mm.yy',
      numberOfMonths: 1,
      showOtherMonths: true,
      constrainInput: true,
      firstDay: 1,
      monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      maxDate: new Date(new Date().getFullYear() - 16, new Date().getMonth(), new Date().getDate()),
      minDate: new Date(new Date().getFullYear() - 80, new Date().getMonth(), new Date().getDate()),
      showAnim: 'fadeIn'
    }).inputmask('dd.mm.yyyy', {
      placeholder: 'ДД.ММ.ГГГГ'
    });
    $('.datetimepicker').datetimepicker({
      lang: 'ru',
      format: 'd.m.Y H:i',
      allowTimes: ['00:00', '01:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      minDate: 0
    });
    return $('.timepicker').datetimepicker({
      datepicker: false,
      allowTimes: ['00:00', '01:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    });
  });

}).call(this);
