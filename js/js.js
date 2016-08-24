/**
 * Created by Administrator on 2016/8/31.
*/
(function($){
    $.fn.slider =function(ops){
        ops = $.extend({
            imgW:0, //图片宽度
            imgH:0, //图片高度
            movetime:1000, //动画执行时间
            timeout:6000, //间隔时间
            autoslider:true, //是否自动轮播
            addbtn:true, //是否加入按钮
            btnW:30, //按钮宽度
            btnH:30, //按钮高度
            btnbk_left:'url("images/left.png") no-repeat center',//按钮背景
            btnbk_right:'url("images/right.png") no-repeat center'
        },ops||{});

        ops.timeout =ops.timeout<1500?1500:ops.timeout;
        var ths=this,
            thslink=ths.find(".slider_img li"),
            thstop=ths.find(".wrap .slider_changetop li"),
            count= 0,
            imglenth=thslink.length,
            $btn;

        var init =function(){
            autoplay();
            //鼠标悬停到介绍小板轮播停止
            $('.slider .slider_changetop li').on("mouseover",function(){
                stopslider();
            })
            //鼠标离开介绍小板轮播开始
            $('.slider .slider_changetop li').on("mouseout",function(){
                autoplay();
            })
            if(ops.addbtn){
                creatbtn();
                $btn.eq(0).on("click",function(){
                    stopslider();
                    count--;
                    if(count<0){
                        count=imglenth-1;
                    }
                    play(count);
                })
                $btn.eq(0).on("mouseover",function(){
                    stopslider();
                    $btn.eq(0).css({"background":'url("images/chick_left.png") no-repeat center'});
                })
                $btn.eq(0).on("mouseout",function(){
                    $btn.eq(0).css({"background":ops.btnbk_left});
                    autoplay();
                })

                $btn.eq(1).on("click",function(){
                    stopslider();
                    count++;
                    if(count>imglenth-1){
                        count=0;
                    }
                    play(count);
                })
                $btn.eq(1).on("mouseover",function(){
                    stopslider();
                    $btn.eq(1).css({"background":'url("images/chick_right.png") no-repeat center'});
                })
                $btn.eq(1).on("mouseout",function(){
                    $btn.eq(1).css({"background":ops.btnbk_right});
                    autoplay();
                })

            }
        }
        function autoplay(){
            if(ops.autoslider==true){
                startslider();

            }
        }
        function index(){
            count++;
            if (count>imglenth-1){
               count=0;
            }
            play(count);
        }
        function play(index){
            //背景动画
            thslink.eq(index).stop(true,true).animate({opacity:1,"z-index":10},ops.movetime).siblings().animate({opacity:0,'z-index':8},ops.movetime);
            //小展板动画
            thstop.eq(index).stop(true,true).animate({bottom:0,opacy:1},ops.movetime).siblings().animate({bottom:'-100%',opacy:0});

        }

        //开始动画
        function startslider(){
            playlider=setInterval(index,ops.timeout);
        }
        //停止动画
        function stopslider(){
            clearInterval(playlider);
        }
        //添加按钮
        function creatbtn(){
            var btnTem =  '<span class="s_btn"></span><span class="s_btn"></span>';
            ths.append(btnTem);
            $btn =ths.find('.s_btn');

            $btn.css({
                "position": "absolute",
                "top": "50%",
                "margin-top": (-1) * ops.btnH / 2+"px",
                "width": ops.btnW + "px",
                "height": ops.btnH + "px",
                "cursor": "pointer",
                "background-color": ops.btnBk,
                "z-index": "20"
            });
            $btn.eq(0).css({"left":"10px","background":ops.btnbk_left});
            $btn.eq(1).css({"right":"10px","background":ops.btnbk_right});
        }

        init()
    }
})(jQuery);





( function( window ) {

    'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

    function classReg( className ) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ( 'classList' in document.documentElement ) {
        hasClass = function( elem, c ) {
            return elem.classList.contains( c );
        };
        addClass = function( elem, c ) {
            elem.classList.add( c );
        };
        removeClass = function( elem, c ) {
            elem.classList.remove( c );
        };
    }
    else {
        hasClass = function( elem, c ) {
            return classReg( c ).test( elem.className );
        };
        addClass = function( elem, c ) {
            if ( !hasClass( elem, c ) ) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function( elem, c ) {
            elem.className = elem.className.replace( classReg( c ), ' ' );
        };
    }

    function toggleClass( elem, c ) {
        var fn = hasClass( elem, c ) ? removeClass : addClass;
        fn( elem, c );
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

// transport
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( classie );
    } else {
        // browser global
        window.classie = classie;
    }

})( window );



( function( window ) {

    'use strict';

    function PathLoader( el ) {
        this.el = el;
        // clear stroke
        this.el.style.strokeDasharray = this.el.style.strokeDashoffset = this.el.getTotalLength();
    }

    PathLoader.prototype._draw = function( val ) {
        this.el.style.strokeDashoffset = this.el.getTotalLength() * ( 1 - val );
    }

    PathLoader.prototype.setProgress = function( val, callback ) {
        this._draw(val);
        if( callback && typeof callback === 'function' ) {
            // give it a time (ideally the same like the transition time) so that the last progress increment animation is still visible.
            setTimeout( callback, 200 );
        }
    }

    PathLoader.prototype.setProgressFn = function( fn ) {
        if( typeof fn === 'function' ) { fn( this ); }
    }

    // add to global namespace
    window.PathLoader = PathLoader;

})( window );


(function() {

    var support = { animations : Modernizr.cssanimations },
        container = document.getElementById( 'ip-container' ),
        header = container.querySelector( 'header.ip-header' ),
        loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
        animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
    // animation end event name
        animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

    function init() {
        var onEndInitialAnimation = function() {
            if( support.animations ) {
                this.removeEventListener( animEndEventName, onEndInitialAnimation );
            }

            startLoading();
        };

        // disable scrolling
        window.addEventListener( 'scroll', noscroll );

        // initial animation
        classie.add( container, 'loading' );

        if( support.animations ) {
            container.addEventListener( animEndEventName, onEndInitialAnimation );
        }
        else {
            onEndInitialAnimation();
        }
    }

    function startLoading() {
        // simulate loading something..
        var simulationFn = function(instance) {
            var progress = 0,
                interval = setInterval( function() {
                    progress = Math.min( progress + Math.random() * 0.1, 1 );

                    instance.setProgress( progress );

                    // reached the end
                    if( progress === 1 ) {
                        classie.remove( container, 'loading' );
                        classie.add( container, 'loaded' );
                        clearInterval( interval );

                        var onEndHeaderAnimation = function(ev) {
                            if( support.animations ) {
                                if( ev.target !== header ) return;
                                this.removeEventListener( animEndEventName, onEndHeaderAnimation );
                            }

                            classie.add( document.body, 'layout-switch' );
                            window.removeEventListener( 'scroll', noscroll );
                        };

                        if( support.animations ) {
                            header.addEventListener( animEndEventName, onEndHeaderAnimation );
                        }
                        else {
                            onEndHeaderAnimation();
                        }
                    }
                }, 80 );
        };

        loader.setProgressFn( simulationFn );
    }

    function noscroll() {
        window.scrollTo( 0, 0 );
    }

    init();

})();

