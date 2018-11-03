const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search.js");
const TweetsCompose = require("./tweets_compose.js")

$(() => {
  const $followButtons = $('.follow-toggle');
  Array.from($followButtons).forEach(el => new FollowToggle($(el)));

  const $searchNav = $('.users-search');
  Array.from($searchNav).forEach(nav => new UsersSearch($(nav)));

  const $tweetForm = $('.tweet-compose');
  new TweetsCompose($tweetForm);
});
