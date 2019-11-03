# Zenbot Stable Coin Strategy

based on an idea from [BotStableArbitrageBINANCE](https://github.com/MatheusGrijo/BotStableArbitrageBINANCE) and [Stablecoins-Infinity-Profit-Bot](https://github.com/itxtoledo/Stablecoins-Infinity-Profit-Bot)

## Usage

Put folder stable_coin in the /extenstions/strategies folder, backfill binance.TUSD-USDT and then

````
./zenbot.sh sim binance.TUSD-USDT --days 30 --currency_capital 100 --strategy=stable_coin --period 1m --buy_price 0.998 --sell_price 0.9995 --avg_slippage_pct 0.00150 --silent
````

````
./zenbot.sh sim binance.PAX-USDT --days 30 --currency_capital 100 --strategy=stable_coin --period 1m --buy_price 0.9993 --sell_price 1.0 --avg_slippage_pct 0.00150 --buy_pct 100 --sell_pct 100 --silent
````