import { getDiscountedPricePercentage } from "../utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const ProductCard = ({ p }) => {
    return (
        <Link
            href={`/product/${p?._id}`}
            className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
        >
            <div className="h-72 flex justify-center items-center">
                <Image
                    width={500}
                    height={500}
                    src={p.image[0].url}
                    alt={p.image[0].name}
                />
            </div>
            <div className="p-4 text-black/[0.9] ">
                <h2 className="text-lg font-medium">{p.name}</h2>
                <div className="flex items-center text-black/[0.5]">
                    <p className="mr-2 text-lg font-semibold">
                        &#8377;{p.price}
                    </p>

                    {p.original_price && (
                        <>
                            <p className="text-base  font-medium line-through">
                                &#8377;{p.original_price}
                            </p>
                            <p className="ml-auto text-base font-medium text-green-500">
                                {getDiscountedPricePercentage(
                                    p.original_price,
                                    p.price
                                )}
                                % off
                            </p>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;