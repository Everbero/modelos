import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white body-font shadow w-full">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <span className="ml-3 text-xl">Meu modelo</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a href="/" className="mr-5 hover:text-gray-400">
            Início
          </a>
          <a href="/sobre" className="mr-5 hover:text-gray-400">
            Sobre
          </a>
          <a href="/contato" className="mr-5 hover:text-gray-400">
            Contato
          </a>
        </nav>
        <Link href="/anuncios/criar">
          <button className="inline-flex items-center bg-gray-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
            Cadastrar Anúncio
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14M5 12h14"></path>
            </svg>
          </button>
        </Link>
      </div>
    </header>
  );
}
