const goods = [
  {
    name: 'Нямушка',
    taste: 'с фуа-гра',
    weight: '0.5',
    amount: '10',
    gift: 'мышь в подарок',
    isSatisfied: 'false',
    dicription: 'Печень утки разварная с артишоками.',
    disabled: 'false',
  },
  {
    name: 'Нямушка',
    taste: 'с рыбой',
    weight: '2',
    amount: '40',
    gift: '2 мыши в подарок',
    isSatisfied: 'false',
    dicription: 'Головы щучьи с чесноком да свежайшая сёмгушка.',
    disabled: 'false',
  },
  {
    name: 'Нямушка',
    taste: 'с курой',
    weight: '5',
    amount: '100',
    gift: '5 мышей в подарок',
    isSatisfied: 'true',
    dicription: 'Печень утки разварная с артишоками.',
    disabled: 'true',
  }
]

const goodsGrid = document.querySelector('.goods__grid')

function showGoods() {
  goods.forEach(elem => {
    const goodsItem = document.createElement('div')
    goodsItem.classList.add('goods__item')
    if (elem.disabled === 'false') {
      goodsItem.classList.add('hover')
    }
    goodsItem.innerHTML = `
      <div class="goods__item-card">
        <img class="goods__item-img"
          src="img/cat.png"
          alt="cat"
        >
        <svg class="goods__item-border" width="320" height="480" viewBox="0 0 320 480" fill="none" preserveAspectRatio="none">
          <mask id="path-1-inside-1_104_375" fill="white">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 42.6762V468C0 474.627 5.37259 480 12 480H308C314.627 480 320 474.627 320 468V12C320 5.37258 314.627 0 308 0H42.6762L0 42.6762Z"/>
          </mask>
          <path class="stroke" d="M0 42.6762L-2.82843 39.8478L-4 41.0193V42.6762H0ZM42.6762 0V-4H41.0193L39.8478 -2.82843L42.6762 0ZM4 468V42.6762H-4V468H4ZM12 476C7.58173 476 4 472.418 4 468H-4C-4 476.837 3.16345 484 12 484V476ZM308 476H12V484H308V476ZM316 468C316 472.418 312.418 476 308 476V484C316.837 484 324 476.837 324 468H316ZM316 12V468H324V12H316ZM308 4C312.418 4 316 7.58172 316 12H324C324 3.16344 316.837 -4 308 -4V4ZM42.6762 4H308V-4H42.6762V4ZM39.8478 -2.82843L-2.82843 39.8478L2.82843 45.5046L45.5046 2.82843L39.8478 -2.82843Z" fill="#1698D9" mask="url(#path-1-inside-1_104_375)"/>
        </svg>
        <svg class="goods__item-back" width="320" height="480" viewBox="0 0 320 480" fill="none" preserveAspectRatio="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 42.6762V468C0 474.627 5.37259 480 12 480H308C314.627 480 320 474.627 320 468V12C320 5.37258 314.627 0 308 0H42.6762L0 42.6762Z" fill="#F2F2F2"/>
        </svg>
        <div class="goods__item-textinfo">
          <div class="goods__item-topinfo">
            Сказочное заморское яство
          </div>
          <div class="goods__item-title">
            ${elem.name}
          </div>
          <div class="goods__item-subtitle">
          ${elem.taste}
          </div>
          <ul class="goods__item-discription">
            <li>
              <span>${elem.amount}</span> порций
            </li>
            <li>
              ${elem.gift}
            </li>
            ${
              elem.isSatisfied === 'true' ? ( 
            `<li>
              Заказчик доволен
            </li>`) : ('')}
          </ul>
        </div>
        <div class="goods__item-weight">
          ${elem.weight}<span>кг</span>
        </div>
      </div>
      <div class="goods__item-subinfo">
        Чего сидишь? Порадуй котэ, <button><span>купи</span>.</button>
      </div>
    `
    goodsGrid.appendChild(goodsItem)

    if (elem.disabled === 'false') {
      const goodsItemCard = goodsItem.querySelector('.goods__item-card'),
            goodsItemButton = goodsItem.querySelector('button')
      goodsItemCard.addEventListener('click', () => {
        toggleCheckClass(goodsItem, elem)
      })
      goodsItemButton.addEventListener('click', () => {
        toggleCheckClass(goodsItem, elem)
      }, { once: true })
    } else if (elem.disabled === 'true') {
      goodsItem.classList.add('disabled')
      const subInfo = goodsItem.querySelector('.goods__item-subinfo')
      subInfo.textContent = `Печалька, ${elem.taste} закончился.`
    }
  })
}

function toggleCheckClass(item, object) {
  const subInfo = item.querySelector('.goods__item-subinfo')

  if (item.classList.contains('checked')) {
    subInfo.innerHTML = `
      Чего сидишь? Порадуй котэ, <button><span>купи</span>.</button>
    `
    const goodsItemButton = item.querySelector('button')
    goodsItemButton.addEventListener('click', () => {
      toggleCheckClass(item, object)
    }, { once: true })
  } else {
    subInfo.innerHTML = `
    ${object.dicription}
  `
  }

  item.classList.toggle('checked')
  item.classList.remove('hover', 'checked-hover')
  item.querySelector('.goods__item-topinfo')
      .textContent = 'Сказочное заморское яство'

  item.addEventListener('mouseleave', () => {
    if (item.classList.contains('checked')) {
      item.classList.add('checked-hover')
      item.addEventListener('mouseenter', mouseEnterFunc)
      item.addEventListener('mouseleave', mouseLeaveFunc)
    } else {
      item.classList.add('hover')
      item.removeEventListener('mouseenter', mouseEnterFunc)
      item.removeEventListener('mouseleave', mouseLeaveFunc)
    }
  }, { once: true })

}

function mouseEnterFunc(event) {
  event.target
    .querySelector('.goods__item-topinfo')
    .textContent = 'Котэ не одобряет?'
}
function mouseLeaveFunc(event) {
  event.target
    .querySelector('.goods__item-topinfo')
    .textContent = 'Сказочное заморское яство'
}

showGoods()


