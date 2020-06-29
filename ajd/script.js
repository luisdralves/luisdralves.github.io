function timeSince (dateString) {
  //2019-07-19T08:25:56+0000
  var date = new Date(dateString)

  var seconds = Math.floor((new Date() - date) / 1000)

  var interval = Math.floor(seconds / 31536000)

  if (interval > 1) {
    return 'Há ' + interval + ' anos'
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return 'Há ' + interval + ' meses'
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return 'Há ' + interval + ' dias'
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return 'Há ' + interval + ' horas'
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return 'Há ' + interval + ' minutos'
  }
  return 'Há ' + Math.floor(seconds) + ' segundos'
}

function idToURL (id) {
  id = id.substring(id.indexOf('_') + 1)
  return 'https://www.facebook.com/assocjuvenildeao/posts/' + id
}

function urlify (text) {
  var urlRegex = /([a-zA-Z]+:\/\/[a-zA-Z\d\.\/\-\_\~\?\*\:\%]+)/g
  var emailRegex = /([a-zA-Z0-9\.\+\-]+\@[a-zA-Z]+\.[a-zA-Z]+)/g
  text = text.replace(urlRegex, '<a href="$1">$1</a>')
  return text.replace(emailRegex, '<a href="mailto:$1">$1</a>')
}

function parseParagraph (text) {
  if (typeof text !== 'undefined') {
    while (text.includes('\\n')) {
      text = text.replace('\\n', '<br>')
    }
    text = urlify(text)

    while (text.includes('\\')) {
      text = text.replace('\\', '')
    }
    return text
  }
}

var page = 'https://graph.facebook.com/assocjuvenildeao/posts/'
var fields =
  'id,permalink_url,created_time,story,message,images,picture,full_picture,shares.summary(true).limit(0),comments,likes.summary(true),reactions.type(LOVE).limit(0).summary(total_count).as(Love),reactions.type(WOW).limit(0).summary(total_count).as(Wow),reactions.type(HAHA).limit(0).summary(total_count).as(Haha),reactions.type(SAD).limit(0).summary(1).as(Sad),reactions.type(ANGRY).limit(0).summary(1).as(Angry)'
var token =
  'EAAFHZB8SkTZC4BAOtzS3Iov2lrYJeaiWqqknCIei8C0EAeeplGrXQ0DhtEt1oZADO2mFLjGiKdvpCZBJWz7fGx2ypDpGWZBuTRywWbYHj1DqyGcB0ziL1rP96JzSMsec2ALFvHpkjl89optZAEAmpYKMRiSHukOPwIslyzj247kgZDZD'
var limit = 8
var requestUrl =
  page + '?fields=' + fields + '&limit=' + limit + '&access_token=' + token

function updatePosts (requestUrl) {
  console.log(requestUrl)
  $.ajax({ url: requestUrl }).done(function (result) {
    console.log(result['data'])

    var html = '<div class="fb-column">'
    var n = 0
    $.each(result['data'], function (k, v) {
      if (n == limit / 2) html += '</div><div class="fb-column">'
      //console.log(v);

      html +=
        '<div class="fb-post card border-primary mb-3" id="' + v['id'] + '">'
      if (v['story'] != null)
        html +=
          '<a class="card-header"href="' +
          idToURL(v['id']) +
          '">' +
          v['story'] +
          '</a>'
      html += '<div class="card-body">'
      if (typeof v['message'] !== 'undefined')
        html +=
          '<p class="card-text">' +
          parseParagraph(JSON.stringify(v['message'])) +
          '</p>'
      html += '<a href="' + idToURL(v['id']) + '">Ler mais...</a>'

      html += '</div>'
      if (typeof v['full_picture'] !== 'undefined')
        html += '<img class="fb-img" src="' + v['full_picture'] + '"></img>'

      html += '<div class="inline-spaced card-footer">'
      html += '<div class="details">'
      html += '<div class="reactions">'
      var likes = v['likes'].summary.total_count
      var love = v['Love'].summary.total_count
      var haha = v['Haha'].summary.total_count
      var wow = v['Wow'].summary.total_count
      var sad = v['Sad'].summary.total_count
      var angry = v['Angry'].summary.total_count
      if (likes > 0)
        html +=
          '<div><img class="like" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/joypixels/257/thumbs-up_1f44d.png"></img><span>' +
          likes +
          '</span></div>'
      if (love > 0)
        html +=
          '<div><img class="like" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/joypixels/257/red-heart_2764.png"></img><span>' +
          love +
          '</span></div>'
      if (haha > 0)
        html +=
          '<div><img class="like" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/joypixels/257/face-with-tears-of-joy_1f602.png"></img><span>' +
          haha +
          '</span></div>'
      if (wow > 0)
        html +=
          '<div><img class="like" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/joypixels/257/astonished-face_1f632.png"></img><span>' +
          wow +
          '</span></div>'
      if (sad > 0)
        html +=
          '<div><img class="like" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/joypixels/257/pleading-face_1f97a.png"></img><span>' +
          sad +
          '</span></div>'
      if (angry > 0)
        html +=
          '<div><img class="like" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/joypixels/257/pouting-face_1f621.png"></img><span>' +
          angry +
          '</span></div>'
      html += '</div>'

      var comment = ' comentários '
      var share = ' partilhas'
      if (typeof v['comments'] !== 'undefined') {
        var commentCount = v['comments'].data.length
        if (commentCount == 1) comment = ' comentário '
      } else {
        var commentCount = ''
        comment = ''
      }
      if (typeof v['shares'] !== 'undefined') {
        var shareCount = v['shares'].count
        if (shareCount == 1) share = ' partilha'
      } else {
        var shareCount = ''
        share = ''
      }
      html +=
        '<a href="' +
        idToURL(v['id']) +
        '">' +
        commentCount +
        comment +
        shareCount +
        share +
        '</a>'
      html += '</div>'
      html += '<p class="align-right">' + timeSince(v['created_time']) + '</p>'
      html += '</div>'
	  html += '</div>'
	  n++
    })
    html += '</div>'

    $('#nextUrl').html(result['paging'].next)
    if (typeof result['paging'].previous !== 'undefined') {
      $('#prevUrl').html(result['paging'].previous)
      $('#prev')
        .parent()
        .removeClass('disabled')
    } else {
      $('#prev')
        .parent()
        .addClass('disabled')
    }

    $('#my-fb-container').html(html)
  })
}

updatePosts(requestUrl)

function next () {
  console.log('yes')
  updatePosts($('#nextUrl').text())
}
function prev () {
  updatePosts($('#prevUrl').text())
}
