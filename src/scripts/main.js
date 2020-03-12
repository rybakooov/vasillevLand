
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
    $(this).find('.blocks').css('height', $(this).find('.blocks__block.active').height());
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
      
      _this.find('.blocks').css('height', _this.find('.blocks__block.active').height());
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
  $(document).on('click', '.faq-item-wrap', function(){
    $(this).find('.faq-item').toggleClass('active');
    $(this).find('.faq-item').find('.faq-item-main').slideToggle();
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
    file.value = '';
    console.log(file);
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
        input.siblings('.form-label__alert').html('Это обязательное поле');
        return false;
      } else {
        if (input.val().length != 18) {
          input.removeClass('input-valid');
          input.addClass('input-error');
          input.siblings('.form-label__alert').html('Телефон должен содержать 10 цифр');
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



  /* hover image */

  var imagesHover = document.querySelectorAll('.result-item-imgbox');
  for (index = 0; index < imagesHover.length; index++) {
    img = imagesHover[index];
    img.addEventListener('mousemove', mousemoveImgHandler);
    img.addEventListener('mouseleave', mouseleaveImgHandler);
  }

  function mousemoveImgHandler(e){
    let x1 = (-(200 - e.offsetX) * 0.05),
        y1 = (-(200 - e.offsetY) * 0.05);
    $(this).attr('style', 'transform: translate(' + x1 + 'px, ' + y1 + 'px)');
  }

  function mouseleaveImgHandler (){
    $(this).attr('style', '');
  }

  /* hover image end */

  
  /* header position */ 

  function moveHeader (){
    $('.header__burger').css('margin-right', Math.round($('.banner-main-woman img').width() * 0.74))
    $('.header-gray').css('width', $('.header-overlay').width() - $('.header-info__phone').offset().left + 80)
  }

  $('.banner-main-woman img').on('load', function() {
    
    moveHeader();
  });

  $(window).resize(function(){
    moveHeader();
  })

  /* header position end */



  /* burger + menu */ 
  var flagAnimated = 0;
  $(document).on('click', '.header__burger', function(){
    if (flagAnimated == 1) {
      return false
    }
    flagAnimated = 1;
    
    $(this).toggleClass('active');
    
    if($(this).hasClass('active')){
      $('.header-overlay').toggle(0 , function(){
        $('.header-overlay').toggleClass('active');
      });
    } else {
      $('.header-overlay').toggleClass('active');
      setTimeout(function(){
        $('.header-overlay').toggle();
      }, 500);
    }
    setTimeout(function(){
      flagAnimated = 0;
    }, 500)


  })


  $(document).on('click', '.header-overlay', function(e){
    if (e.target !== this)
      return;
      
      
    $('.header__burger').toggleClass('active');
    $('.header-overlay').toggleClass('active');
    setTimeout(function(){
      $('.header-overlay').toggle();
    }, 500)
  })

  /* burger + menu end */ 



});






