(function (doc, win) {
    var width = 750;
    var height = 1500;
    var rootValue = 100;  // 此处值与postcss配置中'postcss-pxtorem'的值一样

    var docEl = doc.documentElement;
    var rszEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var reCalc = (function () {
        var reCalc = function () {
            var winWidth = docEl.clientWidth;
            var winHeight = docEl.clientHeight;
            if (!winWidth) return;
            var fontSize;
            if (winWidth < winHeight) {
                if ((winWidth / winHeight) > (height / width)) {
                    fontSize = (rootValue * (winHeight / height));
                } else {
                    fontSize = (rootValue * (winWidth / width));
                }
            } else {
                if ((winWidth / winHeight) > (height / width)) {
                    fontSize = (rootValue * (winWidth / height));
                } else {
                    fontSize = (rootValue * (winHeight / width));
                }
            }
            docEl.style.fontSize = (fontSize > 110 ? 110 : fontSize) + 'px';
            return reCalc;
        };
        return reCalc();
    })();
    if (!doc.addEventListener) return;
    win.addEventListener(rszEvt, reCalc);
})(document, window);

(function () {
    var getQuery = function (name) {
        var m = window.location.search.match(new RegExp('(\\?|&)' + name + '=([^&]*)(&|$)'));
        return !m ? '' : decodeURIComponent(m[2]);
    };

    // 去手Q工具栏
    if (!getQuery('_wv')) {
        if (window.location.search) {
            window.location.href += '&_wv=1';
        } else {
            window.location.href += '?_wv=1';
        }
    }

    // 解决安卓不读取“|”
    if (/\|/.test(location.href)) {
        location.href = encodeURI(location.href);
    }
}());
