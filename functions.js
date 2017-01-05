exports.topicObject = function(topic) {
  let res = topic.split("/");
  if (res.length < 3) { return false};
  return {
  	key: res[0],
  	username: res[1],
  	subject: res.slice(2,res.length)
  } 
};
