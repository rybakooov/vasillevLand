
/* табы */
function slideTabs(_this){
  _this.find($('.tabs__slide')).css({
    'left': _this.find($('.tabs__tab.active')).position().left,
    'width': _this.find($('.tabs__tab.active')).width()
  })
  _this.find($('.blocks__block.active')).show();
}
/* табы end */


$(document).ready(function(){
  
  /* табы */
  $('.tabs-wrap').each(function(){
    slideTabs($(this));
  })


  $(document).on('click', '.tabs__tab:not(.active)', function(){
    if($(this).closest('.tabs-wrap').find('*').is(':animated')){
      return false
    } 
    var _this = $(this).closest('.tabs-wrap');
    _this.find($('.tabs__tab.active')).removeClass('active');
    $(this).addClass('active');
    /*console.log($('.blocks__block:animated').stop());*/
    _this.find($('.blocks__block.active')).removeClass('active').fadeToggle();
    setTimeout(() => {
      _this.find($(`.blocks__block[data-tabs="${$(this).attr('data-tabs')}"]`)).addClass('active').fadeToggle();
    }, 400)


    slideTabs(_this);
  })
  /* табы end */


  /* clinic slider */
  if($('.clinic-slider').length){
    $('.clinic-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      prevArrow: $('.clinic-arrows__prev'),
      nextArrow: $('.clinic-arrows__next'),
    })
  }
  /* clinic slider end */


  /*faq item */
  $(document).on('click', '.faq-item-top', function(){
    $(this).closest('.faq-item').toggleClass('active');
    $(this).closest('.faq-item').find('.faq-item-main').slideToggle();
  })
  /*faq item end */






  /* form file input */
  $(document).on('change', '.form-label_file input', function(){
    if(this.files.length){
      if(valideteFiles(this.files)){
        this.value = '';
        $(this).siblings('.form-file').find('.form-file__text').html(`Загружено > 20 мб`)
        $(this).siblings('.form-file').find('.form-file__text').css('color', 'red');
        $(this).siblings('.form-file-overlay').css('opacity', '1');
        return false
      }
      $(this).siblings('.form-file').find('.form-file__text').css('color', 'rgba(0, 0, 0, 0.25)');
      $(this).siblings('.form-file-overlay').css('opacity', '1');
      $(this).siblings('.form-file').find('.form-file__text').html(`Загружено ${this.files.length}`)
      $(this).siblings('.form-file__close').fadeIn('fast');
    } 
  })

  
  $(document).on('click', '.form-file__close', function(e){
    e.preventDefault();
    $(this).siblings('input')[0].value = '';
    $(this).fadeOut('fast');
    $(this).siblings('.form-file-overlay').attr('style', '');
    $(this).siblings('.form-file').find('.form-file__text').html(`До 20 мб`)
  })

  const _maxFilesize = 20971520;
  function valideteFiles (file){
    var j = 0;
    var NumberOfFiles = file.length;
    var sumFiles = 0;
    for(j; j< NumberOfFiles;j++){
      sumFiles+=file[j].size;
    }
    console.log(sumFiles);
    console.log(_maxFilesize);
    if (sumFiles >= _maxFilesize ){
      return true
    } else {
      return false
    }
  }
  /* form file input end */



  /* form mask + validate */

  $(document).on('blur', '[data-type="text"]', function(){
    validateText($(this));
  })

  
  $(document).on('blur', '[data-type="tel"]', function(){
    validateTel($(this));
  })

  $(document).on('click', '[data-type="submit"]', function(e){
    e.preventDefault();
    let valid = true;
    $('[data-type="text"]').each(function(){
      if (!validateText($(this))){
        valid = false;
      }
    })
    $('[data-type="tel"]').each(function(){
      if (!validateTel($(this))){
        valid = false;
      }
    })
    if(valid) {
      console.log('Отправили форму');
    } else {
      console.log('Не отправили форму');
    }
  })

  var phoneMask = IMask(
    document.querySelector('[data-type="tel"]'), {
      mask: '+{7} (000) 000-00-00'
    }
  );


  function validateText(input){
    if (input.attr('data-required') == 'true') {
      if (input.val() == '') {
        input.removeClass('input-valid');
        input.addClass('input-error');
        return false;
      } else {
        input.removeClass('input-error');
        input.addClass('input-valid');
        return true;
      }
    } else {
      if (input.val() != '') {
        input.removeClass('input-error');
        input.addClass('input-valid');
        return true;
      } else {
        input.removeClass('input-valid');
        input.removeClass('input-error');
        return true;
      }
    }
  }
  function validateTel(input){
    if (input.attr('data-required') == 'true') {
      if (input.val() == '') {
        input.removeClass('input-valid');
        input.addClass('input-error');
        return false;
      } else {
        if (input.val().length != 18) {
          input.removeClass('input-valid');
          input.addClass('input-error');
          return false;
        } else {
          input.removeClass('input-error');
          input.addClass('input-valid');
          return true;
        }
      }
    } else {
      if (input.val().length == 18) {
        input.removeClass('input-error');
        input.addClass('input-valid');
        return true;
      } else {
        input.removeClass('input-valid');
        input.removeClass('input-error');
        return true;
      }
    }
  }
  
  /* form mask + validate end */
});
