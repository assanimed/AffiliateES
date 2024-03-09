import React from "react";
import OfferItem from "./OfferItem";
import Item from "./Item";

const OfferTableList = ({ data }) => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 gap-y-6 max-w-[1200px] mx-auto">
                {data?.map((offer) => (
                    <Item offer={offer} />
                ))}
            </div>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center md:grid-cols-3 gap-2">
                {data?.map((offer) => (
                    <OfferItem offer={offer} />
                ))}
            </div> */}
        </>
    );
};

export default OfferTableList;
