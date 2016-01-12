(function($) {

  //////////////////////////
  // view centric methods //
  //////////////////////////

  $.fn.googleSearch = function() {
    $(this).text('google-search')
  }

  //////////////////////////
  // data centric methods //
  //////////////////////////

  $.GoogleSearch = function() {
    this.target = $('body')
  }

  $.GoogleSearch.libsLoaded = false

  $.GoogleSearch.prototype.search = function(queryString, options, callback) {
    var self = this

    waitForGoogleLibs.call(this, function(err) {
      if(err) {
        throw err
      } else {
        var query   = buildQueryString.call(self, queryString, options)
          , objects = []

        execSearch.call(self, query, function(err, results) {
          if(err) {
            throw err
          } else {
            callback && callback(results)
          }
        })
      }
    })

    return this
  }

  $.GoogleSearch.prototype.cleanUp = function() {
    getSearchContainer.call(this).remove()
    $('.gstl_0.gssb_c').remove()
    $('#private_metadata.gsc-snippet-metadata').parent().remove()

    return this
  }

  /////////////
  // private //
  /////////////

  var waitForGoogleLibs = function(callback) {
    var intervalId = setInterval(function() {
      if ($.GoogleSearch.libsLoaded) {
        clearTimeout(timeoutId)
        clearInterval(intervalId)
        callback && callback(null)
      }
    }, 100)

    var timeoutId = setTimeout(function() {
      clearInterval(intervalId)
      callback && callback(new Error('Timeout! Google libs aren\'t available!'))
    }, 2000)
  }

  var buildQueryString = function(queryString, options) {
    var query = [ queryString ]

    for(var key in (options || {})) {
      query.push(key + ':' + options[key])
    }

    return query.join(" ")
  }

  var execSearch = function(queryString, callback) {
    var timeoutId = null

    google.search.WebSearch.RawCompletion = function(_, response) {
      clearTimeout(timeoutId)
      callback && callback(null, response.results)
    }

    timeoutId = setTimeout(function() {
      callback(new Error('No rendered results found.'), null)
    }, 2000)

    getSearchControl.call(this).execute(queryString)
  }

  var getSearchControl = function() {
    if(!this.searchControl) {
      this.searchControl = new google.search.SearchControl()
      this.searchControl.addSearcher(new google.search.WebSearch())
      this.searchControl.draw(getSearchContainer.call(this).get(0))
    }

    return this.searchControl
  }

  var getSearchContainer = function() {
    if(!this.element) {

      this.element = $('<div>')
        .attr('id', 'search-results' + parseInt(Math.random() * 999999999))
        .css('display', 'none')

      this.target.append(this.element)
    }

    return this.element
  }

  var loadGoogleLibs = function(callback) {
    $.getScript('https://www.google.com/jsapi').success(function() {
      google.load('search', '1', { callback: callback })
    })
  }

  loadGoogleLibs(function() {
    $.GoogleSearch.libsLoaded = true
  })
})(jQuery)
