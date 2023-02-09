import { useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

export interface Transaction {
  id: number;
  price: number;
  type: "outcome" | "income";
  description: string;
  category: string;
  created_at: string; // ISO
}

interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionData) => Promise<void>;
}

interface CreateTransactionData {
  description: string;
  price: number;
  category: string;
  type: "outcome" | "income";
}

interface TransactionsProviderProps {
  children: React.ReactNode;
  createTransaction: (data: CreateTransactionData) => Promise<void>;
  fetchTransactions: (query?: string) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const createTransaction = useCallback(async (data: CreateTransactionData) => {
    const { description, price, category, type } = data;

    const payload = {
      description,
      price,
      category,
      type,
      created_at: new Date(),
    };
    const response = await api.post("/transactions", payload);

    setTransactions((prev) => [{ ...response.data }, ...prev]);
  }, []);

  const fetchTransactions = useCallback(async (q?: string) => {
    const response = await api.get("/transactions", {
      params: {
        q,
        _sort: "created_at",
        _order: "desc",
      },
    });

    setTransactions(response.data);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, fetchTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
