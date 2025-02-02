import { useEffect, useState, type ReactNode } from "react";

export default function Counter({
  children,
  count: initialCount,
}: {
  children: ReactNode;
  count: number;
}) {
  const [count, setCount] = useState(initialCount);
  const add = () => setCount((index) => index + 1);

  const subtract = () => setCount((index) => index - 1);
  const meme = ["1", "2"];
  const t = meme.forEach((e) => console.log(e));
  const e = 2;
  console.log(t);

  return (
    <>
      <div className="counter">
        <button onClick={subtract}>-</button>
        <pre>{count}</pre>
        <button onClick={add}>+</button>
      </div>
      <p className="text-red-500 font-bold">MEOW</p>
      <div className="counter-message">{children}</div>
    </>
  );
}
