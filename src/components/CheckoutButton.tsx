import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function CheckoutButton() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { items, total } = useCartStore();
  const [currency, setCurrency] = useState('usd'); // Valeur par défaut

  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);  // Mettre à jour la devise
  };

  const handleCheckout = async () => {
    const itemsCheckout = items.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity / 1000, // Prix en centimes
    }));

    const customerName = "Jean Dupont";

    try {
      const response = await fetch("https://servergrowth.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ itemsCheckout, customerName, currency }) // Passer la devise choisie
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la session de paiement");
      }

      const { id, url } = await response.json();
      window.location.href = url;  // Rediriger vers la page Stripe
    } catch (error) {
      console.error("Erreur :", error);
      alert("Échec du paiement !");
    }
  };

  return (
    <div>
      <motion.button
        onClick={handleCheckout}
        disabled={isLoading || items.length === 0}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <CreditCard className="w-5 h-5" />
        {isLoading ? t('cart.processing') : t('cart.checkout')}
      </motion.button>
    </div>
  );
}
