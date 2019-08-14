import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.function();
  }
   MAX_WIDTH = 1000;
    MENU_CLASS = "menu-hide";
    menu_width=0;
    statusHitMenu = false;
    not_loaded = false;
    statusMenu = "open";//checa se o menu está aberto ou não
    CLASS_MENU_RETRAIDO = "menu-retraido";
  //----------------------------------------------------------
   
  function ()
  {
      this.initMenu();
      $(window).resize(this.resizeWindow);
      this.resizeWindow();
  
      //----------------------------
      $(".button-actions").click(function(){
          if($(this).hasClass('active'))
          {
              $(".boxWrapperActions-wrapper").removeClass('active');
              $(".boxWrapperActions-wrapper").stop(true,true).slideUp(300);
              $(".button-actions").removeClass('active');
          }
          else
          {
              $(".boxWrapperActions-wrapper").addClass('active');
              $(".boxWrapperActions-wrapper").stop(true,true).slideDown(300);
              $(".button-actions").addClass('active');
          }
  
          return false;
      });
  
      $("#bt_item_user").click(function(){
          if($(this).hasClass('active'))
          {
              $("#bt_item_user").removeClass('active');
              $(".boxOptions-item_user .boxOptionsWrapper-container").stop(true,true).fadeOut(300);
          }
          else
          {
              $("#bt_item_user").addClass('active');
              $(".boxOptions-item_user .boxOptionsWrapper-container").stop(true,true).fadeIn(300);
          }
  
          return false;
      });
  }
  
  
  
   retrairMenu ()
  {
      var _timer = 300;
  
      $('body').addClass(this.CLASS_MENU_RETRAIDO);
      var _anim_01 = {left:-280,opacity:0};
  
      $("#menu").stop(true,true).animate(_anim_01,_timer);
      $("#hit-menu").stop(true,true).show();
      $('#header .button-menu-mobile').stop(true,true).show();
      $('#header .button-menu-mobile').stop(true,true).animate({opacity:1},_timer);
      $("#header .menu-modulos .menu-modulosInner").stop(true,true).animate({paddingLeft:0},_timer);
      $("#conteudo .conteudo-inner").stop(true,true).animate({paddingLeft:0},_timer);
  
      this. hideBackgroundMenuMobile();
  }
  
   expandirMenu ()
  {
      $('body').removeClass(this.CLASS_MENU_RETRAIDO);
      var _anim_01 = {left:0,opacity:1};
  
      $("#menu").stop(true,true).animate(_anim_01);
      $("#hit-menu").stop(true,true).hide();
      $("#conteudo .conteudo-inner").stop(true,true).animate({paddingLeft:260});
  
      $('#header .button-menu-mobile').stop(true,true).animate({opacity:0},function(){
          $('#header .button-menu-mobile').stop(true,true).hide();
      });
      $("#header .menu-modulos .menu-modulosInner").stop(true,true).animate({paddingLeft:280});
  
      if(($(window).width()<=768))
      {
        this.showBackgroundMenuMobile ();
      }
  
  }
  
    resizeWindow ()
  {
      var _w = $(window).width();
  
  
      if(_w > this.MAX_WIDTH)//expandir menu
      {
          if($('body').hasClass(this.CLASS_MENU_RETRAIDO))
          {
              if(this.statusMenu != "closed")
              {
                this. expandirMenu ();
              }
          }
          if(this.statusMenu == "open_by_menu_mobile")
          {
            this. statusMenu = "open";
          }
      }
      else//retrair menu
      {
          if(!$('body').hasClass(this.CLASS_MENU_RETRAIDO))
          {
              if(this.statusMenu != "open_by_menu_mobile")
              {
                //this. retrairMenu ();
                var _timer = 300;
  
      $('body').addClass(this.CLASS_MENU_RETRAIDO);
      var _anim_01 = {left:-280,opacity:0};
  
      $("#menu").stop(true,true).animate(_anim_01,_timer);
      $("#hit-menu").stop(true,true).show();
      $('#header .button-menu-mobile').stop(true,true).show();
      $('#header .button-menu-mobile').stop(true,true).animate({opacity:1},_timer);
      $("#header .menu-modulos .menu-modulosInner").stop(true,true).animate({paddingLeft:0},_timer);
      $("#conteudo .conteudo-inner").stop(true,true).animate({paddingLeft:0},_timer);
  
      this. hideBackgroundMenuMobile();
              }
          }
      }
  
      if(_w >= 768)
      {
          if($('.menu-mobile-background').hasClass("on"))
          {
            this. hideBackgroundMenuMobile ();
          }
      }
      else
      {
          if(this.statusMenu == "open_by_menu_mobile")
          {
             this.showBackgroundMenuMobile();
          }
      }
  }
  
    initMenu ()
  {
      this.menu_width = $("#menu .menu").width();
  const dis = this;
      $(".menu-back").click(function(){
  
          var _pos = $(".menu-slider").position().left + dis.menu_width;
          var _obj = $(this).closest(".submenu");
  
          $(".menu-slider").stop().animate({left: _pos}, 300, function ()
          {
              _obj.hide();
          });
  
          return false;
      });
  
      $(".menu-anchor").click(function(){
          var _d = $(this).data('menu');
          $(".submenu").each(function(){
  
              var _d_check = $(this).data('menu');
  
              if(_d_check == _d)
              {
                  $(this).show();
                  var _pos = $(".menu-slider").position().left - dis.menu_width;
  
                  $(".menu-slider").stop(true,true).animate({left: _pos}, 300);
                  return false;
              }
          });
  
          return false;
      });
  
     $(".header-controlMenuButton").click(function()
      {
          dis.statusMenu = "closed";
          dis.retrairMenu ();
          return false;
      });
  
      $(".button-menu-mobile").click(function(){
          dis.statusMenu = "open_by_menu_mobile";
          dis.expandirMenu();
          return false;
      });
  
      $(".menu-mobile-background").mousedown(function(){
          dis.retrairMenu();
      });
  
      $('#hit-menu').mouseenter(function(){
          dis.statusHitMenu = true;
          dis.expandirMenu();
      });
  
      $('#menu').mouseleave(function(){
          if(dis.statusHitMenu)
          {
              dis.statusHitMenu = false;
             dis. retrairMenu();
          }
      });
  
  }
  
    hideBackgroundMenuMobile ()
  {
      $('.menu-mobile-background').removeClass("on");
      $('.menu-mobile-background').stop(true,true).animate({opacity:0},function(){
          $('.menu-mobile-background').stop(true,true).hide();
          $('.menu-mobile-background').removeAttr('style');
      });
  }
  
    showBackgroundMenuMobile ()
  {
      $('.menu-mobile-background').addClass("on");
      $('.menu-mobile-background').stop(true,true).show();
      $('.menu-mobile-background').stop(true,true).animate({opacity:1});
  }
  

}
