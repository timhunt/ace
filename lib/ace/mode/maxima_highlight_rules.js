/*
 * maxima_highlight_rules.js
 *
 * Copyright (C) 2016 Tim Hunt
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 *
 */
define(function(require, exports, module)
{

   var oop = require("../lib/oop");
   var lang = require("../lib/lang");
   var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

   var RHighlightRules = function()
   {

      var keywordMapper = this.createKeywordMapper({
          "keyword": "integrate|next|from|diff|in|at|limit|sum|for|and|elseif|then|else|do|or|if|unless|product|while|thru|step",
          "keyword.operator": "not|and|or",
          "constant.language": "false|true"
      }, "identifier", true);

      // regexp must not have capturing parentheses. Use (?:) instead.
      // regexps are ordered -> the first match is used

      this.$rules = {
          "start" : [
            {
               token : "comment",
               regex : '\\/\\*',
               next : "comment"
            },
            {
               token : "string",
               regex : '"',
               next : "string"
            },
            {
               token : "constant.numeric", // number
               regex : "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b"
            },
            {
               token : "constant.numeric", // number with leading decimal
               regex : "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b"
            },
            {
               token : "constant.language",
               regex : "%i\\b"
            },
            {
               token : keywordMapper,
               regex : "\\b%?\\w+\\b"
            },
            {
               token : "keyword.operator",
               regex : ":|::|:=|::=|!|!!|\\^|\\.|\\*|/|\\+|\\-|=|#|>|>=|<|<=|~|,|\\$|;"
            },
            {
               token : "paren.lparen",
               regex : "[[(]"
            },
            {
               token : "paren.rparen",
               regex : "[\\])]"
            },
            {
               token : "text",
               regex : "\\s+"
            }
         ],
         "string" : [
            {
               token : "string",
               regex : '"',
               next : "start"
            },
            {
               token : "string",
               regex : '[^"]+'
            }
         ],
         "comment" : [
            {
               token : "comment",
               regex : '\\*\\/',
               next : "start"
            },
            {
               token : "comment",
               regex : '(?:.(?!\\*\\/))+'
            }
         ]
      };
   };

   oop.inherits(RHighlightRules, TextHighlightRules);

   exports.RHighlightRules = RHighlightRules;
});
