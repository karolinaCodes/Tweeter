/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(() => {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  $("#new-tweet-form").submit(function (e) {
    e.preventDefault();
    const tweet = $(this).serialize();
    console.log(tweet);
    $.post("/tweets", $(this).serialize());
  });

  // take an array of tweet objects, convert to a tweet elemt, then append each one to the #tweets-container
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
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
${tweetObj.content.text}
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

  renderTweets(data);
});
