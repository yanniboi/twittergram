/**
 * Add instagram images to links.
 */
function insertPics(){
  var links = $('a.twitter-timeline-link');

  var token = '',   // Important! Add your Instagram API access token here.
    /**
     * Api request to Instagram to get image url.
     */
    makeRequest = function (shortcode) {
      var url = '//api.instagram.com/v1/media/shortcode/'+shortcode+'?access_token='+token;
      $.ajax({
        url: url,
        shortcode: shortcode,
        success: getSuccess
      });

    },
    /**
     * On success apend image.
     */
    getSuccess = function (res) {
      chrome.runtime.sendMessage({greeting: "active"}, function(response) {
        console.log(response.farewell);
      });

      var imageUrl = res.data.images.standard_resolution.url;
      imageUrl = imageUrl.replace("http://", "https://");
      $("a."+this.shortcode).append("<img src=\""+imageUrl+"\" width=\"100%\"/>");
    };

  /**
   * Loop over page links looking for instagram posts.
   */
  links.each(function() {
    if ($(this).attr('title') && $(this).attr('title').indexOf("instagram") > 0) {
      var title = $(this).attr('title');
      var position = title.indexOf("/p/");
      var shortcode = title.substr(position + 3);
      shortcode = shortcode.replace("/", "");
      $(this).addClass(shortcode);
      $(this).addClass("twittergram-post");

      makeRequest(shortcode);
    }

  });
}

/**
 * Listen for clicks on the page_action and then scroll to next image on page.
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting == "next") {
    sendResponse({farewell: "skipped"});
    $('html, body').animate({
      scrollTop: $(".twittergram-post").offset().top
    }, 1000);
    $(".twittergram-post:first").removeClass("twittergram-post");
  }
});

// Run function on page load.
$(document).ready(insertPics);
