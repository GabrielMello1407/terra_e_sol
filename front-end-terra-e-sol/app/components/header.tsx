import Image from 'next/image';

export default function Header() {
  return (
    <header>
      <Image
        src="/terra_logo.svg"
        width={100}
        height={100}
        alt="Terra e sol Logo"
      />
      <a rel="stylesheet" href="/pedidos_do_dia">
        Pedidos do dia
      </a>
    </header>
  );
}
