var $ = require('node-jquery');
String.format = function() {

  var s = arguments[0];

  for (var i = 0; i < arguments.length - 1; i++) {

    var reg = new RegExp("\\{" + i + "\\}", "gm");

    s = s.replace(reg, arguments[i + 1]);

  }

  return s;

};

var date=function(format, timestamp) {
	  // http://kevin.vanzonneveld.net
	  // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
	  // +      parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   improved by: MeEtc (http://yass.meetcweb.com)
	  // +   improved by: Brad Touesnard
	  // +   improved by: Tim Wiel
	  // +   improved by: Bryan Elliott
	  //
	  // +   improved by: Brett Zamir (http://brett-zamir.me)
	  // +   improved by: David Randall
	  // +      input by: Brett Zamir (http://brett-zamir.me)
	  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   improved by: Brett Zamir (http://brett-zamir.me)
	  // +   improved by: Brett Zamir (http://brett-zamir.me)
	  // +   improved by: Theriault
	  // +  derived from: gettimeofday
	  // +      input by: majak
	  // +   bugfixed by: majak
	  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +      input by: Alex
	  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
	  // +   improved by: Theriault
	  // +   improved by: Brett Zamir (http://brett-zamir.me)
	  // +   improved by: Theriault
	  // +   improved by: Thomas Beaucourt (http://www.webapp.fr)
	  // +   improved by: JT
	  // +   improved by: Theriault
	  // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
	  // +   bugfixed by: omid (http://phpjs.org/functions/380:380#comment_137122)
	  // +      input by: Martin
	  // +      input by: Alex Wilson
	  // +   bugfixed by: Chris (http://www.devotis.nl/)
	  // %        note 1: Uses global: php_js to store the default timezone
	  // %        note 2: Although the function potentially allows timezone info (see notes), it currently does not set
	  // %        note 2: per a timezone specified by date_default_timezone_set(). Implementers might use
	  // %        note 2: this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST set by that function
	  // %        note 2: in order to adjust the dates in this function (or our other date functions!) accordingly
	  // *     example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
	  // *     returns 1: '09:09:40 m is month'
	  // *     example 2: date('F j, Y, g:i a', 1062462400);
	  // *     returns 2: 'September 2, 2003, 2:26 am'
	  // *     example 3: date('Y W o', 1062462400);
	  // *     returns 3: '2003 36 2003'
	  // *     example 4: x = date('Y m d', (new Date()).getTime()/1000);
	  // *     example 4: (x+'').length == 10 // 2009 01 09
	  // *     returns 4: true
	  // *     example 5: date('W', 1104534000);
	  // *     returns 5: '53'
	  // *     example 6: date('B t', 1104534000);
	  // *     returns 6: '999 31'
	  // *     example 7: date('W U', 1293750000.82); // 2010-12-31
	  // *     returns 7: '52 1293750000'
	  // *     example 8: date('W', 1293836400); // 2011-01-01
	  // *     returns 8: '52'
	  // *     example 9: date('W Y-m-d', 1293974054); // 2011-01-02
	  // *     returns 9: '52 2011-01-02'
	    var that = this,
	      jsdate,
	      f,
	      formatChr = /\\?([a-z])/gi,
	      formatChrCb,
	      // Keep this here (works, but for code commented-out
	      // below for file size reasons)
	      //, tal= [],
	      _pad = function (n, c) {
	        n = n.toString();
	        return n.length < c ? _pad('0' + n, c, '0') : n;
	      },
	      txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	  formatChrCb = function (t, s) {
	    return f[t] ? f[t]() : s;
	  };
	  f = {
	    // Day
	    d: function () { // Day of month w/leading 0; 01..31
	      return _pad(f.j(), 2);
	    },
	    D: function () { // Shorthand day name; Mon...Sun
	      return f.l().slice(0, 3);
	    },
	    j: function () { // Day of month; 1..31
	      return jsdate.getDate();
	    },
	    l: function () { // Full day name; Monday...Sunday
	      return txt_words[f.w()] + 'day';
	    },
	    N: function () { // ISO-8601 day of week; 1[Mon]..7[Sun]
	      return f.w() || 7;
	    },
	    S: function(){ // Ordinal suffix for day of month; st, nd, rd, th
	      var j = f.j()
	      i = j%10;
	      if (i <= 3 && parseInt((j%100)/10) == 1) i = 0;
	      return ['st', 'nd', 'rd'][i - 1] || 'th';
	    },
	    w: function () { // Day of week; 0[Sun]..6[Sat]
	      return jsdate.getDay();
	    },
	    z: function () { // Day of year; 0..365
	      var a = new Date(f.Y(), f.n() - 1, f.j()),
	        b = new Date(f.Y(), 0, 1);
	      return Math.round((a - b) / 864e5);
	    },

	    // Week
	    W: function () { // ISO-8601 week number
	      var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3),
	        b = new Date(a.getFullYear(), 0, 4);
	      return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
	    },

	    // Month
	    F: function () { // Full month name; January...December
	      return txt_words[6 + f.n()];
	    },
	    m: function () { // Month w/leading 0; 01...12
	      return _pad(f.n(), 2);
	    },
	    M: function () { // Shorthand month name; Jan...Dec
	      return f.F().slice(0, 3);
	    },
	    n: function () { // Month; 1...12
	      return jsdate.getMonth() + 1;
	    },
	    t: function () { // Days in month; 28...31
	      return (new Date(f.Y(), f.n(), 0)).getDate();
	    },

	    // Year
	    L: function () { // Is leap year?; 0 or 1
	      var j = f.Y();
	      return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
	    },
	    o: function () { // ISO-8601 year
	      var n = f.n(),
	        W = f.W(),
	        Y = f.Y();
	      return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
	    },
	    Y: function () { // Full year; e.g. 1980...2010
	      return jsdate.getFullYear();
	    },
	    y: function () { // Last two digits of year; 00...99
	      return f.Y().toString().slice(-2);
	    },

	    // Time
	    a: function () { // am or pm
	      return jsdate.getHours() > 11 ? "pm" : "am";
	    },
	    A: function () { // AM or PM
	      return f.a().toUpperCase();
	    },
	    B: function () { // Swatch Internet time; 000..999
	      var H = jsdate.getUTCHours() * 36e2,
	        // Hours
	        i = jsdate.getUTCMinutes() * 60,
	        // Minutes
	        s = jsdate.getUTCSeconds(); // Seconds
	      return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
	    },
	    g: function () { // 12-Hours; 1..12
	      return f.G() % 12 || 12;
	    },
	    G: function () { // 24-Hours; 0..23
	      return jsdate.getHours();
	    },
	    h: function () { // 12-Hours w/leading 0; 01..12
	      return _pad(f.g(), 2);
	    },
	    H: function () { // 24-Hours w/leading 0; 00..23
	      return _pad(f.G(), 2);
	    },
	    i: function () { // Minutes w/leading 0; 00..59
	      return _pad(jsdate.getMinutes(), 2);
	    },
	    s: function () { // Seconds w/leading 0; 00..59
	      return _pad(jsdate.getSeconds(), 2);
	    },
	    u: function () { // Microseconds; 000000-999000
	      return _pad(jsdate.getMilliseconds() * 1000, 6);
	    },

	    // Timezone
	    e: function () { // Timezone identifier; e.g. Atlantic/Azores, ...
	      // The following works, but requires inclusion of the very large
	      // timezone_abbreviations_list() function.
	/*              return that.date_default_timezone_get();
	*/
	      throw 'Not supported (see source code of date() for timezone on how to add support)';
	    },
	    I: function () { // DST observed?; 0 or 1
	      // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
	      // If they are not equal, then DST is observed.
	      var a = new Date(f.Y(), 0),
	        // Jan 1
	        c = Date.UTC(f.Y(), 0),
	        // Jan 1 UTC
	        b = new Date(f.Y(), 6),
	        // Jul 1
	        d = Date.UTC(f.Y(), 6); // Jul 1 UTC
	      return ((a - c) !== (b - d)) ? 1 : 0;
	    },
	    O: function () { // Difference to GMT in hour format; e.g. +0200
	      var tzo = jsdate.getTimezoneOffset(),
	        a = Math.abs(tzo);
	      return (tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
	    },
	    P: function () { // Difference to GMT w/colon; e.g. +02:00
	      var O = f.O();
	      return (O.substr(0, 3) + ":" + O.substr(3, 2));
	    },
	    T: function () { // Timezone abbreviation; e.g. EST, MDT, ...
	      // The following works, but requires inclusion of the very
	      // large timezone_abbreviations_list() function.
	/*              var abbr = '', i = 0, os = 0, default = 0;
	      if (!tal.length) {
	        tal = that.timezone_abbreviations_list();
	      }
	      if (that.php_js && that.php_js.default_timezone) {
	        default = that.php_js.default_timezone;
	        for (abbr in tal) {
	          for (i=0; i < tal[abbr].length; i++) {
	            if (tal[abbr][i].timezone_id === default) {
	              return abbr.toUpperCase();
	            }
	          }
	        }
	      }
	      for (abbr in tal) {
	        for (i = 0; i < tal[abbr].length; i++) {
	          os = -jsdate.getTimezoneOffset() * 60;
	          if (tal[abbr][i].offset === os) {
	            return abbr.toUpperCase();
	          }
	        }
	      }
	*/
	      return 'UTC';
	    },
	    Z: function () { // Timezone offset in seconds (-43200...50400)
	      return -jsdate.getTimezoneOffset() * 60;
	    },

	    // Full Date/Time
	    c: function () { // ISO-8601 date.
	      return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
	    },
	    r: function () { // RFC 2822
	      return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
	    },
	    U: function () { // Seconds since UNIX epoch
	      return jsdate / 1000 | 0;
	    }
	  };
	  this.date = function (format, timestamp) {
	    that = this;
	    jsdate = (timestamp === undefined ? new Date() : // Not provided
	      (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
	      new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
	    );
	    return format.replace(formatChr, formatChrCb);
	  };
	  return this.date(format, timestamp);
	}
	var strtotime=function(text, now) {
  //  discuss at: http://phpjs.org/functions/strtotime/
  //     version: 1109.2016
  // original by: Caio Ariede (http://caioariede.com)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Caio Ariede (http://caioariede.com)
  // improved by: A. Matías Quezada (http://amatiasq.com)
  // improved by: preuter
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Mirko Faber
  //    input by: David
  // bugfixed by: Wagner B. Soares
  // bugfixed by: Artur Tchernychev
  //        note: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
  //   example 1: strtotime('+1 day', 1129633200);
  //   returns 1: 1129719600
  //   example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
  //   returns 2: 1130425202
  //   example 3: strtotime('last month', 1129633200);
  //   returns 3: 1127041200
  //   example 4: strtotime('2009-05-04 08:30:00 GMT');
  //   returns 4: 1241425800

  var parsed, match, today, year, date, days, ranges, len, times, regex, i, fail = false;

  if (!text) {
    return fail;
  }

  // Unecessary spaces
  text = text.replace(/^\s+|\s+$/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/[\t\r\n]/g, '')
    .toLowerCase();

  // in contrast to php, js Date.parse function interprets:
  // dates given as yyyy-mm-dd as in timezone: UTC,
  // dates with "." or "-" as MDY instead of DMY
  // dates with two-digit years differently
  // etc...etc...
  // ...therefore we manually parse lots of common date formats
  match = text.match(
    /^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);

  if (match && match[2] === match[4]) {
    if (match[1] > 1901) {
      switch (match[2]) {
        case '-':
          { // YYYY-M-D
            if (match[3] > 12 || match[5] > 31) {
              return fail;
            }

            return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        case '.':
          { // YYYY.M.D is not parsed by strtotime()
            return fail;
          }
        case '/':
          { // YYYY/M/D
            if (match[3] > 12 || match[5] > 31) {
              return fail;
            }

            return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
      }
    } else if (match[5] > 1901) {
      switch (match[2]) {
        case '-':
          { // D-M-YYYY
            if (match[3] > 12 || match[1] > 31) {
              return fail;
            }

            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        case '.':
          { // D.M.YYYY
            if (match[3] > 12 || match[1] > 31) {
              return fail;
            }

            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        case '/':
          { // M/D/YYYY
            if (match[1] > 12 || match[3] > 31) {
              return fail;
            }

            return new Date(match[5], parseInt(match[1], 10) - 1, match[3],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
      }
    } else {
      switch (match[2]) {
        case '-':
          { // YY-M-D
            if (match[3] > 12 || match[5] > 31 || (match[1] < 70 && match[1] > 38)) {
              return fail;
            }

            year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1];
            return new Date(year, parseInt(match[3], 10) - 1, match[5],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        case '.':
          { // D.M.YY or H.MM.SS
            if (match[5] >= 70) { // D.M.YY
              if (match[3] > 12 || match[1] > 31) {
                return fail;
              }

              return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
            }
            if (match[5] < 60 && !match[6]) { // H.MM.SS
              if (match[1] > 23 || match[3] > 59) {
                return fail;
              }

              today = new Date();
              return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000;
            }

            return fail; // invalid format, cannot be parsed
          }
        case '/':
          { // M/D/YY
            if (match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)) {
              return fail;
            }

            year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
            return new Date(year, parseInt(match[1], 10) - 1, match[3],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        case ':':
          { // HH:MM:SS
            if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
              return fail;
            }

            today = new Date();
            return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
              match[1] || 0, match[3] || 0, match[5] || 0) / 1000;
          }
      }
    }
  }

  // other formats and "now" should be parsed by Date.parse()
  if (text === 'now') {
    return now === null || isNaN(now) ? new Date()
      .getTime() / 1000 | 0 : now | 0;
  }
  if (!isNaN(parsed = Date.parse(text))) {
    return parsed / 1000 | 0;
  }

  date = now ? new Date(now * 1000) : new Date();
  days = {
    'sun': 0,
    'mon': 1,
    'tue': 2,
    'wed': 3,
    'thu': 4,
    'fri': 5,
    'sat': 6
  };
  ranges = {
    'yea': 'FullYear',
    'mon': 'Month',
    'day': 'Date',
    'hou': 'Hours',
    'min': 'Minutes',
    'sec': 'Seconds'
  };

  function lastNext(type, range, modifier) {
    var diff, day = days[range];

    if (typeof day !== 'undefined') {
      diff = day - date.getDay();

      if (diff === 0) {
        diff = 7 * modifier;
      } else if (diff > 0 && type === 'last') {
        diff -= 7;
      } else if (diff < 0 && type === 'next') {
        diff += 7;
      }

      date.setDate(date.getDate() + diff);
    }
  }

  function process(val) {
    var splt = val.split(' '), // Todo: Reconcile this with regex using \s, taking into account browser issues with split and regexes
      type = splt[0],
      range = splt[1].substring(0, 3),
      typeIsNumber = /\d+/.test(type),
      ago = splt[2] === 'ago',
      num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

    if (typeIsNumber) {
      num *= parseInt(type, 10);
    }

    if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
      return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
    }

    if (range === 'wee') {
      return date.setDate(date.getDate() + (num * 7));
    }

    if (type === 'next' || type === 'last') {
      lastNext(type, range, num);
    } else if (!typeIsNumber) {
      return false;
    }

    return true;
  }

  times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' +
    '|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' +
    '|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
  regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?';

  match = text.match(new RegExp(regex, 'gi'));
  if (!match) {
    return fail;
  }

  for (i = 0, len = match.length; i < len; i++) {
    if (!process(match[i])) {
      return fail;
    }
  }

  // ECMAScript 5 only
  // if (!match.every(process))
  //    return false;

  return (date.getTime() / 1000);
}
/*$.get("http://192.168.1.101:8080/",function(html){

  var $doc = $(html);

 // console.log("No.  name  language  star   forks  ")
// console.log(html)
 

});*/

function s20(){
		var data=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
				
		var result="";
		for(var i=0;i<28;i++){
			var r=Math.floor(Math.random()*62);		//取得0-62间的随机数，目的是以此当下标取数组data里的值！
			result+=data[r];		//输出20次随机数的同时，让rrr加20次，就是20位的随机字符串了。
		}
  return result;
	}
var MD5 = function (string) {
    function RotateLeft(lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
  
    function AddUnsigned(lX,lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
  
    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }
  
    function FF(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function GG(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function HH(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function II(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    };
  
    function WordToHex(lValue) {
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for (lCount = 0;lCount<=3;lCount++) {
            lByte = (lValue>>>(lCount*8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    };
  
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
  
        for (var n = 0; n < string.length; n++) {
  
            var c = string.charCodeAt(n);
  
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
  
        }
  
        return utftext;
    };
  
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
  
    string = Utf8Encode(string);
  
    x = ConvertToWordArray(string);
  
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
  
    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
    }
    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
    return temp.toLowerCase();
}

var sc=[{"cookies":"PHPSESSID=3oa4epe1ukm4qibthg30ggjqa1","score":0,"sign":'',name:"春雨无情"},//晶城 
//{"cookies":"Hm_lpvt_fa356a94bf5ae253b76fefa953bb56e4=1496068524; Hm_lvt_fa356a94bf5ae253b76fefa953bb56e4=1496067380; is_mobile=1; PHPSESSID=23h0sh2itb3vcd3os0731jih91; yunsuo_session_verify=175bfe09890979ca4cb30e4f5379b957","mobile":"13814929369","score":0,"sign":'',name:"李勇"},//唯一 
//{"cookies":"yunsuo_session_verify=175bfe09890979ca4cb30e4f5379b957; PHPSESSID=j8u3kgkrk2unf5rrspsffgpub6; is_mobile=1; Hm_lvt_fa356a94bf5ae253b76fefa953bb56e4=1496068879; Hm_lpvt_fa356a94bf5ae253b76fefa953bb56e4=1496068879","mobile":"18017545866","score":0,"sign":'',name:"刘成文"},//唯一 

//小龙虾 李龙 18914148845
/*{"cookies":"o1GnmjmkKv23B4lPXBgyMXrAH8mU","url":"刘星","mobile":"18014246678","score":0},
{"cookies":"o1GnmjmkKv23B4lPXBgyMXrAH8mU","url":"刘星","mobile":"18014246678","score":0},
{"cookies":"o1GnmjmkKv23B4lPXBgyMXrAH8mU","url":"刘星","mobile":"18014246678","score":0},
{"cookies":"o1GnmjmkKv23B4lPXBgyMXrAH8mU","url":"刘星","mobile":"18014246678","score":0},
{"cookies":"o1GnmjmkKv23B4lPXBgyMXrAH8mU","url":"刘星","mobile":"18014246678","score":0},
{"cookies":"o1GnmjmkKv23B4lPXBgyMXrAH8mU","url":"刘星","mobile":"18014246678","score":0},
{"cookies":"o1GnmjmkKv23B4lPXBgyMXrAH8mU","url":"刘星","mobile":"18014246678","score":0},
{"cookies":"o1GnmjmkKv23B4lPXBgyMXrAH8mU","url":"刘星","mobile":"18014246678","score":0},
{"cookies":"o1GnmjmkKv23B4lPXBgyMXrAH8mU","url":"刘星","mobile":"18014246678","score":0}*/]
function checkisexist(name){
	for(var k=0;k<sc.length;k++){
		if(eval("'" + name + "'")==sc[k].name){
			return true;
		}
	}
	return false;
}
var first=0;
function getsign(i){
	if(i>=sc.length)return;
	//var score=first+parseInt(200*Math.random())
		//console.log(sc[i].mobile+" "+sc)
	console.log("getsign:"+i)
var http=require('http');
	var options = {
	hostname: '127.0.0.1',
	port: 8888,
	path: sc[i].url,
	method: 'get',
	headers: { Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'User-Agent': 'Mozilla/5.0 (Linux; Android 4.4.2; LG-D859 Build/KVT49L.D85910f) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36 MicroMessenger/5.4.0.51_r798589.480 NetType/WIFI',
  'Accept-Encoding': '',
  'Accept-Language': 'zh-CN',
	'cookie':sc[i].cookies
		}
	};
	 
	var req = http.request(options, function(res) {
	console.log('STATUS: ' + res.statusCode);
	//console.log('HEADERS: ' + JSON.stringify(res.headers));
	sc[i].cookies=res.headers['set-cookie'][0].split(';')[0]+';'+res.headers['set-cookie'][1].split(';')[0]+';'+res.headers['set-cookie'][2].split(';')[0]+';'+sc[i].cookies;
	console.log(sc[i].cookies)
	res.setEncoding('utf8');
	//setscore()//
	var bodyChunks = ''; 
	res.on('data', function (data) {
		bodyChunks+=data
			//console.log(data);
			//sc[i].sign = $(data).find('.bottom').html()
			//	console.log($(data+"").find('body').find('#check_sign'));
			//	console.log($(data).html())
			
		})
		.on('end', function() {
		var data = bodyChunks;
		// console.log(bodyChunks );
		 var reg1 = /value=\"(.*?)\"\ id=\"check_sign/ig;
			  var str=data.match(reg1)
			 console.log(str );
			  sc[i].sign  = str[0].split("\"")[1];
			  console.log( sc[i].sign  );
			  console.log(first)
				var score=parseInt(first)+ parseInt(2000*Math.random())
					console.log(score)
				//	sc[i].score=score.toFixed(1)
			  sc[i].score=score
					sub(i) 
	  }); 
	});
	 
	req.on('error', function(e) {
	console.log('problem with request: ' + e.message);
	});
	 
	// write data to request body
	//req.write('data\n');
	req.end();

}
function sleep(sleepTime) {
    for(var start = +new Date; +new Date - start <= sleepTime; ) { }
}

function sub(i,score){
	if(i>=sc.length)return;
	//sleep(1000)
	//console.log(first+parseInt(100*Math.random())/10)
	//first=540000

	//score=	parseFloat(score).toFixed(1)
		console.log(score)
		//	return
		//	score=26020
		//	var timestamp=Math.round(new Date().getTime()/1000)-parseInt(10*Math.random())-60;
		// var md5sign = MD5('' + score+timestamp);
	//	return ;
	//console.log(sc[i].sign+" "+sc[i].score)
$.ajax({type:"POST", url:'http://m.priligy.cn/longwar2/Api/Complete',data:'time='+score, timeout:30000, cache:false,
//$.ajax({type:"POST", url:"http://wxkf.js.189.cn/activity/experience/lottery",data:"openid=oBkkFj9iWteKViqSlgwph3WzLhCg",dataType:"text", timeout:30000, cache:false,
//	$.ajax({type:"POST", url:"http://wxkf.js.189.cn/activity/experience/lottery",data:"openid=oBkkFjzAPi0nVA0RwHahBtu2Ccvw",dataType:"text", timeout:30000, cache:false,
//	$.ajax({type:"POST", url:"http://wxkf.js.189.cn/activity/experience/lottery",data:"openid=oBkkFjzWq-quZI_ORfrXlnG5DQlg",dataType:"text", timeout:30000, cache:false,
//	$.ajax({type:"POST", url:"http://wxkf.js.189.cn/activity/experience/lottery",data:"openid=oBkkFj5sCCqfCd2JGENinUwEb_HU",dataType:"text", timeout:30000, cache:false,
//	$.ajax({type:"POST", url:"http://wxkf.js.189.cn/activity/experience/lottery",data:"openid=oBkkFj9GgUneJuH7D71vLeLDu9C8",dataType:"text", timeout:30000, cache:false,
//			$.ajax({type:"POST", url:"http://www.360clg.cn/index.php?g=Wap&m=Lottery2&a=check",data:"token=JuIANGK59hYts5wSSBEc&id=2332&wecha_id=orJzSjnOlay1Dl5_GqPgxCUkhluc",dataType:"text", timeout:30000, cache:false,
beforeSend:function (XMLHttpRequest) {

//console.log(XMLHttpRequest.readyState);

//XMLHttpRequest.setDisableHeaderCheck(false);

XMLHttpRequest.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");

XMLHttpRequest.setRequestHeader("Cookie", sc[0].cookies);

//XMLHttpRequest.setRequestHeader("Content-Length", "0");

//	XMLHttpRequest.setRequestHeader("user-id", "");

//	XMLHttpRequest.setRequestHeader("Content-Type", "application/xml");

XMLHttpRequest.setRequestHeader("User-Agent", "Mozilla/5.0 (Linux; Android 6.0.1; MI 5s Build/MXB48T; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043305 Safari/537.36 MicroMessenger/6.5.8.1060 NetType/4G Language/zh_CN");

XMLHttpRequest.setRequestHeader("Accept-Encoding", "");
XMLHttpRequest.setRequestHeader('Accept-Language','zh-CN');
XMLHttpRequest.setRequestHeader('Accept-Charset','utf-8');
XMLHttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
XMLHttpRequest.setRequestHeader('Origin','http://www.chinalife.com.cn');
XMLHttpRequest.setRequestHeader('Referer','http://www.chinalife.com.cn/chinalife-carnival/ds/?inviteid=8902&WT.ac=fromWXPengYou_dszas&from=groupmessage');
//XMLHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
//XMLHttpRequest.setRequestHeader('X-CSRF-TOKEN',sc[0].mobile);
//var myDate = new Date();
//console.log(myDate.getMinutes()+':'+myDate.getSeconds()+'.'+myDate.getMilliseconds());
},

success:function (data, textStatus) {
	console.log(data);
	/*	score=60*9+parseInt(7*Math.random())*60+parseInt(60*Math.random())
	console.log(date('H:i:s')+" "+score)
	setTimeout(function(){
		console.log(date('H:i:s'))
		//var score=80+parseInt(20*Math.random());
		sub(i,score)
	
	},(score+10)*1000)
	*/
	getrank()
	//i++;
	//req(i);
	/*if(data.success>0){
		//console.log(data);
	}else{
		setTimeout(req,3000);
	}*/
	
},
 error: function(XMLHttpRequest, textStatus, errorThrown) {
	console.log(XMLHttpRequest);
           //             console.log(XMLHttpRequest.status);
                     //   console.log(XMLHttpRequest.readyState);
                     //   console.log(textStatus);
                    }
});

}
function e(e) {
                    for (var t, o = "",
                    n = o.length,
                    i = n + 8,
                    s = (i - i % 64) / 64, a = 16 * (s + 1), r = Array(a - 1), c = 0, l = 0; l < n;) t = (l - l % 4) / 4,
                    c = l % 4 * 8,
                    r[t] = r[t] | o.charCodeAt(l) << c,
                    l++;
                    t = (l - l % 4) / 4,
                    c = l % 4 * 8,
                    r[t] = r[t] | 128 << c,
                    r[a - 2] = n << 3,
                    r[a - 1] = n >>> 29,
                    e.unshift(secretBoxCode);
                    var u, h, d, p, f, m, _, x = "";
                    for (m = x.length, f = 0, _ = ""; f < m;) {
                        do {
                            u = base64DecodeChars[255 & x.charCodeAt(f++)]
                        } while ( f < m && - 1 == u );
                        if ( - 1 == u) break;
                        do {
                            h = base64DecodeChars[255 & x.charCodeAt(f++)]
                        } while ( f < m && - 1 == h );
                        if ( - 1 == h) break;
                        _ += String.fromCharCode(u << 2 | (48 & h) >> 4);
                        do {
                            if (61 == (d = 255 & x.charCodeAt(f++))) return _;
                            d = base64DecodeChars[d]
                        } while ( f < m && - 1 == d );
                        if ( - 1 == d) break;
                        _ += String.fromCharCode((15 & h) << 4 | (60 & d) >> 2);
                        do {
                            if (61 == (p = 255 & x.charCodeAt(f++))) return _;
                            p = base64DecodeChars[p]
                        } while ( f < m && - 1 == p );
                        if ( - 1 == p) break;
                        _ += String.fromCharCode((3 & d) << 6 | p)
                    }
                    return e
                };
		var t = function(e, t) {
                    return e << t | e >>> 32 - t
                },
                o = function(e, t) {
                    var o, n, i, s, a;
                    return i = 2147483648 & e,
                    s = 2147483648 & t,
                    o = 1073741824 & e,
                    n = 1073741824 & t,
                    a = (1073741823 & e) + (1073741823 & t),
                    o & n ? 2147483648 ^ a ^ i ^ s: o | n ? 1073741824 & a ? 3221225472 ^ a ^ i ^ s: 1073741824 ^ a ^ i ^ s: a ^ i ^ s
                },
                n = function(e, t, o) {
                    return e & t | ~e & o
                },
                i = function(e, t, o) {
                    return e & o | t & ~o
                },
                s = function(e, t, o) {
                    return e ^ t ^ o
                },
                a = function(e, t, o) {
                    return t ^ (e | ~o)
                },
                r = function(e, i, s, a, r, c, l) {
                    return e = o(e, o(o(n(i, s, a), r), l)),
                    o(t(e, c), i)
                },
                c = function(e, n, s, a, r, c, l) {
                    return e = o(e, o(o(i(n, s, a), r), l)),
                    o(t(e, c), n)
                },
                l = function(e, n, i, a, r, c, l) {
                    return e = o(e, o(o(s(n, i, a), r), l)),
                    o(t(e, c), n)
                },
                u = function(e, n, i, s, r, c, l) {
                    return e = o(e, o(o(a(n, i, s), r), l)),
                    o(t(e, c), n)
                },
                h = function(e) {
                    for (var t, o = e.length,
                    n = o + 8,
                    i = (n - n % 64) / 64, s = 16 * (i + 1), a = Array(s - 1), r = 0, c = 0; c < o;) t = (c - c % 4) / 4,
                    r = c % 4 * 8,
                    a[t] = a[t] | e.charCodeAt(c) << r,
                    c++;
                    return t = (c - c % 4) / 4,
                    r = c % 4 * 8,
                    a[t] = a[t] | 128 << r,
                    a[s - 2] = o << 3,
                    a[s - 1] = o >>> 29,
                    a
                },
                d = function(e) {
                    var t, o, n = "",
                    i = "";
                    for (o = 0; o <= 3; o++) t = e >>> 8 * o & 255,
                    i = "0" + t.toString(16),
                    n += i.substr(i.length - 2, 2);
                    return n
                },
                p = function(e) {
                    e = e.replace(/\x0d\x0a/g, "\n");
                    for (var t = "",
                    o = 0; o < e.length; o++) {
                        var n = e.charCodeAt(o);
                        n < 128 ? t += String.fromCharCode(n) : n > 127 && n < 2048 ? (t += String.fromCharCode(n >> 6 | 192), t += String.fromCharCode(63 & n | 128)) : (t += String.fromCharCode(n >> 12 | 224), t += String.fromCharCode(n >> 6 & 63 | 128), t += String.fromCharCode(63 & n | 128))
                    }
                    return t
                };
					 $.extend({
                    foo: function(e) {
                        var t, n, i, s, a, f, m, _, x, g = Array();
                        for (e = p(e), g = h(e), f = 1732584193, m = 4023233417, _ = 2562383102, x = 271733878, t = 0; t < g.length; t += 16) n = f,
                        i = m,
                        s = _,
                        a = x,
                        f = r(f, m, _, x, g[t + 0], 7, 3614090360),
                        x = r(x, f, m, _, g[t + 1], 12, 3905402710),
                        _ = r(_, x, f, m, g[t + 2], 17, 606105819),
                        m = r(m, _, x, f, g[t + 3], 22, 3250441966),
                        f = r(f, m, _, x, g[t + 4], 7, 4118548399),
                        x = r(x, f, m, _, g[t + 5], 12, 1200080426),
                        _ = r(_, x, f, m, g[t + 6], 17, 2821735955),
                        m = r(m, _, x, f, g[t + 7], 22, 4249261313),
                        f = r(f, m, _, x, g[t + 8], 7, 1770035416),
                        x = r(x, f, m, _, g[t + 9], 12, 2336552879),
                        _ = r(_, x, f, m, g[t + 10], 17, 4294925233),
                        m = r(m, _, x, f, g[t + 11], 22, 2304563134),
                        f = r(f, m, _, x, g[t + 12], 7, 1804603682),
                        x = r(x, f, m, _, g[t + 13], 12, 4254626195),
                        _ = r(_, x, f, m, g[t + 14], 17, 2792965006),
                        m = r(m, _, x, f, g[t + 15], 22, 1236535329),
                        f = c(f, m, _, x, g[t + 1], 5, 4129170786),
                        x = c(x, f, m, _, g[t + 6], 9, 3225465664),
                        _ = c(_, x, f, m, g[t + 11], 14, 643717713),
                        m = c(m, _, x, f, g[t + 0], 20, 3921069994),
                        f = c(f, m, _, x, g[t + 5], 5, 3593408605),
                        x = c(x, f, m, _, g[t + 10], 9, 38016083),
                        _ = c(_, x, f, m, g[t + 15], 14, 3634488961),
                        m = c(m, _, x, f, g[t + 4], 20, 3889429448),
                        f = c(f, m, _, x, g[t + 9], 5, 568446438),
                        x = c(x, f, m, _, g[t + 14], 9, 3275163606),
                        _ = c(_, x, f, m, g[t + 3], 14, 4107603335),
                        m = c(m, _, x, f, g[t + 8], 20, 1163531501),
                        f = c(f, m, _, x, g[t + 13], 5, 2850285829),
                        x = c(x, f, m, _, g[t + 2], 9, 4243563512),
                        _ = c(_, x, f, m, g[t + 7], 14, 1735328473),
                        m = c(m, _, x, f, g[t + 12], 20, 2368359562),
                        f = l(f, m, _, x, g[t + 5], 4, 4294588738),
                        x = l(x, f, m, _, g[t + 8], 11, 2272392833),
                        _ = l(_, x, f, m, g[t + 11], 16, 1839030562),
                        m = l(m, _, x, f, g[t + 14], 23, 4259657740),
                        f = l(f, m, _, x, g[t + 1], 4, 2763975236),
                        x = l(x, f, m, _, g[t + 4], 11, 1272893353),
                        _ = l(_, x, f, m, g[t + 7], 16, 4139469664),
                        m = l(m, _, x, f, g[t + 10], 23, 3200236656),
                        f = l(f, m, _, x, g[t + 13], 4, 681279174),
                        x = l(x, f, m, _, g[t + 0], 11, 3936430074),
                        _ = l(_, x, f, m, g[t + 3], 16, 3572445317),
                        m = l(m, _, x, f, g[t + 6], 23, 76029189),
                        f = l(f, m, _, x, g[t + 9], 4, 3654602809),
                        x = l(x, f, m, _, g[t + 12], 11, 3873151461),
                        _ = l(_, x, f, m, g[t + 15], 16, 530742520),
                        m = l(m, _, x, f, g[t + 2], 23, 3299628645),
                        f = u(f, m, _, x, g[t + 0], 6, 4096336452),
                        x = u(x, f, m, _, g[t + 7], 10, 1126891415),
                        _ = u(_, x, f, m, g[t + 14], 15, 2878612391),
                        m = u(m, _, x, f, g[t + 5], 21, 4237533241),
                        f = u(f, m, _, x, g[t + 12], 6, 1700485571),
                        x = u(x, f, m, _, g[t + 3], 10, 2399980690),
                        _ = u(_, x, f, m, g[t + 10], 15, 4293915773),
                        m = u(m, _, x, f, g[t + 1], 21, 2240044497),
                        f = u(f, m, _, x, g[t + 8], 6, 1873313359),
                        x = u(x, f, m, _, g[t + 15], 10, 4264355552),
                        _ = u(_, x, f, m, g[t + 6], 15, 2734768916),
                        m = u(m, _, x, f, g[t + 13], 21, 1309151649),
                        f = u(f, m, _, x, g[t + 4], 6, 4149444226),
                        x = u(x, f, m, _, g[t + 11], 10, 3174756917),
                        _ = u(_, x, f, m, g[t + 2], 15, 718787259),
                        m = u(m, _, x, f, g[t + 9], 21, 3951481745),
                        f = o(f, n),
                        m = o(m, i),
                        _ = o(_, s),
                        x = o(x, a);
                        return (d(f) + d(m) + d(_) + d(x)).toUpperCase()
                    }
                })
function parseQueryString(url) {
    var obj = {};
    var keyvalue = [];
    var key = "",
        value = "";
    var paraString = url.split("&");
    for (var i in paraString) {
        keyvalue = paraString[i].split("=");
        key = keyvalue[0];
        value = keyvalue[1];
        obj[key] = value;
    }
    return obj;
}

	var index=0;
	var score_Qt={};
	var ans=[],ansa={};
	var url="https://e5651923178346.fengchuanba.com/service/explore2/startExplore";
	var secretBoxCode="5651923178346"
	var checkPointSeq;
var userId="1000195645"
var uuid="oX-65s7mreqDZJclwZuNpMchuqJk"
	var cookie=[
	
	];

var fs=require('fs');
		var str=fs.readFileSync('yunfu.txt','utf-8');
		cookie=JSON.parse(str);
//{"nickname":"曲蔚然","token":"0ba656753323a4b3722a86804923254e"},{"nickname":"姐妹花","token":"525a09dc24dfc3ea19d4a6d6f5438615"},{"nickname":"王万松","token":"3127ffc8276e44b33c6ad25891569697"},{"nickname":"景芝","token":"0ec04a6d9b8e62a23e1740f4ec6b2851"},{"nickname":"民生客服","token":"3f2d4f49557c35fa497fac6d028fea3b"},{"nickname":"达哥","token":"50a66b6619e83850c2b79b424bbb832d"},{"nickname":"酸菜鱼","token":"f4c35dad2d7729cad17c5a85cf95db87"},{"nickname":"稻穗","token":"806ba68c3b07a6cfaeb4966b0597bddb"},{"nickname":"余与雨","token":"eb1796853f4ef4d6acad170a5ec5314d"},{"nickname":"狼叔","token":"1e9ab2a7d161553960722293abc70334"},{"nickname":"瓦屋山","token":"b1eefb0dfbd750f37492e9bcb156aef0"},{"nickname":"甜玉米","token":"1810aad8f304d39bf4916385f64da4df"},{"nickname":"凯哥","token":"089220a9e808a2582806e0808e0c0f38"},{"nickname":"瓦香鸡🐔","token":"094cdc9a23313b4fb4d7a11c4325ba8a"},{"nickname":"蜜橘之夏","token":"2e89cf64851979038454e32b461f8a60"},{"nickname":"老铁666","token":"f85166c3a6df4be629a312adf384dce1"},{"nickname":"微信用户","token":"306cca58733ee3b3acebe9f68e9c8eec"},{"nickname":"怕瓦落地","token":"92b6f9b03908a7070a6c58430c73ed35"},{"nickname":"别跟自己过不去","token":"5d05fb812b2724903bb14a7e07040b3a"},{"nickname":"粽子糖","token":"04047ab538be04d4875b2f49ebccf5e3"},{"nickname":"洪荒之力","token":"0a02fd37fe8dcf7074a6a2a5f06059ed"},{"nickname":"-----","token":"39ecaca0605dfb4aae3d571191979beb"},{"nickname":"夜陨","token":"99899ead0007b85325d8cef113c4fa56"},{"nickname":"想恋之人","token":"adeafa7d812ffe0f4d5071baacbf4b75"},{"nickname":"完美人生","token":"1b006f55b68e55a92fa783f9dd532608"},{"nickname":"小蚂蚁🐜🐜🔥🔥","token":"7711db1cfb1a6fa84f05c87748f7e70a"},{"nickname":"彩虹桥","token":"0c08adc0732aec15ac64ba888a1ddc8d"},{"nickname":"灰太狼","token":"be28a1eca1c63c03a8f64d0346014d80"},{"nickname":"彩虹桥","token":"0c08adc0732aec15ac64ba888a1ddc8d"},{"nickname":"灰太狼","token":"be28a1eca1c63c03a8f64d0346014d80"},{"nickname":"小宇影视","token":"eb1573423be1ff53b68b28c2e315f73a"},{"nickname":"程影","token":"87917518883ded0737b5c1c287b21755"},{"nickname":"5G选天翼","token":"48f206ab2f7493689668f400faef9e4a"},{"nickname":"🔴大圣归来🔴","token":"e1c2b48d36b1f525bd0e807dadc2ec44"},{"nickname":"淮安特色","token":"7e80d75b356ad0943ca2f28bd2dea74b"},{"nickname":"厨邦酱油","token":"a041a1a004fa656c7121b625ea84887a"},{"nickname":"机不凡","token":"ed649a9ac82bc8d8d9fe48127049974b"},{"nickname":"电信客服","token":"cc27eba9058bd314db9ce687e290f142"},{"nickname":"有点小肉肉","token":"aae47f6708e0e5443f157c94e3551257"},{"nickname":"恭喜发财","token":"bab106eb95d12356ed5b68883ae0e631"},{"nickname":"山海关","token":"b9ca5b3f7224680c3fa79fb2320e19b7"},{"nickname":"米酒汤圆","token":"f5b465cf77da9ae5d373c3bac451ccce"},{"nickname":"荷花池","token":"e538bb29a9f8da7733f8a30f264cfcb7"},{"nickname":"加油！王先生","token":"2dc727fa7f507aab7a022d3cef0335df"},{"nickname":"火🔥凤凰","token":"4029d477ac4aafdff101cac043702880"},{"nickname":"榜一大哥","token":"25fccbf9e0effb79b99bc416ad471f75"},{"nickname":"꧁太阳雨꧂","token":"b4b9195b151fb171f4d80083c00a7570"},{"nickname":"金剑南","token":"2ddf581dedde6601ffb562576bbe1fba"},{"nickname":"旺旺碎冰冰","token":"a4af677c3af5e5675b9a7c7bd160928e"},{"nickname":"小财神","token":"0733b91feaf1d5d7e6cde1c97f064cd9"},{"nickname":"囚囚","token":"45341d302942b9dd0767a761d3ba0d7a"},{"nickname":"张来斯","token":"b5c1fe3816e0281f585e0994affdf554"},{"nickname":"小牛电动车","token":"1de06a6f5cf8416faf519e4976100121"},{"nickname":"小红花一朵","token":"13d43049d670e3f9a32dab15187ee23d"},{"nickname":"青辰","token":"20e4c205e9e0b1ffd77af685a88d13c3"},{"nickname":"王大厨","token":"afaebf5c75bc9c32b43b002d6c04b586"},{"nickname":"仙女棒","token":"756f2b26bcdb69c0fcbe1a0be2931a7b"},{"nickname":"张杰","token":"cdabbb8006e498d251c09679f6eadc82"},

function luck_draw(i,ii){
	
	//console.log(i)
	$.ajax({type:"post", url:"https://jrcz.vip.hnhxzkj.com/user/Index/luck_draw",data:'{"level_id":'+ii+'}',dataType:"json", timeout:30000, cache:false,async :false,
beforeSend:function (XMLHttpRequest) {


XMLHttpRequest.setRequestHeader("Accept", "application/json, text/plain, */*");

//XMLHttpRequest.setRequestHeader("Cookie",cookie);
XMLHttpRequest.setRequestHeader("Authorization",cookie[i].token);
XMLHttpRequest.setRequestHeader("User-Agent", "Mozilla/5.0 (Linux; Android 4.4.2; LG-D859 Build/KVT49L.D85910f) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36 MicroMessenger/5.4.0.51_r798589.480 NetType/WIFI");

XMLHttpRequest.setRequestHeader("Accept-Encoding", "");
XMLHttpRequest.setRequestHeader('Accept-Language','zh-CN');
XMLHttpRequest.setRequestHeader('Accept-Charset','utf-8');
XMLHttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
XMLHttpRequest.setRequestHeader('Origin','https://games.vip.hnhxzkj.com');
//XMLHttpRequest.setRequestHeader('X-CSRF-TOKEN',sc[0].mobile);
XMLHttpRequest.setRequestHeader('Content-Type', 'application/json');
XMLHttpRequest.setRequestHeader('Referer','https://games.vip.hnhxzkj.com/');
//var myDate = new Date();
//console.log(myDate.getMinutes()+':'+myDate.getSeconds()+'.'+myDate.getMilliseconds());
},

success:function (data, textStatus) {
	
	//console.log(data)
	if(data.code=='1'&&data.data.prize!='谢谢惠顾'){
		console.log('-------------------------111111111111111111111111111111111 中奖  ' +data.data.prize+ ' '+cookie[i].nickname)
	}
	if(data.code=='-100'){
		console.log('-------------------------失效 '+cookie[i].nickname)
	}
		
},
 error: function(XMLHttpRequest, textStatus, errorThrown) {
	console.log(XMLHttpRequest);
	//firstget();
           //             console.log(XMLHttpRequest.status);
                     //   console.log(XMLHttpRequest.readyState);
                     //   console.log(textStatus);
                    }
});
}

function info(cookie){
	
	
	$.ajax({type:"post", url:"https://jrcz.vip.hnhxzkj.com/user/Index/index",data:'{}',dataType:"json", timeout:30000, cache:false,async :false,
beforeSend:function (XMLHttpRequest) {


XMLHttpRequest.setRequestHeader("Accept", "application/json, text/plain, */*");

//XMLHttpRequest.setRequestHeader("Cookie",cookie);
XMLHttpRequest.setRequestHeader("Authorization",cookie);
XMLHttpRequest.setRequestHeader("User-Agent", "Mozilla/5.0 (Linux; Android 4.4.2; LG-D859 Build/KVT49L.D85910f) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36 MicroMessenger/5.4.0.51_r798589.480 NetType/WIFI");

XMLHttpRequest.setRequestHeader("Accept-Encoding", "");
XMLHttpRequest.setRequestHeader('Accept-Language','zh-CN');
XMLHttpRequest.setRequestHeader('Accept-Charset','utf-8');
XMLHttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
XMLHttpRequest.setRequestHeader('Origin','https://games.vip.hnhxzkj.com');
//XMLHttpRequest.setRequestHeader('X-CSRF-TOKEN',sc[0].mobile);
XMLHttpRequest.setRequestHeader('Content-Type', 'application/json');
XMLHttpRequest.setRequestHeader('Referer','https://games.vip.hnhxzkj.com/');
//var myDate = new Date();
//console.log(myDate.getMinutes()+':'+myDate.getSeconds()+'.'+myDate.getMilliseconds());
},

success:function (data, textStatus) {
	console.log(data)
end(cookie)
	
	
		
},
 error: function(XMLHttpRequest, textStatus, errorThrown) {
	console.log(XMLHttpRequest);
	//firstget();
           //             console.log(XMLHttpRequest.status);
                     //   console.log(XMLHttpRequest.readyState);
                     //   console.log(textStatus);
                    }
});
}


function in_array(search, array) {
    for (var i in array) {
        if (array[i] == search) {
            return true;
        }
    }
    return false;
}
console.log('sdf')
for(var i=0;i<cookie.length;i++){
	for(var ii=0;ii<4;ii++){
		luck_draw(i,ii);
	}
}



return;
