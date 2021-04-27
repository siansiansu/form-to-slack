var POST_URL = "<YOUR_SLACK_WEBHOOK>";

function onFormSubmit(e) {
  var response = e.response.getItemResponses();
  
  var fields = [
    {"title": "From", "value": e.response.getRespondentEmail()},
    {"title": "When", "value": e.response.getTimestamp()}
  ];
  
  for (var i = 0; i < response.length; i++) {
    var question = response[i].getItem().getTitle();
    var answer = response[i].getResponse();
    
    fields.push({"title": question, "value": answer});
  }
    
  var summaryAttachment = {
    "fallback": FormApp.getActiveForm().getTitle(),
    "pretext": "<!channel> New response submitted to: " + FormApp.getActiveForm().getTitle(),
    "title": FormApp.getActiveForm().getTitle() + " (responses)",
    "title_link": "https://docs.google.com/spreadsheets/d/" + FormApp.getActiveForm().getDestinationId(),
    "fields": fields,
    "color": "#393939"
  };
  
  var responseAttachment = {
    "fallback": FormApp.getActiveForm().getTitle(),
    "title": "Respond via email? (mailto link)",
    "title_link": "mailto:" + e.response.getRespondentEmail() + "?Subject=" + encodeURI(FormApp.getActiveForm().getTitle())
  };

  var options = {
    "method" : "post",
    "payload": JSON.stringify({
      "username": "Feedback",
      "icon_emoji": ":speech_balloon:",
      "attachments": [summaryAttachment, responseAttachment]
    })
  };

   UrlFetchApp.fetch(POST_URL, options);
};
