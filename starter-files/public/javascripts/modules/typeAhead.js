import axios from 'axios'
import dompurify from 'dompurify'

function searchResultsHTML(stores) {
  return stores.map(store => `<a href="/store/${store.slug}" class="search__result"><strong>${store.name}</strong></a>`).join('')
}

const apiCaller = async (method, url) => {
  console.log(method, url, 'apiCaller');
  try {
    const results = await axios({ method, url })
    return results
  } catch (e) {
    console.log(e, 'e');
  }
}

async function typeAhead (search) {
  if (!search) return
  const searchInput = search.querySelector('input[name="search"]')
  const searchResults = search.querySelector('.search__results')

  searchInput.on('input', async function() {
    if (!this.value) return searchResults.style.display = 'none' // if no value set style

    // if value set style and call search api
    searchResults.style.display = 'block'

    try {
      const { data } = await apiCaller('get', `/api/v1/search/?q=${this.value}`)
      if (data.length > 0) return searchResults.innerHTML = dompurify.sanitize(searchResultsHTML(data))
      searchResults.innerHTML = dompurify.sanitize(`<div class="search__result">No results for <strong>${this.value}</strong> found</div>`)
    } catch (e) {
      console.log(e, 'search api e');
    }

  })

  searchInput.on('keyup', e => {
    if (![38, 40, 13].includes(e.keyCode)) return // if they are not pressing up, down or enter continue
    const activeClass = 'search__result--active'
    const current = search.querySelector(`.${activeClass}`)
    const items = search.querySelectorAll('.search__result')
    let next

    // up/down/enter logic for search results dropdown
    if (e.keyCode === 40 && current) next = current.nextElementSibling || items[0] // down and current active set, go to next sibling or if on last item go back to first
    else if (e.keyCode === 40) next = items[0] // if down and no current go to first
    else if (e.keyCode === 38 && current) next = current.previousElementSibling || items[items.length - 1] // if up and current go to previoud sibling or if on first go to last
    else if (e.keyCode === 38) next = items[items.length - 1] // if down and no current go to last
    else if (e.keyCode === 13 && current.href) window.location = current.href // if enter go to page of item selected

    if (current) current.classList.remove(activeClass) // remove the activeClass from the item moving away from when going up/donw
    next.classList.add(activeClass) // adding activeClass
  })
}
export default typeAhead
