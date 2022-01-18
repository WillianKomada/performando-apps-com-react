import { memo, useState } from "react";
import { AddProductToWishListProps } from "./AddProductToWishList";
import dynamic from "next/dynamic";
import lodash from "lodash";

/**
 * Can i use dynamic from next OR lazy from react
 */

const AddProductToWishList = dynamic<AddProductToWishListProps>(
  async () => {
    return await import("./AddProductToWishList").then(
      (mod) => mod.AddProductToWishList
    );
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);

interface ProductItemProps {
  product: {
    id: number;
    title: string;
    price: number;
    priceFormatted: string;
  };
  onAddToWishList: (id: number) => void;
}

// Shallow compare -> Comparação rasa

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);

// export const ProductItem = memo(
//   ProductItemComponent,
//   (prevProps, nextProps) => {
//     return Object.is(prevProps.product, nextProps.product);
//   }
// );

// Quais situações usar memo

/**
 * 1. Pure Functional Components
 * (Informações que não dependam de coisas externas)
 *
 * 2. Renders too often
 * (Ao utilizar o react dev tools tem a opção highlight que mostra quais
 * componentes estao renderizando no 'case' e assim identificar e aplicar o memo,
 * caso necessário)
 *
 * 3. Re-renders with same props (Renderiza com as mesma propriedades)
 *
 * 4. Medium to big size (Memo trás grandes ganhos dentro de componentes médios/grandes)
 */
