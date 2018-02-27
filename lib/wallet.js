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

Wallet.prototype.filterBelow = function (threshold) {
  if (!Number(threshold) ||  threshold <= 0)
    return this.currencies
  filteredMap = new Map()
  otherCurrenciesValue = 0
  for (const [key, value] of this.currencies.entries())
    if (value > threshold)
      filteredMap.set(key, value)
    else
      otherCurrenciesValue += value
  if ( otherCurrenciesValue > 0 )
    filteredMap.set('Others', otherCurrenciesValue)
  return filteredMap
}

module.exports = Wallet
