import { SunOutlined } from '@ant-design/icons';
import './index.css';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);
  return (
    <header className="flex justify-between text-center center max-w-200 m-auto pt-1 px-4 pb-2">
      <div>Tyson Le</div>
      <SunOutlined className="sun-icon" onClick={() => setIsDark(!isDark)} />
    </header>
  );
}
