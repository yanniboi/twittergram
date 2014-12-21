function myfunc(){
  var x = $('#options option:selected').text();
  var links = $('a.twitter-timeline-link');

  var token = '',// Important! Add your Instagram API access token here.
    makeRequest = function (shortcode) {
      var url = '//api.instagram.com/v1/media/shortcode/'+shortcode+'?access_token='+token;
      $.ajax({
        url: url,
        shortcode: shortcode,
        success: getSuccess
      });

    },
    getSuccess = function (res) {
      var imageUrl = res.data.images.standard_resolution.url;
      $("a."+this.shortcode).append("<img src=\""+imageUrl+"\" width=\"100%\"/>");
    };

  links.each(function() {
    if ($(this).attr('title') && $(this).attr('title').indexOf("instagram") > 0) {
      var title = $(this).attr('title');
      var position = title.indexOf("/p/");
      var shortcode = title.substr(position + 3);
      shortcode = shortcode.replace("/", "");
      $(this).addClass(shortcode);

      makeRequest(shortcode);
    }

  });
}

$(document).ready(myfunc);