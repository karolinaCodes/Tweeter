/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  // take an array of tweet objects, convert to a tweet elemt, then append each one to the #tweets-container
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  // convert the user input string to a safe "encoded" representation to escape "unsafe" characters (< >)
  const escape = function (str) {
    console.log(str);
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // return a tweet <article></article> element with dynamically filled tweet data
  const createTweetElement = tweetObj => {
    const $tweet = $(`<article class="tweet"><header>
    <div class="user-profile">
    <img src="${tweetObj.user.avatars}"></img>
    <h4 class="user-name">${tweetObj.user.name}</h4>
    </div>
    <h4 class="user-handle">${tweetObj.user.handle}</h4>
    </header>
    <div class="tweet-text">
    ${escape(tweetObj.content.text)}
    </div>
    <footer>
     <span class="time-passed">${timeago.format(tweetObj.created_at)}</span>
     <div class="tweet-action">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
     </div>
    </footer></article>`);
    return $tweet;
  };

  const loadTweets = () => {
    $.get("/tweets", tweets => {
      renderTweets(tweets);
    });
  };

  loadTweets();

  // on new-tweet-form submission, POST the data to the server
  $(".new-tweet-form").submit(function (e) {
    e.preventDefault();
    // put in constants file?
    const maxLimit = 140;
    const $formInputEl = $(this).find(".new-tweet-text");
    const inputLength = $formInputEl.val().length;

    $(".form-error").slideUp("slow");

    // if the input is empty, display error message
    if (!inputLength) {
      $(".form-error").slideDown("slow");
      return $("#form-error-msg").text("You cannot post a blank tweet");
    }

    //if tweet is longer than 140 char,  display error message
    if (maxLimit - inputLength < 0) {
      $(".form-error").slideDown("slow");
      return $("#form-error-msg").text("Your tweet is too long!");
    }

    const tweet = $(this).serialize();
    $.post("/tweets", $(this).serialize(), () => {
      // reset the form and counter
      $formInputEl.val("");
      $(this).find(".counter").val(maxLimit);

      // display new tweet
      loadTweets();
    });
  });
});
