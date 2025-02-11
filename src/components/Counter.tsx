import { type ReactNode, useState } from 'react';

import { Apple } from './apple';

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

  return (
    <>
      <div className="counter">
        <button onClick={subtract}>-</button>
        <pre>{count}</pre>
        <button onClick={add}>+</button>
      </div>
      <Apple />
      <p className="text-red-500 font-bold">MEOW</p>
      <div className="counter-message">{children}</div>
    </>
  );
}
