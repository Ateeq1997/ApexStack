export const currency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);

export const sentenceCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
