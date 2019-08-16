class GoodsItem {
  constructor(title, price) {
    this.product_name = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
  }
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      this.render();
    })
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}

const list = new GoodsList();
list.fetchGoods() 

function makeGETRequest(url, callback) {
  return new Promise((resolve, reject) => {
      let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
      xhr.open("GET", url, true);
      xhr.onload = () => resolve(callback(xhr.responseText));
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
}