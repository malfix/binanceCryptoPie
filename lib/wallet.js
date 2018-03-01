function Wallet(){
  this.currencies = new Map()
}

Wallet.prototype.addCurrency = function (text, value) {
  if (this.isAmountValid(value))
    this.currencies.set(text, value)
}

Wallet.prototype.balance = function () {
  total = 0
  for (const [key, value] of this.currencies.entries())
    total += value
  return total
}

Wallet.prototype.isAmountValid = function (n) {
  return Number(n) === n && n > 0
}

Wallet.prototype.filterBelow = function (threshold, sort) {
  if (!Number(threshold) ||  threshold <= 0)
    threshold = 0
  if (!Number(sort) || (sort !=  0 && sort !=  1 ))
    sort = 1

  filteredMap = new Map()
  otherCurrenciesValue = 0
  for (const [key, value] of this.currencies.entries())
    if (value > threshold)
      filteredMap.set(this.formatLabel(key, value, this.balance()), value)
    else
      otherCurrenciesValue += value
  // sort by 1. value, 0. title
  if (sort === 1)
    filteredMap = new Map([...filteredMap.entries()].sort((a, b) =>  b[1] - a[1]))

  if ( otherCurrenciesValue > 0 )
    filteredMap.set(this.formatLabel('Others', otherCurrenciesValue, this.balance()), otherCurrenciesValue)
  return filteredMap;
}

Wallet.prototype.formatLabel = function (currency, amount, total) {
  return `${currency} (${parseFloat(amount/total*100).toFixed(2)}%)`
}

module.exports = Wallet
