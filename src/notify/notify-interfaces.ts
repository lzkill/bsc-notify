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

export interface Order {
  amount: string;
  base: string;
  checkedAt?: Date;
  createdAt: Date;
  id: number;
  isQuote: boolean;
  notBefore?: Date;
  op: string;
  refPrice?: string;
  status: string;
  offer?: Offer;
}

export enum TradeEvent {
  TRADE_OPEN = 'trade-open',
  TRADE_BROKEN = 'trade-broken',
  TRADE_CLOSED = 'trade-closed',
  ORDER_CLOSED = 'order-closed'
}
