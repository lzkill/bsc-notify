export interface Offer {
  apiKeyId: string;
  base: string;
  baseAmount: string;
  confirmedAt?: string;
  createdAt: Date;
  efPrice: string;
  expiresAt: Date;
  id: number;
  isQuote: boolean;
  offerId: string;
  op: string;
  quote: string;
  quoteAmount: string;
}

export interface Trade {
  checkedAt?: Date;
  closeOffer?: Offer;
  id: number;
  openOffer: Offer;
  owner?: string;
  status: string;
  strategy?: string;
  type?: string;
}

export enum TradeEvent {
  TRADE_OPEN = 'trade-open',
  TRADE_BROKEN = 'trade-broken',
  TRADE_CLOSED = 'trade-closed',
}
