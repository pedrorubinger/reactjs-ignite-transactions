import { createContext, useEffect, useState } from "react";

export interface Transaction {
  id: number;
  price: number;
  type: "outcome" | "income";
  description: string;
  category: string;
  createdAt: string; // ISO
}

interface TransactionsContextType {
  transactions: Transaction[];
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    const response = await fetch("http://localhost:3334/transactions");
    const data = await response.json();

    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};
