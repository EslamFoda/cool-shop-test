import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import { Button } from "./components/ui/button";
import { Row } from "./types";
import CalculatorRow from "./components/calculatorRow";
import { useMotion } from "./hooks/useMotion";

const initialRow: Row = { id: uuid(), sign: "+", value: 0, enabled: true };

function App() {
  const [rows, setRows] = useState<Row[]>(() => {
    // Load from localStorage or initialize with the default row
    const savedRows = localStorage.getItem("calculatorRows");
    return savedRows ? JSON.parse(savedRows) : [initialRow];
  });

  const { motion, AnimatePresence } = useMotion();

  // Save rows to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("calculatorRows", JSON.stringify(rows));
  }, [rows]);

  // add new calculator row
  const handleAddRow = () => setRows([...rows, { ...initialRow, id: uuid() }]);

  // delete calculator row
  const handleDeleteRow = (id: string) =>
    setRows(rows.filter((row) => row.id !== id));

  // update calculator row properties
  const updateRow = (id: string, updates: Partial<Row>) =>
    setRows(rows.map((row) => (row.id === id ? { ...row, ...updates } : row)));

  // calculate result
  const calculateResult = () =>
    rows
      .filter((row) => row.enabled)
      .reduce(
        (acc, row) => acc + (row.sign === "+" ? row.value : -row.value),
        0
      );

  return (
    <div className="container p-10">
      <motion.div
        className="inline-block"
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button onClick={handleAddRow}>Add row</Button>
      </motion.div>
      <AnimatePresence>
        {rows.map((row: Row) => (
          <CalculatorRow
            key={row.id}
            row={row}
            onUpdate={(updates) => updateRow(row.id, updates)}
            onDelete={() => handleDeleteRow(row.id)}
          />
        ))}
      </AnimatePresence>
      <div className="mt-6">
        <h2 className="text-lg font-bold">Result: {calculateResult()}</h2>
      </div>
    </div>
  );
}

export default App;
