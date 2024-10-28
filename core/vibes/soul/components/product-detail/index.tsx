'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { clsx } from 'clsx';
import { useState } from 'react';

import { BcImage } from '~/components/bc-image';

import { Button } from '@/vibes/soul/components/button';
import { Counter } from '@/vibes/soul/components/counter';
import { Favorite } from '@/vibes/soul/components/favorite';
import { Label } from '@/vibes/soul/components/label';
import { Product } from '@/vibes/soul/components/product-card';
import { Price } from '@/vibes/soul/components/product-card/price';
import { ProductGallery } from '@/vibes/soul/components/product-detail/product-gallery';
import { Rating } from '@/vibes/soul/components/rating';

interface Image {
  altText: string;
  src: string;
}

interface ProductDetailType extends Product {
  options?: string[];
  swatches?: Array<{
    id: string;
    name: string;
    image?: Image;
    hex?: string;
  }>;
  images?: Image[];
}

export interface ProductDetailProps {
  product: ProductDetailType;
  action?: (formData: FormData) => void;
}

export const ProductDetail = function ProductDetail({ product, action }: ProductDetailProps) {
  const [favorited, setFavorited] = useState(false);
  const [selectedOption, setSelectedOption] = useState(product.options?.[0] ?? null);
  const [selectedSwatch, setSelectedSwatch] = useState(product.swatches?.[0] ?? null);

  return (
    <section className="bg-background flex flex-col @container">
      <div className="mx-auto grid h-full w-full max-w-screen-2xl flex-grow @4xl:min-h-[800px] @4xl:grid-cols-2">
        <ProductGallery images={product.images ?? []} />

        {/* Product Details */}
        <div className="text-foreground my-auto flex flex-col gap-4 px-3 py-10 @xl:px-6 @4xl:py-28 @5xl:px-20">
          <h2 className="font-heading text-3xl font-medium leading-none">{product.name}</h2>
          <Rating rating={product.rating ?? 0} />
          {product.description != null && product.description !== '' && (
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          )}
          <Price className="!text-2xl" price={product.price ?? ''} />

          <form action={action} className="mt-6 flex flex-col gap-4 @4xl:mt-12">
            <input name="product_id" type="hidden" value={product.id} />
            {/* Options */}
            {product.options && (
              <>
                <Label>Size</Label>
                <RadioGroupPrimitive.Root className="flex flex-wrap gap-2.5">
                  {product.options.map((option, index) => (
                    <RadioGroupPrimitive.Item
                      className={clsx(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors duration-300',
                        'ring-primary focus-visible:outline-0 focus-visible:ring-2',
                        option === selectedOption
                          ? 'bg-foreground text-background'
                          : 'bg-contrast-100 hover:bg-contrast-200',
                      )}
                      key={index}
                      onClick={() => setSelectedOption(option)}
                      value={option}
                    >
                      {option}
                    </RadioGroupPrimitive.Item>
                  ))}
                </RadioGroupPrimitive.Root>
              </>
            )}

            {/* Swatches */}
            {product.swatches && (
              <>
                {/* TODO: Restructure JSON to include group name */}
                <Label className="mt-6">
                  {(selectedSwatch?.name != null && selectedSwatch.name !== '') || 'Color'}
                </Label>
                <RadioGroupPrimitive.Root className="flex flex-wrap gap-2.5">
                  {product.swatches.map((swatch) => (
                    <RadioGroupPrimitive.Item
                      className={clsx(
                        'relative h-12 w-12 shrink-0 overflow-hidden rounded-full transition-colors duration-300',
                        'focus-visible:outline-0 focus-visible:ring-2',
                        swatch.id === selectedSwatch?.id ? 'ring-primary' : 'ring-transparent',
                      )}
                      key={swatch.id}
                      onClick={() => setSelectedSwatch(swatch)}
                      value={swatch.id}
                    >
                      {swatch.image?.src != null && swatch.image.src !== '' ? (
                        <BcImage
                          alt={swatch.image.altText}
                          className="h-full object-cover"
                          height={48}
                          src={swatch.image.src}
                          width={48}
                        />
                      ) : null}
                      {/* {swatch.name} */}
                    </RadioGroupPrimitive.Item>
                  ))}
                </RadioGroupPrimitive.Root>
              </>
            )}

            <div className="w-[116px]">
              <Counter current={1} name="quantity" />
            </div>

            <div className="mt-4 flex max-w-sm gap-2">
              <Button className="flex-grow" type="submit">
                Add to Cart
              </Button>
              <Favorite checked={favorited} setChecked={setFavorited} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
