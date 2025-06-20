"use client"
import { useState } from "react";
import Navbar from "../components/Navbar"
import ProductList from "../components/Product";

export default function Home() {
  const [search, setSearch] = useState('');

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <ProductList search={search} />
    </>
  );
}
