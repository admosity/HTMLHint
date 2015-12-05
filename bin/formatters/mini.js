/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var miniFormatter = function(formatter, HTMLHint, options) {
  var nocolor = options.nocolor;
  formatter.on('file', function(event) {
    event.messages.forEach(function(message) {
      formatter.writeln(JSON.stringify({
        range: [[message.line - 1, message.col - 1], [message.line - 1, message.col - 1]],
        type: message.type,
        text: message.message,
        filePath: event.file,
      }));
    });
  });
};

module.exports = miniFormatter;
