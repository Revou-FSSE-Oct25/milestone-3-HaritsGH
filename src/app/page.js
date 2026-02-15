'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <Link href={'/login'}>Login</Link>
  );
}