import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Github, Menu, Search, Smartphone } from "lucide-react";
import { useRef, useState } from "react";

import { searchApiSearchPostMutation } from "@/client/@tanstack/react-query.gen";
import type { SearchPhone } from "@/client/types.gen";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from "@/components/ui/menubar";

const Navbar = () => {
  const searchMutation = useMutation(searchApiSearchPostMutation());

  const [query, setQuery] = useState<SearchPhone[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const searchFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setQuery([]);

    if (value.trim() === "") {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      searchMutation
        .mutateAsync({ query: { keyword: value } })
        .then((data) => {
          setQuery(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  };

  return (
    <nav className="flex items-center p-8 sticky top-0 z-50 uppercase">
      <Link to="/" className="flex gap-1 items-center text-xl">
        <h1>CEDTPhone</h1>
        <Smartphone />
      </Link>

      <div className="hidden lg:flex ml-32 gap-4">
        <Link to="/" className="underline">
          Home
        </Link>
        <Link to="/about" className="underline">
          About
        </Link>
        <Link to="/export" className="underline">
          Export CSV
        </Link>
      </div>

      <div className="hidden lg:flex ml-auto items-center gap-4">
        <div className="relative">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={22} />
          </span>
          <input
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={searchFunction}
            className="border-b border-gray-400 px-3 py-2 w-80 pl-10 focus:outline-none focus:border-white"
          />

          {isLoading && (
            <div className="absolute left-0 top-12 bg-white border w-full z-10 text-[#151515] max-h-60 overflow-y-auto">
              <p className="p-2">Loading...</p>
            </div>
          )}

          {inputValue.trim() !== "" && query.length === 0 && !isLoading && (
            <div className="absolute left-0 top-12 bg-white border w-full z-10 text-[#151515] max-h-60 overflow-y-auto">
              <p className="p-2">Not Found</p>
            </div>
          )}

          {inputValue.trim() !== "" && query.length > 0 && (
            <div className="absolute left-0 top-12 bg-white border w-full z-10 text-[#151515] max-h-60 overflow-y-auto">
              {query.map((brand, i) => (
                <Link
                  to="/device/spec"
                  key={i}
                  search={{ phone_url: brand.href }}
                  onClick={() => setInputValue("")}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 text-[#151515]"
                >
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="w-10 h-10 object-contain rounded"
                  />
                  <span>{brand.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <a
          href="https://github.com/CEaussadawut/smartphone_web_crawler"
          target="_blank"
        >
          <Github />
        </a>
      </div>

      <div className="lg:hidden ml-auto">
        <Menubar className="text-[#151515]">
          <MenubarMenu>
            <MenubarTrigger>
              <Menu />
            </MenubarTrigger>
            <MenubarContent align="end">
              <Link to="/">
                <MenubarItem>Home</MenubarItem>
              </Link>
              <MenubarSeparator />
              <Link to="/about">
                <MenubarItem>About</MenubarItem>
              </Link>
              <MenubarSeparator />
              <MenubarItem>
                <Link to="/export">Export CSV</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </nav>
  );
};

export default Navbar;
