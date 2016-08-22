'use strict'

const entries =
  obj =>
    Object.keys(obj)
      .map(key => [key, obj[key]])

const listing =
  (name, price) => ({
    name,
    price
  })

const customer =
  (name, shoppingList) => ({
    name,
    shoppingList
  })

const cart =
  (customer, ...items) => ({
    customer,
    items
  })

/**
 * should return an array with the `itemName` repeated `count` number of times
 */
const itemRepeater =
  itemName =>
    count => {
      let repeat = []
      for (let i = 0; i < count; i++) repeat.push(itemName)
      return repeat
    }

const flatmap =
  mapper =>
    (total, param) =>
      [...total, ...mapper(param)]

/**
 * should return an array of carts with each given customer's shopping list
 * as an array of items
 */
const constructCarts =
  listings =>
    customers => {
      return customers
        .map(cust => cart(cust.name, ...entries(cust.shoppingList)
          .reduce(flatmap(item => itemRepeater(item[0])(item[1])), [])
            .reduce(flatmap(item => listings
              .filter(list => list.name === item)), [])
        )
      )
    }

module.exports = {
  listing,
  customer,
  constructCarts
}
