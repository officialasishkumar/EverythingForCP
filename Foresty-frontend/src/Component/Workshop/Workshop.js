import React from "react";
import Workshop from "../Form/Workshop";

export default function WorkshopD() {
  return (
    <>
      <div className="flex justify-center">
        <div className="hidden sm:block">
          <img
            className="object-cover rounded-lg h-full"
            src={
              "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20191004160106/How-to-Prepare-for-Competitive-Programming.png"
            }
            alt=""
          />
        </div>
        <Workshop />
      </div>
    </>
  );
}
