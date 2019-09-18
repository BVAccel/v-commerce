

export const debounce = (func, wait, immediate) => {
	var timeout

	return function() {
		var context = this, args = arguments
		var later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}

		var callNow = immediate && !timeout

		clearTimeout(timeout)
		timeout = setTimeout(later, wait)

		if (callNow) func.apply(context, args)
	}
}

export const hash = (str) => {
  var hash = 0, i, chr

  if (str.length === 0) return hash

  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i)
    hash  = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }

  return hash
}

export const clone = (obj) => {
	return JSON.parse(JSON.stringify(obj))
}

/** 
  This handles a weird edge case caused by the theme editor.
  When customizing a theme, for some reason HTML comments are injected
  into templates, breaking the response data. This means we need to
  remove the comments and parse it back into JSON format, allowing for
  the data to load properly when the theme editor is open.

  @param data The response to check.
*/
export const parseDataForEditor = data => {
  if(typeof data === 'string') {
    let parsed = data.replace(/<!--[\s\S]*?-->/g, '')

    try {
      return JSON.parse(parsed)
    } catch (error) {
      console.error('Could not parse data:', data)
      return
    }
  }

  return data
}
