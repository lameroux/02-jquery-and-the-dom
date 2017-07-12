'use strict';

var articles = [];

function Article (rawDataObj) {
  // TODO: DONE === Use the JS object passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}

// NOTE: object constructor completed

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  /* TODO: DONE --- This cloned article still has a class of template.
  However, in our modules.css stylesheet, we gave all elements
  with a class of template a display of none. Let's make
  sure we're not accidentally hiding our cloned article! */
  $($newArticle).removeClass().addClass(this.title);

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.data('category', this.category);

  /* TODO: DONE --- Now use jQuery traversal and setter methods to fill in the rest
  of the current template clone with properties from this particular Article instance.
  We need to fill in:
    1. author name,
    2. author url,
    3. article title,
    4. article body, and
    5. publication date. */

    $('.template').find('h1').html(this.title);
    $('.template').find('h6').html(this.authorUrl);
    $('.template').find('address').html(this.author);
    $('.template').find('h3').html('Category: ' + this.category);
    $('.template').find('time').html(this.publishedOn);
    $('.template').find('section').html(this.body);

  // Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(articleObject) {
  // REVIEW: Take a look at this forEach method; This may be the first time we've seen it.
  articles.push(new Article(articleObject));
});

articles.forEach(function(article) {
  $('#articles').append(article.toHtml());
});
