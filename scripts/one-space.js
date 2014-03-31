/* 
* @Author: hanjiyun
* @Date:   2014-03-19 15:04:09
* @Last Modified by:   hanjiyun
* @Last Modified time: 2014-03-31 15:44:54
*/


$(function(){
    // $('#video a.play').click(function(){
        // $('#video .disruptor-container').fadeOut(240);
        // $('#video').css({
        //     'position':'fixed',
        //     'z-index':1000,
        //     top:0,
        //     left:0
        // })
        // $('body').css({
        //     'overflow':'hidden'
        // })
        // $('#macro').css({
        //     'z-index':2
        // })
    // })

// draw line

    var c_1 = document.getElementById("line_1");
    var cxt_1 = c_1.getContext("2d");
    cxt_1.beginPath();
    cxt_1.moveTo(50, 0);
    cxt_1.lineTo(0,125);
    cxt_1.lineWidth = 2;
    cxt_1.strokeStyle = '#0bab43';
    cxt_1.lineCap = 'round';
    cxt_1.stroke();

    var c_2 = document.getElementById("line_2");
    var cxt_2 = c_2.getContext("2d");
    cxt_2.beginPath();
    cxt_2.moveTo(462, 0);
    cxt_2.lineTo(0, 488);
    cxt_2.lineWidth = 2;
    cxt_2.strokeStyle = '#0bab43';
    cxt_2.lineCap = 'round';
    cxt_2.stroke();

    var c_5 = document.getElementById("line_5");
    var cxt_5 = c_5.getContext("2d");
    cxt_5.beginPath();
    cxt_5.moveTo(0,180);
    cxt_5.lineTo(475,5);
    cxt_5.lineWidth = 2;
    cxt_5.strokeStyle = '#0bab43';
    cxt_5.lineCap = 'round';
    cxt_5.stroke();



    var c_3 = document.getElementById("line_3");
    var cxt_3 = c_3.getContext("2d");
    cxt_3.beginPath();
    cxt_3.moveTo(41,27);
    cxt_3.lineTo(141,169);
    cxt_3.lineWidth = 2;
    cxt_3.strokeStyle = '#fff';
    cxt_3.lineCap = 'round';
    cxt_3.stroke();

    var c_4 = document.getElementById("line_4");
    var cxt_4 = c_4.getContext("2d");
    cxt_4.beginPath();
    cxt_4.moveTo(32, 32);
    cxt_4.lineTo(151,61);
    cxt_4.lineWidth = 2;
    cxt_4.strokeStyle = '#fff';
    cxt_4.lineCap = 'round';
    cxt_4.stroke();


    // BEGIN Navigation
    var $root = $('html, body');
    $('a.nav').click(function() {
        var href = $.attr(this, 'href');
        // console.log(href)
        $root.animate({
            scrollTop: $(href).offset().top
        }, 1500, function () {
        window.location.hash = href;
    });
        return false;
    });
    // END Navigation

    // BEGIN FancyBox
    $(".fancybox").fancybox();
    
    $('.fancybox-media').attr('rel', 'media-gallery').fancybox({
        openEffect : 'elastic',
        closeEffect : 'elastic',
        openSpeed: 250,
        prevEffect : 'none',
        nextEffect : 'none',
        padding: 0,
        arrows : false,
        helpers : {
            media : {},
            buttons : {},
            overlay : {
                closeClick : false,  // if true, fancyBox will be closed when user clicks on the overlay
                speedOut   : 200,   // duration of fadeOut animation
                showEarly  : true,  // indicates if should be opened immediately or wait until the content is ready
                css        : {
                    'background-image':'none',
                    'background-color':'rgba(255,255,255,.9)',
                },    // custom CSS properties
                locked     : true   // if true, the content will be locked into overlay
            }
        }
    });
    // END FancyBox


    // BEGIN Video Controls
    // $("#section_2").hover(
    //     function(e){
    //         this.getElementsByTagName('video')[0].play();
    //         this.getElementsByTagName('video')[1].play();
    //     },
    //     function(e){
    //         this.getElementsByTagName('video')[0].pause();
    //         this.getElementsByTagName('video')[1].pause();
    //     }
    // );
    // END Video Controls

    $('#section_7_pic .ripple').click(function(){
        if($(this).siblings('i').css('visibility') == 'hidden'){
            $(this).siblings('i, canvas, dl').animate({
                'opacity': 1
            },200).css("visibility", 'visible');
        } else {
            $(this).siblings('i, canvas, dl').animate({
                'opacity': 0
            },200).css("visibility", 'hidden');
        }
    })

// wave

    function showWave(){
        var canvas = document.getElementById('wave_line');
        var ctx = canvas.getContext('2d');

        var stageWidth = 0;
        var stageHeight = 0;
        var stageWidth2 = 0;
        var stageHeight2 = 0;
        var totalLength2 = 0;

        var distanceX = 0;

        var config = {
            canvasHeight : 152,
            height: 18, //曲线波动高度
            waveLength: 180, //曲线波动长度
            curveFactor: 1.6, //曲线因子 左右距离
            speed: 6, //曲线速度
            lineWidth : 2, //曲线粗细
            strokeStyle : 'green', //曲线颜色
            fillStyle : 'transparent' //曲线底部颜色填充
            // fillStyle : '#00ce9e' //曲线底部颜色填充
        }

        var DELTA_WIDTH = 1;

        function init(){
            window.onresize = onResize;
            onResize();
            render();
        }

        function onResize(){
            stageWidth = canvas.width = window.innerWidth;
            stageHeight = canvas.height = window.innerHeight;

            // stageHeight = canvas.height = config.canvasHeight;
            // todo 高度判断
            stageWidth2 = stageWidth / 2;
            stageHeight2 = stageHeight / 2;
            totalLength2 = Math.ceil(stageWidth2 / DELTA_WIDTH) * DELTA_WIDTH;
            redraw();
        }

        function render(){
            // stats.begin();
            redraw();
            requestAnimationFrame(render);
            // stats.end();
        }

        function _getHeight(distanceX, x) {
            var offsetX = ((distanceX + x) /totalLength2 - 1) * (totalLength2 / config.waveLength);
            var waveFactor = Math.cos((x / totalLength2 - 1) * Math.PI / 2);
            return Math.cos(offsetX * Math.PI) * Math.pow(waveFactor, config.curveFactor) * config.height;
        }

        function redraw(){
            var x = stageWidth2 - totalLength2;
            var toX = x + totalLength2 * 2;
            var centerY = stageHeight2;
            ctx.clearRect(0, 0, stageWidth, stageHeight);
            ctx.beginPath();
            // ctx.moveTo(x, stageHeight);
            for(; x < toX; x+=DELTA_WIDTH){
                ctx.lineTo(x, centerY - _getHeight(distanceX, x));
            }
            // ctx.lineTo(x-DELTA_WIDTH, stageHeight);
            ctx.lineWidth = config.lineWidth;
            ctx.strokeStyle = config.strokeStyle;
            ctx.fillStyle = config.fillStyle;
            ctx.fill();
            ctx.stroke();
            distanceX += config.speed;
        }
        init();
    }

// overlay

    $('.overlay_btn').click(function(){
        if($('body').hasClass('form_overlay_enabled')){
            $('body').removeClass('form_overlay_enabled');
        } else {
            $('body').addClass('form_overlay_enabled');
        }
        
    })
    $('.form_overlay_close').click(function(){
        $('body').removeClass('form_overlay_enabled');
    })

    // $('.overlay_btn').on('tap', function(){
    //     console.log(1);
    //     $('body').addClass('form_overlay_enabled');
    // })
    // $('.form_overlay_close').on('tap', function(){
    //     $('body').removeClass('form_overlay_enabled');
    // })

//share btn toggle

    var share_opend = false;
    $('#share_toggle').click(function(){
        var $t = $(this),
            share = $('#share');

        if(share_opend === false){
            $t.animate({
                'top': 40,
                'height':20
            }, 200).html('<i class="fa fa-angle-up"></i>').css({
                'line-height' : '20px'
            });
            share.css({
                'background-color':'rgba(0,0,0,0.8)',
                'border-radius':'0 0 0 5px',
            }).animate({
                'top': -5
            }, 110)
            share_opend = true;
        } else {
            $t.animate({
                'top': 0,
                'height' : 40
            }, 100).html('分享').css({
                'line-height' : '40px'
            });
            share.animate({
                'top': -50
            }, 200, function(){
                share.css({
                    'background-color':'transparent',
                    'border-radius':0,
                });
            })
            share_opend = false;
        }
        
    })

//share to SNS
    var n = window.document;
    var m = "穿在身上的手机娱乐搜索",
        g = "Boom!!! 豌豆荚 One-Space 发布——完美集成「手机娱乐搜索」及「增强现实」的智能服装，彻底改变局限在小屏幕上的娱乐体验，通过全息投影创造「沉浸式空间」呈现丰富内容，还可以将远方好友投影到身边实时互动！猛戳右边申请试用，仅限今天！http://www.wandoujia.com/onespace", //description
        y = "Boom!!! 豌豆荚 One-Space 发布——完美集成「手机娱乐搜索」及「增强现实」的智能服装，彻底改变局限在小屏幕上的娱乐体验，通过全息投影创造「沉浸式空间」呈现丰富内容，还可以将远方好友投影到身边实时互动！猛戳右边申请试用，仅限今天！http://www.wandoujia.com/onespace", // text weibo
        b = "54354", // title

        // 配图
        w = "http%3A%2F%2Fimg.wdjimg.com%2Faward%2Fupload%2Fone%2Fweibo-28.png",

        // 静态URL
        url = "http%3A%2F%2Fwww.wandoujia.com%2Fonespace",
        test_url = "http%3A%2F%2Fwww.douban.com%2F",

        // douban
        D = "http://www.douban.com/share/service?image="+ w +"&href="+ url +"&name="+ m +"&text=" + y,

        // 微博
        E = "http://service.weibo.com/share/share.php?appkey=1483181040&relateUid=1727978503&title=" + y + "&url=&pic=" + w,

        // E =  "http://service.weibo.com/share/share.php?title="+ g +"&url=http://t.jiathis.com/CWy&source=bookmark&appkey=1483181040&pic=&ralateUid="

        // facebook
        S =  "https://www.facebook.com/sharer/sharer.php?s=100&p[title]="+ encodeURIComponent(m) +"&p[summary]="+ g +"&p[url]="+ url +"&p[images]="+ w,

        // google+
        x = "https://plus.google.com/share?url=" + url,

        // twitter
        T = "https://twitter.com/intent/tweet?related=wandoujia&text=" + y + "&url=" + url,

        // renren
        N = "http://widget.renren.com/dialog/share?title=" + encodeURIComponent(m) + "&resourceUrl="+ url +"&pic=" + w + "&description=" + y,

        // 腾讯微博
        // C = "http://share.v.t.qq.com/index.php?c=share&a=index&appkey=100273333&title=" + encodeURIComponent(m) + "&url=http%3A%2F%2Fone.wandoujia.com%2F%3Futm_source%3Drenren%26utm_medium%3Dshare%26utm_campaign%3Dhanhan-one&pic=" + w,

        Q = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+ url +"&title="+ m +"&pics="+ w +"&summary=" + g,

        // 百度贴吧
        B = "http://tieba.baidu.com/f/commit/share/openShareApi?title="+ m +"&desc="+ g +"&comment="+ y +"&pic="+ w +"&url=" + url;





    $(n).on("click", "#share li", function() {
        var t = $(this),
            n = $("<a>");
        n.attr({
            target: "_blank"
        });
        switch (t[0].id) {
            case "s_douban":
                n.attr({
                    href: D
                });
                break;
            case "s_weibo":
                n.attr({
                    href: E
                });
                break;
            // case "s_wechat":
            //     // n.attr({
            //     //     href: E
            //     // });
            //     break;
            case "s_renren":
                n.attr({
                    href: N
                });
                break;
            // case "qq":
            //     n.attr({
            //         href: C
            //     });
            //     break;
            case "s_q-zone":
                n.attr({
                    href: Q
                });
                break;
            case "s_baidutieba":
                n.attr({
                    href: B
                });
                break;
            case "s_twitter":
                n.attr({
                    href: T
                });
                break;
            case "s_facebook":
                n.attr({
                    href: S
                });
                break;
            case "s_googleplus":
                n.attr({
                    href: x
                })
        }!$.browser.msie && !$.browser.mozilla ? n[0].click() : e.open(n.attr("href"));
        // _gaq.push(["_trackEvent", "one", "share", t[0].id])
    });


// scroll
    var section_2 = document.getElementById('section_2');
    var section_3 = document.getElementById('section_3');
    var section_5 = document.getElementById('section_5');
    var section_7 = document.getElementById('section_7');

    window.onscroll = function(){
        var scrollTop = $(document).scrollTop();

        var section_2_offset_y =  section_2.offsetTop;
        var section_3_offset_y =  section_3.offsetTop;
        // var section_5_offset_y =  section_5.offsetTop;
        var section_7_offset_y =  section_7.offsetTop;

        var gap_2 =  section_2_offset_y - scrollTop;
        var gap_3 =  section_3_offset_y - scrollTop;
        // var gap_6 =  section_5_offset_y - scrollTop;
        var gap_8 =  section_7_offset_y - scrollTop;

        // console.log(gap_3)

        if( 500 > gap_2 && gap_2 > -200 && window.innerWidth > 768){
            addBili(2);
        } else {
            removeBili(2);
        }

        if( 200 > gap_3 && gap_3 > -500 && window.innerWidth > 768){
            $('#shape').addClass('spin');
            $('#section_3 .ripple').addClass('bili');
        } else {
            $('#shape').removeClass('spin');
            removeBili(3);
        }

        // if( 200 > gap_6 && gap_6 > -500){
        //     console.log(1);
        //     if (!$('#wave_line').hasClass('draw')) {
        //         console.log(2);
        //         $('#wave_line').css('display', 'block').addClass('draw');
        //         showWave();
        //     }
        // } else {
        //     if ($('#wave_line').hasClass('draw')) {
        //         $('#wave_line').css('display', 'none').removeClass('draw');
        //     }
        // }

        if( 400 > gap_8 && gap_8 > -500 && window.innerWidth > 768){

            addBili(7);
        } else {
            removeBili(7);
        }
    }

    function removeBili(elem){
        $('#section_'+ elem +' .ripple').removeClass('bili');
        $('#line_3, #line_4, #section_7_pic .feature_icons .one_icon, #section_7_pic .feature_icons dl').css({
            'opacity': 0,
            'visibility': 'hidden'
        })
    }

    function addBili(elem){
        $('#section_'+ elem +' .ripple').addClass('bili');
        $('#line_3, #line_4, #section_7_pic .feature_icons .one_icon, #section_7_pic .feature_icons dl').css({
            'opacity': 1,
            'visibility': 'visible'
        })
    }



// preview 
    $('#preview_slider li a').click(function(){
        var $t = $(this),
            $curr_li = $t.parents('li').eq(0),
            order = $curr_li.data('order');

        $('#preview_slider li').removeClass('active');
        $curr_li.addClass('active');


        $('#curr_preview').attr('src', 'images/clothe/model_detail_'+ order +'_big.jpg')
    })


    $('#size_table > a').click(function(){
        $('table.tg').toggle();
        $(this).find('i').toggleClass('fa-caret-up')
    })

    $('input[name=gender]').change(function(){
        if($(this).val() == 'men'){
            $('#women_size').hide();
            $('#men_size').show();
        }
        if($(this).val() == 'women'){
            $('#women_size').show();
            $('#men_size').hide();
        }
    })

    $('form#apply_form').submit(function(){
        var form = $(this),
            btn = form.find('button');

        btn.attr('disabled','disabled').addClass('loading').html('<i class="fa fa-spinner fa-spin"></i> 请稍候...');

        setTimeout(function(){

            // reset
            $('body').removeClass('form_overlay_enabled');
            document.getElementById("apply_form").reset();
            btn.removeAttr('disabled').removeClass('loading').html('填好了，提交申请');

            if(window.location.href.indexOf('hanjiyun') > 0){
                window.location.href = 'file://localhost/Users/hanjiyun/Google%20Drive/Project/onespace/april_fool.html'
            } else {
                window.location.href = '/april_fool.html';
            }

        }, 1200);

        return false;
    })

})



