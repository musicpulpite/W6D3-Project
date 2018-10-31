const APIUtil = require("./api_util");

class UsersSearch {
  constructor($el) {
    this.$el = $el;
    this.input = $el.find('input');
    this.ul = $el.find('ul');

    this.$el.on("input", this.handleInput.bind(this));
  }

  handleInput(){
    APIUtil.searchUsers(this.input.val(), this.renderResults.bind(this));
  }

  renderResults(results) {
    this.ul.empty();
    results.forEach((result) => {
      let $li = $(`<li><a href="${result.id}">${result.username}</a></li>`);
      this.ul.append($li);
    });
  }
}

module.exports = UsersSearch;
