import { format } from "path/posix";
import { FormEvent, useState } from "react";
import { SearchResults } from "../components/SearchResults";

import styles from "../styles/Home.module.scss";

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    setResults(data);
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Search</h1>

        <form onSubmit={handleSearch} className={styles.form}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Buscar
          </button>
        </form>
      </div>

      <div className={styles.results}>
        <SearchResults results={results} />
      </div>
    </div>
  );
}
