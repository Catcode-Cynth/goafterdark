import React from "react";
import { CreditCard, Smartphone, Wallet } from "lucide-react";

const iconMap = {
  credit_card: CreditCard,
  mobile_money: Smartphone,
  paypal: Wallet,
};

const labelMap = {
  credit_card: "Credit Card",
  mobile_money: "Mobile Money",
  paypal: "PayPal",
};

export default function PaymentOption({ method, selected, onClick }) {
  const Icon = iconMap[method];
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
        selected
          ? "border-primary bg-accent"
          : "border-border bg-card hover:border-primary/40"
      }`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
        selected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
      }`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="font-medium text-sm text-card-foreground">{labelMap[method]}</span>
      <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        selected ? "border-primary" : "border-muted-foreground/30"
      }`}>
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
      </div>
    </button>
  );
}