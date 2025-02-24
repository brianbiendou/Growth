import { useSettingsStore, currencies } from '../store/settings';

export function usePrice() {
  const { currency } = useSettingsStore();
  
  const formatPrice = (priceInCents: number) => {
    // Convertir les centimes en dollars/euros
    const priceInBase = priceInCents / 100;
    // Appliquer le taux de change
    const convertedPrice = priceInBase * currencies[currency].rate;
    const currencySymbol = currencies[currency].symbol;
    
    // Formater avec exactement 1 décimale
    const formattedPrice = convertedPrice.toFixed(1);
    
    // Séparer les milliers
    const [integerPart, decimalPart] = formattedPrice.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    
    // Placer le symbole de la devise selon la convention
    if (currency === 'USD' || currency === 'GBP' || currency === 'EUR') {
      return `${currencySymbol}${formattedInteger}.${decimalPart}`;
    } else {
      return `${formattedInteger}.${decimalPart} ${currencySymbol}`;
    }
  };

  return { formatPrice };
}