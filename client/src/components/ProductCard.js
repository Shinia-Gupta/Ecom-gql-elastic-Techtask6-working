import React from "react";

function ProductCard({ id, title, desc, price, url, image, reviewCount }) {
  return (
    <div
      className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md h-96"
      id={id}
    >
      <a
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href="#"
      >
        <img
          className="object-contain w-full h-full"
          src={image}
          alt="product image"
        />
      </a>
      <div className="mt-4 px-5 pb-5 flex flex-col flex-grow">
        <a href="#">
          <h5
            className="text-xl tracking-tight text-slate-900"
            data-test="product-title"
          >
            {title}
          </h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p className="product-price">
            <span className="text-xl font-bold text-slate-900">
              <span className="text-sm text-gray-500">$ </span> {price}
            </span>
          </p>
          {desc && <div style={{ display: "none" }} data-test='product-desc'>{desc}</div>}

          {reviewCount ? (
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
              <span
                className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold"
                data-test="review-count-span"
              >
                {reviewCount}
              </span>
            </div>
          ) : (
            <p className="text-sm text-gray-600">No Reviews Yet</p>
          )}
        </div>
        <div className="mt-auto">
          <a
            href={url}
            className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            target="_blank"
          >
            View Product
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
