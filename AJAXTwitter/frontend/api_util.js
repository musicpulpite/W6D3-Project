const APIUtil = {
  followUser: id => {
    return $.ajax({
    method: "POST",
    dataType: "json",
    url: `/users/${id}/follow`});
  },

  unfollowUser: id => {
    return $.ajax({
    method: "DELETE",
    dataType: "json",
    url: `/users/${id}/follow`});
  },

  searchUsers: (queryVal, success) => {
    return $.ajax({
    method: "GET",
    dataType: "json",
    url: `/users/search`,
    data: {query: queryVal},
    success: success});
  }
};

module.exports = APIUtil;
