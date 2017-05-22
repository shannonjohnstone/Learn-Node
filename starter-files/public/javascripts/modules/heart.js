import apiCaller from './apiCaller'
import { $ } from './bling';

async function ajaxHeart(e) {
  e.preventDefault()
  try {
    const { data: { hearts } } = await apiCaller('post', this.action)
    const isHearted = this.heart.classList.toggle('heart__button--hearted')
    $('.heart-count').textContent = hearts.length
    if (isHearted) {
      this.heart.classList.add('heart__button--float')
      setTimeout(() => this.heart.classList.remove('heart__button--float'), 2500)
    }
  } catch (e) {
    console.log(e, 'Heart submit err')
  }
}

export default ajaxHeart
