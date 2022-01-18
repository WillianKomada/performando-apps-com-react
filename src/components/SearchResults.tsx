// import { useMemo } from "react";
import { List, ListRowRenderer } from "react-virtualized";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    title: string;
    price: number;
    priceFormatted: string;
  }>;
  onAddToWishList: (id: number) => void;
}

export function SearchResults({
  results,
  onAddToWishList,
  totalPrice,
}: SearchResultsProps) {
  // const totalPrice = useMemo(() => {
  //   const totalPrice = results.reduce((total, product) => {
  //     return total + product.price;
  //   }, 0);
  //   return totalPrice;
  // }, [results]);

  const rowRender: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRender}
      />

      {/* {results.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishList={onAddToWishList}
          />
        );
      })} */}
    </div>
  );
}

// Quais situações utilizar useMemo

/**
 * 1. Cálculos pesados
 * 2. Igualdade referencial (quando a gente repassa uma informação à um componente filho)
 */

// Quais situações utiliza useCallback

/**
 * 1. Igualdade referencial (para evitar que um novo espaço na memória seja criado sem necessidade)
 */
