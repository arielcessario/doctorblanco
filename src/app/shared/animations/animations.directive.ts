import { Directive, HostListener, Host, NgZone, ElementRef, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { AnimationBuilder, animate, style } from '@angular/animations';


@Directive({
  selector: '[animate], animate',
  host: {}
})
export class AnimationsDirective {
  latestKnownScrollY: number = 0;
  ticking: boolean = false;

  @Input('correctionOut') correctionOut: number = 0;
  @Input('correctionIn') correctionIn: number = 0;
  @Input('preset') preset: string = '';
  @Input('timing') timing: number = 1000;
  @Input('customAnimation') customAnimation: any = {};

  shown: boolean = false;

  constructor(private ngZone: NgZone, private el: ElementRef, private _builder: AnimationBuilder) {
  }

  makeAnimation() {

    if (this.shown) {
      return;
    }
    // first build the animation
    let myAnimation: any;

    if (this.preset === '') {
      myAnimation = this._builder.build(this.customAnimation);
    } else {
      switch (this.preset) {
        case 'slideFromLeft':
          myAnimation = this._builder.build([
            style({ transform: 'translate(-100%)' }),
            animate(this.timing, style({ transform: 'translate(0)' }))
          ]);
          break;
        case 'slideFromRight':
          myAnimation = this._builder.build([
            style({ transform: 'translate(100%)' }),
            animate(this.timing, style({ transform: 'translate(0)' }))
          ]);
          break;
        case 'fadeIn':
          myAnimation = this._builder.build([
            style({ opacity: 0, visibility: 'collapse' }),
            animate(this.timing, style({ opacity: 1, visibility: 'visible' }))
          ]);
          break;
        default:
          myAnimation = this._builder.build([
            style({ opacity: 0, visibility: 'collapse' }),
            animate(this.timing, style({ opacity: 1, visibility: 'visible' }))
          ]);
          break;
      }
    }




    // then create a player from it
    const player = myAnimation.create(this.el.nativeElement);

    player.play();
    this.shown = true;
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event) {

    this.latestKnownScrollY = window.scrollY;
    this.requestTick();
    // const verticalOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  requestTick() {
    if (!this.ticking) {
      this.ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          this.update();
        });
      });
      this.ticking = true;
    }
  }


  update() {
    let currentScrollY = this.latestKnownScrollY;

    let rect = this.el.nativeElement.getBoundingClientRect();

    let top_adentro = false;
    let bottom_adentro = false;


    let correctionOut = (this.correctionOut == undefined) ? 0 : this.correctionOut;
    let correctionIn = (this.correctionIn == undefined) ? 0 : this.correctionIn;

    let val = rect.top >= (0 - correctionIn) &&
      rect.left >= 0 &&
      rect.bottom <= ((window.innerHeight || document.documentElement.clientHeight) - correctionOut) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    // /*or $(window).width() */

    let inOnce = false;


    // //Me fijo si la parte de arriba es visible
    top_adentro = rect.top <= ((window.innerHeight || document.documentElement.clientHeight) - this.correctionOut)
      && rect.top > 0;

    // //Me fijo si la parte de abajo es visible
    bottom_adentro = (rect.bottom <= ((window.innerHeight || document.documentElement.clientHeight) - this.correctionIn)
      && rect.bottom > 0) || (rect.top < 0 && rect.bottom > 0);


    if (top_adentro || bottom_adentro) {

      this.makeAnimation();
      // this.active = true;
      // if (!$element.hasClass($scope.animationIn)) {
      //     $element.addClass($scope.animationIn);
      // }
    }

    if (!top_adentro && !bottom_adentro) {
      this.shown = false;
      // this.active = false;
      // $element.removeClass($scope.animationIn);
    }

    this.ticking = false;

    // ---------------------------------------------------------------
    //if (rect.bottom <= ((window.innerHeight || document.documentElement.clientHeight) - $scope.correctionOut)) {
    //    if (!$element.hasClass($scope.animationIn)) {
    //        $element.addClass($scope.animationIn);
    //    }
    //} else {
    //    $element.removeClass($scope.animationIn);
    //}

    //if (rect.top >= (0 - $scope.correctionIn)) {
    //    if (!$element.hasClass($scope.animationOut)) {
    //        $element.addClass($scope.animationOut);
    //    }
    //}else{
    //    $element.removeClass($scope.animationOut);
    //}

  }


}
