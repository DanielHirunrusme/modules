var padded = [],
    padding = 40;

//call this function on scroll to flow span tags in an article around object
function reflow(object) {

    var obj = $(object)

    if (padded.length > 0) {
        for (var i = 0, imax = padded.length; i < imax; i++) {
            padded[i][0].style.paddingLeft = '0';
        }
    }

    offsets = [];
    padding = [];

    $('article').find('p').each(function() {

        if (collision($(obj), $(this))) {

            // wrap each word in the article with a span tag through PHP
            $(this).find('span').each(function(e) {
                var sp = $(this);

                if (collision($(obj), $(sp))) {

                    padded.push($(sp));
                    var amt = Math.round(Math.abs($(obj).position().left - $(sp).offset().left) + $(obj).width() + padding);
                    $(sp).css('padding-left', amt)

                }
            });

        }
    });
}


// detects collision between two items
function collision($div1, $div2) {

    var x1 = $div1.offset().left - padding / 2;
    var y1 = $div1.offset().top - 10;
    var h1 = $div1.outerHeight(true) + 20;
    var w1 = $div1.outerWidth(true) + padding;
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}