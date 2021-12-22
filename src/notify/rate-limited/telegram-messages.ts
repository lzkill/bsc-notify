import { TradeEvent, Trade } from "../trade-interfaces";

const StringBuilder = require('string-builder');
const emoji = require('node-emoji');
const humanize = require('humanize-duration');

export function formatWelcomeMessage() {
  const prefix = `${emoji.get(':dollar:')} `;
  return `${prefix}Welcome to the ${bold('Biscoint Notify Service')}!`;
}

export function formatHelpMessage() {
  const prefix = emoji.get(':bulb:');
  return `${prefix}${bold('Available commands:')}

  - /bns_start nothing really useful
  - /bns_enable enable the service
  - /bns_disable disable the service
  - /bns_config get the service config
  - /bns_ping pong back
  - /bns_help show this message`;
}

export function formatServiceEnabledMessage() {
  const message = 'Service enabled';
  return formatGeneralInfoMessage(message);
}

export function formatServiceDisabledMessage() {
  const message = 'Service disabled';
  return formatGeneralInfoMessage(message);
}

export function formatPingMessage() {
  const message = 'Pong';
  return formatGeneralInfoMessage(message);
}

export function formatGeneralInfoMessage(message: string) {
  const prefix = emoji.get(':grey_exclamation:');
  return `${prefix}${message}`;
}

export function formatTradeOpenMessage(event: TradeEvent, trade: Trade) {
  const profile = tradeProfile(trade);

  const icon =
    event === TradeEvent.TRADE_BROKEN
      ? emoji.get(':black_circle:')
      : emoji.get(':white_circle:');

  const title = `Trade #${trade.id} ${event.replace('trade-', '')}:`;

  const sb = new StringBuilder();

  sb.append(`${icon} ${bold(title)}`);
  sb.appendLine();
  if (trade.owner) sb.appendLine(`${bold('Owner:')} ${trade.owner}`);
  if (trade.type) sb.appendLine(`${bold('Type:')} ${trade.type}`);
  if (trade.strategy) sb.appendLine(`${bold('Strategy:')} ${trade.strategy}`);
  sb.appendLine(`${bold('Base:')} ${trade.openOffer.base}`);
  sb.appendLine(`${bold('Open offer:')} ${trade.openOffer.offerId}`);
  sb.appendLine(
    `${bold('Open amount:')} ${profile.openAmount} ${profile.profitCoin}`,
  );
  sb.appendLine(`${bold('Operation:')} ${trade.openOffer.op}`);
  sb.appendLine(`${bold('EfPrice:')} ${trade.openOffer.efPrice}`);

  return sb.toString();
}

export function formatTradeClosedMessage(trade: Trade) {
  const profile = tradeProfile(trade);

  const profit = {
    abs: profile.closeAmount - profile.openAmount,
    perc: percent(profile.openAmount, profile.closeAmount),
  };

  let icon: string;
  let profitTitle: string;
  if (profit.perc < 0) {
    icon = emoji.get(':red_circle:');
    profitTitle = 'Loss:';
  } else {
    icon = emoji.get(':large_green_circle:');
    profitTitle = 'Profit:';
  }

  const profitAbs = formatFractionDigits(profit.abs, profile.profitCoin);
  const profitPerc = profit.perc.toFixed(2);
  const title = `Trade #${trade.id} closed:`;
  const duration = getTradeDuration(trade);

  const sb = new StringBuilder();

  sb.append(`${icon} ${bold(title)}`);
  sb.appendLine();
  if (trade.owner) sb.appendLine(`${bold('Owner:')} ${trade.owner}`);
  if (trade.type) sb.appendLine(`${bold('Type:')} ${trade.type}`);
  if (trade.strategy) sb.appendLine(`${bold('Strategy:')} ${trade.strategy}`);
  sb.appendLine(`${bold('Base:')} ${trade.openOffer.base}`);
  sb.appendLine(`${bold('Open offer:')} ${trade.openOffer.offerId}`);
  sb.appendLine(
    `${bold('Open amount:')} ${profile.openAmount} ${profile.profitCoin}`,
  );
  sb.appendLine(`${bold('Close offer:')} ${trade.closeOffer.offerId}`);
  sb.appendLine(
    `${bold('Close amount:')} ${profile.closeAmount} ${profile.profitCoin}`,
  );
  sb.appendLine(
    `${bold(profitTitle)} ${profitAbs} ${profile.profitCoin} (${profitPerc}%)`,
  );
  sb.appendLine(`${bold('Duration:')} ${duration}`);

  return sb.toString();
}

function tradeProfile(trade: Trade) {
  const profile = {
    openAmount: undefined,
    closeAmount: undefined,
    profitCoin: undefined,
  };

  // Trade iniciou com BRL
  if (trade.openOffer.isQuote) {
    profile.openAmount = +trade.openOffer.quoteAmount;
    profile.closeAmount = +trade.closeOffer?.quoteAmount;
    profile.profitCoin = trade.openOffer.quote;
  } else {
    profile.openAmount = +trade.openOffer.baseAmount;
    profile.closeAmount = +trade.closeOffer?.baseAmount;
    profile.profitCoin = trade.openOffer.base;
  }

  return profile;
}

function percent(value1: number, value2: number) {
  return (value2 / value1 - 1) * 100;
}

function formatFractionDigits(value: number, coin: string) {
  const coinDigits = {
    BRL: 2,
    BTC: 8,
    ETH: 8,
  };
  return value.toFixed(coinDigits[coin]);
}

function getTradeDuration(trade: Trade) {
  const openedAt = new Date(trade.openOffer.confirmedAt).getTime();
  const closedAt = new Date(trade.closeOffer.confirmedAt).getTime();
  return humanize(closedAt - openedAt, { largest: 2 });
}

function bold(text: string) {
  return `<b>${text}</b>`;
}
