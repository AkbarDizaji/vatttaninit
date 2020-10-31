//this plugin i take some idea & css from 'flipclockjs'
(function ($) {
    //
    $.fn.bFlipText = function (optns) {
        optns = optns || {};
        optns.unique_id = 'bFlipTextCss' + Math.ceil(Math.random() * 0x1000000).toString() + new Date().getTime().toString();
        this.each(function () {
            var $this = $(this);
            var bFlipTextInstance = new bFlipTextClass($this, optns);
            $this.data('bFlipTextInstance', bFlipTextInstance);  //we save it so we can call it again
        });
        return this;
    };

    //if we want public to call it from outside "$.fn.bFlipText.public_aaa" for private just put it without "$.fn.bFlipText."
    $.fn.bFlipTextPlay = function (text) {
        play_next(this, text);
    };
    //
    var last_unique_id = null;
    //
    bFlipTextClass = function (el, optns) {
        //
        var self = this;
        //
        this.optns = optns;
        this.obj = el.addClass('bFlipText-wrapper').addClass(this.optns.unique_id);
        this.char_len = 0;
        this.style = {'width': '60px', 'font-size': '70px', 'background': '#333', 'color': '#ccc'};
        $.extend(this.style, (optns.css || {}));
        //
        this.init = function (text) {
            this.load_style();  //load style after set id above
            this.char_len = 0;
            if (text && text.length)
                this.char_len = text.length;
            var i;
            for (i = 0; i < this.char_len; i++)
                self.init_char(text[i], i);
        };
        //
        this.load_style = function () {
            if (last_unique_id && last_unique_id === this.optns.unique_id)
                return;
            last_unique_id = this.optns.unique_id;
            //
            if (!this.style.height)
                this.style.height = (parseFloat(this.style.width) * 1.5) + 'px';
            if (!this.style['line-height'])
                this.style['line-height'] = parseFloat(this.style.height) + 'px';
            var css_str = "";
            css_str += " ." + this.optns.unique_id + " ul{ width:" + this.style.width + ";height:" + this.style.height + ";line-height:" + this.style['line-height'] + ";font-size:" + this.style['font-size'] + ";} ";
            css_str += " ." + this.optns.unique_id + " ul li .inn{ background:" + this.style.background + ";color:" + this.style.color + ";;} ";
            $("<style type='text/css'> " + css_str + "  </style>").appendTo("head");
        };
        //
        this.init_char = function (char, i) {
            this.obj.append('<ul class="bFlipText play bFlipText-char-' + i + '">' +
                    self.create_char_div('bFlipText-before', '') +
                    self.create_char_div('bFlipText-active', char) +
                    '</ul>');
        };
        //
        this.create_char_div = function (css, value) {
            return "<li class='" + css + "'><div>" +
                    "   <div class='up'><div class='shadow'></div><div class='inn'>" + (value ? value : "") + "</div></div>" +
                    "   <div class='down'><div class='shadow'></div><div class='inn'>" + (value ? value : "") + "</div></div>" +
                    "</div></li>";
        };
        //initially load it
        this.init(optns.text || '');
        //
        return this;
    };

    //
    play_next = function ($this, text) {
        $this.each(function () {
            //we get the class instance we save inside it before
            var instance = $(this).data('bFlipTextInstance');
            //
            var old_char_len = instance.char_len;
            instance.char_len = 0;
            if (text && text.length)
                instance.char_len = text.length;
            //delete exceed character then our new text
            var j;
            for (j = instance.char_len; j < old_char_len; j++)
                instance.obj.find('.bFlipText-char-' + j).remove();
            //build new text
            var i;
            for (i = 0; i < text.length; i++) {
                char_cntnr = instance.obj.find('.bFlipText-char-' + i);
                if (char_cntnr.size()) {
                    var old_char = char_cntnr.find('.bFlipText-before').removeClass('bFlipText-before');
                    char_cntnr.find('.bFlipText-active').removeClass('bFlipText-active').addClass('bFlipText-before');
                    char_cntnr.append(instance.create_char_div('bFlipText-active', text[i]));
                    old_char.remove();
                }
                else
                    instance.init_char(text[i], i);
            }
        });
        return $this;
    };
    //
})(jQuery);
