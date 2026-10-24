const ACCOUNT_DOTS: Record<string, string> = {
  Binance: '#EBBC00',
  Bybit: '#6A00EB',
  OKX: '#5D9EFF',
  Bitget: '#0FED9F',
};

interface TradeRow {
  symbol: string;
  account: string;
  accountId: string;
  side: string;
  long: boolean;
  outcome: string;
  pnl: string;
  positive: boolean;
}

const ROWS: TradeRow[] = [
  {
    symbol: 'BTC',
    account: 'Binance',
    accountId: 'efeb2',
    side: 'Long 10x',
    long: true,
    outcome: 'Captured 71%',
    pnl: '$1,843',
    positive: true,
  },
  {
    symbol: 'ETH',
    account: 'Bybit',
    accountId: 'b9c13',
    side: 'Short 3x',
    long: false,
    outcome: 'Exited early',
    pnl: '-$320',
    positive: false,
  },
  {
    symbol: 'SOL',
    account: 'OKX',
    accountId: 'a7d49',
    side: 'Long 5x',
    long: true,
    outcome: 'Captured 44%',
    pnl: '$147',
    positive: true,
  },
  {
    symbol: 'SUI',
    account: 'Bitget',
    accountId: 'd12e7',
    side: 'Long 10x',
    long: true,
    outcome: 'Held to target',
    pnl: '$612',
    positive: true,
  },
  {
    symbol: 'ARB',
    account: 'Bybit',
    accountId: 'b9c13',
    side: 'Long 8x',
    long: true,
    outcome: 'Held to target',
    pnl: '$926',
    positive: true,
  },
  {
    symbol: 'LINK',
    account: 'Binance',
    accountId: 'efeb2',
    side: 'Short 5x',
    long: false,
    outcome: 'Exited early',
    pnl: '-$184',
    positive: false,
  },
  {
    symbol: 'XRP',
    account: 'OKX',
    accountId: 'a7d49',
    side: 'Long 3x',
    long: true,
    outcome: 'Captured 88%',
    pnl: '$413',
    positive: true,
  },
  {
    symbol: 'ENA',
    account: 'Bitget',
    accountId: 'd12e7',
    side: 'Short 3x',
    long: false,
    outcome: 'Captured 61%',
    pnl: '$204',
    positive: true,
  },
];

const HEADER_CELLS = [
  { label: 'Account', className: 'w-[130px] shrink-0' },
  { label: 'Symbol', className: 'w-[65px] shrink-0' },
  { label: 'Side', className: 'w-[90px] shrink-0' },
  { label: 'Trade Outcome', className: 'min-w-[128px] flex-1' },
  { label: 'Realized PnL', className: 'w-[77px] shrink-0' },
];

export default function TradeLogPanel() {
  return (
    <div className="relative mx-auto w-full max-w-[570px]">
      {/* Blue glow bleeding out from behind the panel (bottom-right, per Figma Vector 1) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-14 -bottom-2 h-[464px] w-[513px] rotate-[75deg] bg-[#5D80FF] opacity-70 blur-[150px]"
      />

      <div className="relative flex min-h-[600px] w-full items-center justify-center rounded-[24px] bg-[#0A0B14] p-4 sm:p-6">
        <div className="flex w-full max-w-[522px] flex-col gap-4">
          {/* Panel header */}
          <div className="flex items-center justify-between gap-4">
            <p className="font-inter-tight text-[16px] leading-[150%] font-normal text-white">
              Trade log
            </p>
            <span className="flex items-center gap-2 rounded-[6px] border-[1.5px] border-[#22C55E]/20 bg-[#22C55E]/10 py-[2px] pr-3 pl-2">
              <span className="h-[5px] w-[5px] rounded-full bg-[#22C55E]" />
              <span className="flex items-center gap-1">
                <span className="font-inter-tight text-[12px] leading-[150%] font-medium text-[#22C55E]">
                  4 accounts
                </span>
                <span className="h-[2px] w-[2px] rounded-full bg-[#22C55E]/20" />
                <span className="font-inter-tight text-[12px] leading-[150%] font-medium text-[#22C55E]">
                  Synced live
                </span>
              </span>
            </span>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-[8px] border-[1.5px] border-white/[0.05]">
            <div className="overflow-x-auto">
              <div className="min-w-[522px]">
                {/* Table header */}
                <div className="flex items-center justify-between border-b-[1.5px] border-white/[0.05] bg-white/[0.05] px-4 py-3">
                  {HEADER_CELLS.map((cell) => (
                    <p
                      key={cell.label}
                      className={`font-inter-tight text-[14px] leading-[150%] font-normal whitespace-nowrap text-white/70 ${cell.className}`}
                    >
                      {cell.label}
                    </p>
                  ))}
                </div>

                {/* Rows */}
                {ROWS.map((row, i) => (
                  <div
                    key={row.symbol}
                    className={`flex h-[54px] items-center justify-between bg-white/[0.01] p-4 ${
                      i === ROWS.length - 1 ? '' : 'border-b-[1.5px] border-white/[0.05]'
                    }`}
                  >
                    {/* Account */}
                    <div className="w-[130px] shrink-0">
                      <span className="inline-flex items-center gap-1 rounded-[6px] border border-white/20 bg-white/[0.01] px-2 py-[2px]">
                        <span
                          className="h-1 w-1 shrink-0 rounded-full"
                          style={{ background: ACCOUNT_DOTS[row.account] }}
                        />
                        <span className="flex items-center gap-1">
                          <span className="font-inter-tight text-[12px] leading-[150%] font-normal text-white/70">
                            {row.account}
                          </span>
                          <span className="h-[2px] w-[2px] rounded-full bg-white/30" />
                          <span className="font-inter-tight text-[12px] leading-[150%] font-normal text-white/70">
                            {row.accountId}
                          </span>
                        </span>
                      </span>
                    </div>

                    {/* Symbol */}
                    <p className="w-[65px] shrink-0 font-inter-tight text-[14px] leading-[130%] font-medium text-white">
                      {row.symbol}
                    </p>

                    {/* Side */}
                    <div className="w-[90px] shrink-0">
                      <span
                        className={`inline-flex items-center rounded-[6px] border-[1.5px] px-2 py-[2px] font-inter-tight text-[12px] leading-[150%] font-medium ${
                          row.long
                            ? 'border-[#22C55E]/20 bg-[#22C55E]/10 text-[#22C55E]'
                            : 'border-[#EF4444]/20 bg-[#EF4444]/10 text-[#EF4444]'
                        }`}
                      >
                        {row.side}
                      </span>
                    </div>

                    {/* Outcome */}
                    <p className="min-w-[128px] flex-1 font-inter-tight text-[14px] leading-[150%] font-normal text-white/50">
                      {row.outcome}
                    </p>

                    {/* Realized PnL */}
                    <p
                      className={`w-[77px] shrink-0 font-inter-tight text-[14px] leading-[150%] font-medium ${
                        row.positive ? 'text-[#22C55E]' : 'text-[#EF4444]'
                      }`}
                    >
                      {row.pnl}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
