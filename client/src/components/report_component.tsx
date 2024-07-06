"use client";
import React, { useState, useEffect } from "react";
import EditableTable from "@/components/EditableTable";
import { Button, Box } from "@mui/material";

import { authOptions } from "@/configs/next-auth";
import { getServerSession } from "next-auth/next";

interface Row {
  keyword: string;
  reason: string;
  categories: string[];
  quote: string;
  weight: number;
}

interface ReportProps {
  reportProps: {
    user_id: string;
    table_id: string;
  };
}

const Report: React.FC<ReportProps> = ({ reportProps }) => {
  const { user_id, table_id } = reportProps;

  const [symbols, setSymbols] = useState<string[]>(["AAPL", "GOOGL", "MSFT"]);
  const [currentSymbolNumber, setCurrentSymbol] = useState<number>(1);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    async function fetchSession() {
      const session = await getServerSession(authOptions);
      setSession(session);
      console.log("session", session);
    }
    fetchSession();
  }, []);

  console.log("user_id", user_id);

  const [tables, setTables] = useState<{ [key: string]: Row[] }>({
    0: [],
    1: [],
    2: [],
  });

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full shadow-lg rounded-lg px-5">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-center">Report</h1>
          <br />
          <Box display="flex" justifyContent="center" mb={2}>
            {symbols.map((symbol) => (
              <Button
                key={symbol}
                variant={
                  symbol === symbols[currentSymbolNumber] ? "outlined" : "text"
                }
                onClick={() =>
                  setCurrentSymbol(symbols.findIndex((s) => s === symbol))
                }
                style={{ margin: "0 5px" }}
              >
                {symbol}
              </Button>
            ))}
          </Box>
          <p>
            Please download the 10k report from the stock symbol mentioned and
            provide 10 keywords research
          </p>
          <br />
          <br />
          <hr />
          <br />

          <EditableTable
            rows={tables[currentSymbolNumber]}
            setRows={(rows) =>
              setTables({ ...tables, [currentSymbolNumber]: rows })
            }
            stockSymbol={symbols[currentSymbolNumber]}
            user_id={user_id}
            table_id={table_id}
          />
        </div>
      </div>
    </main>
  );
};

export default Report;