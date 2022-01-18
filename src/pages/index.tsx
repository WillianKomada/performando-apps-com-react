import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

// import styles from "../styles/Home.module.scss";

type Results = {
  totalPrice: number;
  data: Product[];
};

type Product = {
  id: number;
  title: string;
  price: number;
  priceFormatted: string;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: [],
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data: Product[] = await response.json();

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const products = data.map((product: Product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      };
    });

    const totalPrice: number = data.reduce(
      (total: number, product: Product) => {
        return total + product.price;
      },
      0
    );

    setResults({ totalPrice, data: products });
  }

  // async function AddToWishList(id: number) {
  //   console.log(id);
  // }

  const AddToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <div>
        <h1>Search</h1>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </div>

      <div>
        <SearchResults
          results={results.data}
          totalPrice={results.totalPrice}
          onAddToWishList={AddToWishList}
        />
      </div>
    </div>
  );
}
