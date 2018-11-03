const APIUtil = require("./api_util.js")

class TweetsCompose {
  constructor($el) {
    this.$el = $el;
    this.$submitButton = $el.find(".submit-button");
    this.$textInput = this.$el.find('textarea[name=tweet\\[content\\]]')
    this.tweetsFeedId = this.$el.data("tweets-ul");
    this.charsLeft = 140;

    this.$el.on("submit", this.submit.bind(this));
    this.$textInput.on("input", this.updateCharsLeft.bind(this));
  }

  submit() {
    e.preventDefault();

    const data = this.$el.serializeJSON();
    this.submitButton.props("disabled", true);

    //do I need to bind handleSuccess to THIS again since its a callback?
    APIUtil.createTweet(data).then(this.handleSuccess);
  }

  clearInput() {
    this.$el.reset();
  }

  handleSuccess(result) {
    this.clearInput();
    this.submitButton.props("disabled", false);

    const tweet = JSON.stringify(result);
    let $ul = $(this.tweetsFeedId);
    $ul.append(`<li>${tweet}</li>`)
    ///////
  }

  updateCharsLeft() {
    this.charsLeft -= 1;
    this.$el.find(".chars-left").text(`${this.charsLeft}`);
  }
}

module.exports = TweetsCompose;
