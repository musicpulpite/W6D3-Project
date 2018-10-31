const APIUtil = require("./api_util.js")

class FollowToggle {
  constructor($el){
    this.$el = $el;
    this.userId = $el.data("userid");
    this.followState = $el.data("followstate");

    this.$el.on('click', this.handleClick.bind(this));

    this.render();
  }

  render() {
    if (this.followState === "followed") {
      this.$el.text("Unfollow");
    } else {
      this.$el.text("Follow");
    }
  }

  handleClick(e) {
    const success = () =>{
      if (this.followState === "unfollowed"){
        this.followState = "followed";
      } else {
        this.followState = "unfollowed";
      }
      this.$el.prop("disabled", false);
      this.render();
    };

    e.preventDefault();
    if (this.followState === "unfollowed") {
      this.$el.prop("disabled", true);
      this.$el.text("Following...");

      return APIUtil.followUser(this.userId).then(success);
    } else {
      this.$el.prop("disabled", true);
      this.$el.text("Unfollowing...");

      return APIUtil.unfollowUser(this.userId).then(success);
    }
  }

}

module.exports = FollowToggle;
