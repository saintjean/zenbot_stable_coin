var z = require('zero-fill')
  , n = require('numbro')
  , Phenotypes = require('../../../lib/phenotype')

module.exports = {
  name: 'stable_coin',
  description: 'Buy when Price <= buy_price, Sell when Price >= sell_price',

  getOptions: function () {
    this.option('period', 'period length, same as --period_length', String, '1m')
    this.option('period_length', 'period length, same as --period', String, '1m')
    this.option('buy_price', 'buy price', Number, 0.9993) //0.998
    this.option('sell_price', 'buy price', Number, 1.0) //0.9995
  },

  calculate: function (s) {
  },

  onPeriod: function (s, cb) {
    if (s.period.close <= s.options.buy_price) {
      s.signal = 'buy'
    } else if (s.period.close >= s.options.sell_price) {
      s.signal = 'sell'
    } else {
      s.signal = null // hold
    }
    cb()
  },

  onReport: function (s) {
    var cols = []
    var color = 'grey'
    if (s.period.close <= s.options.buy_price) {
      color = 'green'
    } else if (s.period.close >= s.options.sell_price) {
      color = 'red'
    }
    cols.push(z(8, n(s.period.close).format('0.000000'), ' ')[color])
    return cols
  },

  phenotypes: {
    // -- common
    period_length: Phenotypes.RangePeriod(1, 120, 'm'),
    markdown_buy_pct: Phenotypes.RangeFloat(-1, 5),
    markup_sell_pct: Phenotypes.RangeFloat(-1, 5),
    order_type: Phenotypes.ListOption(['maker', 'taker']),
    sell_stop_pct: Phenotypes.Range0(1, 50),
    buy_stop_pct: Phenotypes.Range0(1, 50),
    profit_stop_enable_pct: Phenotypes.Range0(1, 20),
    profit_stop_pct: Phenotypes.Range(1,20),

    // -- strategy
    buy_price: Phenotypes.RangeFloat(0.9, 1.2),
    sell_price: Phenotypes.RangeFloat(0.9, 1.2)
  }
}

