export default function currencyFormatter(amount: number): string {
  const currencyOptions: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };

  return new Intl.NumberFormat("id-ID", currencyOptions).format(amount);
}
