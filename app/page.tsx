"use client";

import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  AtSymbolIcon,
  CheckIcon,
  ChevronDownIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { purchaseAction } from "@/app/lib/actions";
import { Button } from "@/app/ui/components/button";
import { montserrat } from "@/app/ui/fonts/fonts";
import { Modal } from "@/app/ui/components/modal";
import { Monsieur_La_Doulaise } from "next/font/google";

export default function Home() {
  const seacrhParams = useSearchParams();
  const ref = seacrhParams.get("ref") || "";

  const [state, formAction] = useActionState(purchaseAction, null);
  const [product, setProduct] = useState("");
  const [modal, setModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct(e.target.value);
  };

  const closeModal = () => {
    setModal(false);
    setProduct("");
  };

  useEffect(() => {
    localStorage.setItem("affliate_id", ref);
  }, []);

  useEffect(() => {
    if (state?.success) {
      console.log(state.data);
      setModal(true);
    }
  }, [state]);

  return (
    <main>
      <div className="flex flex-col min-h-screen justify-center items-center">
        <div>
          <Image
            src="/logo.png"
            width={350}
            height={100}
            alt="Website Logo"
            className="mb-5 w-auto h-auto"
            loading="eager"
          />
        </div>
        <form action={formAction} className="flex gap-6 w-2/3">
          <div className="w-1/2 bg-white shadow-md rounded-md p-4">
            {/* Affiliate Code */}
            <input type="hidden" name="affiliate_id" value={ref} />
            {/* Product */}
            <div className="mb-4">
              <label
                htmlFor="product"
                className={`text-sm font-medium block mb-1 ${montserrat.className}`}
              >
                Choose product
              </label>
              <div className="relative">
                <select
                  name="product"
                  id="product"
                  className="text-sm cursor-pointer w-full h-10 pl-10 py-2 rounded-md border border-gray-400 focus:border-primary outline-none appearance-none"
                  value={product}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a product
                  </option>
                  <option value="T-Shirt">T-Shirt</option>
                  <option value="Mug">Mug</option>
                  <option value="Hat">Hat</option>
                </select>
                <ShoppingBagIcon className="absolute top-1/2 left-3 -translate-y-1/2 size-3.5 border rounded-full" />
                <ChevronDownIcon className="absolute top-1/2 right-2 -translate-y-1/2 size-4" />
              </div>
            </div>
            {/* Customer Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className={`text-sm font-medium block mb-1 ${montserrat.className}`}
              >
                Enter your name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="text-sm w-full h-10 pl-10 py-2 rounded-md border border-gray-400 focus:border-primary outline-none"
                  placeholder="Full Name"
                  required
                />
                <UserCircleIcon className="absolute top-1/2 left-3 -translate-y-1/2 size-4" />
              </div>
            </div>
            {/* Customer Email */}
            <div>
              <label
                htmlFor="email"
                className={`text-sm font-medium block mb-1 ${montserrat.className}`}
              >
                Enter your email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="text-sm w-full h-10 pl-10 py-2 rounded-md border border-gray-400 focus:border-primary outline-none"
                  placeholder="email@address.com"
                  required
                />
                <AtSymbolIcon className="absolute top-1/2 left-3 -translate-y-1/2 size-4" />
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="bg-white mb-6 p-4 shadow-md rounded-md text-sm">
              <p className={`${montserrat.className} text-lg font-semibold`}>
                Order Summary
              </p>
              <hr className="my-2" />
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>Rp. {product !== "" ? "100.000" : "0"}</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery</p>
                <p>Rp. {product !== "" ? "10.000" : "0"}</p>
              </div>
              <div className="flex justify-between">
                <p>Affiliate Code</p>
                <p>
                  {product !== "" && ref !== "" ? "-" : ""} Rp.{" "}
                  {product !== "" && ref !== "" ? "20.000" : "0"}
                </p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-base font-medium">
                <p>Total</p>
                <p>
                  Rp.{" "}
                  {ref !== ""
                    ? product !== ""
                      ? "90.000"
                      : "0"
                    : product !== ""
                    ? "110.000"
                    : "0"}
                </p>
              </div>
            </div>
            <Button className={`w-full shadow-md ${montserrat.className}`}>
              Buy Now
            </Button>
          </div>
        </form>
      </div>

      {/* Modal */}
      <Modal showModal={modal} className="w-[400px]">
        <div className="text-sm">
          <CheckIcon className="size-12 bg-green-600 text-white p-1 mx-auto mb-2 rounded-full" />
          <p
            className={`${montserrat.className} text-center text-lg font-semibold mb-2`}
          >
            Thank for your purchase
          </p>
          <p className="text-base">Your payment has been successfully done</p>
          <hr className="my-2" />
          <div className="flex justify-between mb-1">
            <p>Transaction number</p>
            <p>000018273774</p>
          </div>
          <div className="flex justify-between mb-1">
            <p>Transaction time</p>
            <p>
              {new Date().toDateString()} {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Payment method</p>
            <p>Credit Card</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-base font-medium mb-2">
            <p>Total</p>
            <p>
              Rp.{" "}
              {ref !== ""
                ? product !== ""
                  ? "90.000"
                  : "0"
                : product !== ""
                ? "110.000"
                : "0"}
            </p>
          </div>
          <Button
            className={`w-full ${montserrat.className}`}
            onClick={closeModal}
          >
            Okay
          </Button>
        </div>
      </Modal>
    </main>
  );
}
