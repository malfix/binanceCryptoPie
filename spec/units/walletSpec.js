describe("Wallet", function(){
  var wallet
  var Wallet = require('../../lib/wallet.js')

  beforeEach(function() {
    wallet = new Wallet()
  });

  it("is amount invalid", function() {
    expect(false).toEqual(wallet.isAmountValid(-10))
    expect(false).toEqual(wallet.isAmountValid(-0.1))
    expect(false).toEqual(wallet.isAmountValid('casa'))
    expect(false).toEqual(wallet.isAmountValid(0))
  })

  it("is amount valid ", function() {
    expect(true).toEqual(wallet.isAmountValid(0.1))
    expect(true).toEqual(wallet.isAmountValid(12))
  })

  it("add valid currency", function() {
    wallet.addCurrency('mycurrency', 0.01)
    expect(0.01).toEqual(wallet.balance())
  })

  it("add invalid currency", function() {
    wallet.addCurrency('mycurrency', -0.01)
    expect(0.00).toEqual(wallet.balance())
  })

  describe("when there is yet a valid currency:", function() {
    beforeEach(function() {
      wallet.addCurrency('mycurrency', 0.01)
    })

    it("add another one valid and balance is right", function() {
      wallet.addCurrency('new currency', 0.02)
      expect(0.03).toEqual(wallet.balance())
    })

    it("filter map is right with no filter", function() {
      expectedCurrencies = new Map();
      expectedCurrencies.set('mycurrency', 0.01)
      expect( expectedCurrencies ).toEqual(wallet.filterBelow())
    })


    it("filter map is right with filter", function() {
      expectedCurrencies = new Map();
      expectedCurrencies.set('Others', 0.01)
      expect( expectedCurrencies ).toEqual(wallet.filterBelow(0.01))
    })
  })
})
