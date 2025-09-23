'use client'
import React, { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from 'react-icons/io'
import Wrapper from "../../../components/Wrapper";
import ProductDetailsCarousel from "../../../components/ProductDetailsCarousel";
import RelatedProducts from "../../../components/RelatedProducts";
import { getDiscountedPricePercentage } from "../../../utils/helper";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToWishlist } from "../../../store/wishlist";

const ProductDetails = ({ params }) => {
    const [selectedSize, setSelectedSize] = useState();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState();
    const dispatch = useDispatch();
    const wishlistData = useSelector(state => state.wishlist)
    const isWishlisted = wishlistData && wishlistData.filter(prod => prod._id === product?._id);
    useEffect(() => {
        (async () => {
            setLoading(true)
            const response = await fetch(`http://localhost:3000/api/product/${params.id}`)
            const result = await response.json();
            setProduct(result.data)
            setLoading(false)
        })()
    }, [params.id])
    const notify = () => {
        toast.success("Success. Check your cart!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };
    useEffect(() => {
        document
            .getElementById("header")
            .scrollIntoView({
                block: "start",
                behavior: "smooth",
            });
    }, [])
    return (
        <>
            {!product ? <div className="h-[45vh] flex justify-center items-center"><span class="loader"></span></div> :
                <div className="w-full md:py-20">
                    <ToastContainer />
                    <Wrapper>
                        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                            {/* left column start */}
                            <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                                <ProductDetailsCarousel images={product?.image} />
                            </div>
                            {/* left column end */}

                            {/* right column start */}
                            <div className="flex-[1] py-3">
                                {/* PRODUCT TITLE */}
                                <div className="text-[34px] font-semibold mb-2 leading-tight">
                                    {product?.name}
                                </div>

                                {/* PRODUCT SUBTITLE */}
                                <div className="text-lg font-semibold mb-5">
                                    {product?.subtitle}
                                </div>

                                {/* PRODUCT PRICE */}
                                <div className="flex items-center">
                                    <p className="mr-2 text-lg font-semibold">
                                        MRP : &#8377;{product?.price}
                                    </p>
                                    {product?.original_price && (
                                        <>
                                            <p className="text-base  font-medium line-through">
                                                &#8377;{product.original_price}
                                            </p>
                                            <p className="ml-auto text-base font-medium text-green-500">
                                                {getDiscountedPricePercentage(
                                                    product?.original_price,
                                                    product?.price
                                                )}
                                                % off
                                            </p>
                                        </>
                                    )}
                                </div>

                                <div className="text-md font-medium text-black/[0.5]">
                                    incl. of taxes
                                </div>
                                <div className="text-md font-medium text-black/[0.5] mb-20">
                                    {`(Also includes all applicable duties)`}
                                </div>

                                {/* PRODUCT SIZE RANGE START */}
                                <div className="mb-10">
                                    {/* HEADING START */}
                                    <div className="flex justify-between mb-2">
                                        <div className="text-md font-semibold">
                                            Select Size
                                        </div>
                                        <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                                            Select Guide
                                        </div>
                                    </div>
                                    {/* HEADING END */}

                                    {/* SIZE START */}
                                    <div
                                        id="sizesGrid"
                                        className="grid grid-cols-3 gap-2"
                                    >
                                        {product?.size.map((item, i) => (
                                            <div
                                                key={i}
                                                className={`border rounded-md text-center py-3 font-medium ${item.enabled
                                                    ? "hover:border-black cursor-pointer"
                                                    : "cursor-not-allowed bg-black/[0.1] opacity-50"
                                                    } ${selectedSize === item.size
                                                        ? "border-black"
                                                        : ""
                                                    }`}
                                                onClick={() => {
                                                    setSelectedSize(item.size);
                                                    setShowError(false);
                                                }}
                                            >
                                                {item.size}
                                            </div>
                                        ))}
                                    </div>
                                    {/* SIZE END */}

                                    {/* SHOW ERROR START */}
                                    {showError && (
                                        <div className="text-red-600 mt-1">
                                            Size selection is required
                                        </div>
                                    )}
                                    {/* SHOW ERROR END */}
                                </div>
                                {/* PRODUCT SIZE RANGE END */}

                                {/* ADD TO CART BUTTON START */}
                                <button
                                    className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                                    onClick={() => {
                                        if (!selectedSize) {
                                            setShowError(true);
                                            document
                                                .getElementById("sizesGrid")
                                                .scrollIntoView({
                                                    block: "center",
                                                    behavior: "smooth",
                                                });
                                        } else {
                                            dispatch(
                                                addToCart({
                                                    ...product,
                                                    selectedSize,
                                                    oneQuantityPrice: product.price,
                                                })
                                            );
                                            notify();
                                        }
                                    }}
                                >
                                    Add to Cart
                                </button>
                                {/* ADD TO CART BUTTON END */}

                                {/* WHISHLIST BUTTON START */}
                                <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 mb-10"
                                    onClick={() => {
                                        if (!selectedSize) {
                                            setShowError(true);
                                            document
                                                .getElementById("sizesGrid")
                                                .scrollIntoView({
                                                    block: "center",
                                                    behavior: "smooth",
                                                });
                                        } else {
                                            dispatch(
                                                addToWishlist({
                                                    ...product,
                                                    selectedSize,
                                                    oneQuantityPrice: product.price,
                                                })
                                            );
                                        }
                                    }}
                                    disabled={isWishlisted.length > 0}
                                >
                                    Whishlist
                                    {!isWishlisted.length > 0 ? <IoMdHeartEmpty size={20} /> : <IoMdHeart size={20} className="text-red-600" />}

                                </button>
                                {/* WHISHLIST BUTTON END */}

                                <div>
                                    <div className="text-lg font-bold mb-5">
                                        Product Details
                                    </div>
                                    <div className="markdown text-md mb-5">
                                        <ReactMarkdown>{product?.description}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                            {/* right column end */}
                        </div>

                        {/* <RelatedProducts products={products} /> */}
                    </Wrapper>
                </div>
            }
        </>

    );
};

export default ProductDetails;
