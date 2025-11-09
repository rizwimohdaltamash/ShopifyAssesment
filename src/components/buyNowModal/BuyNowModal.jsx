import React,{ useState } from "react";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    const [open, setOpen] = useState(false);
    const [clicked, setClicked] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleClickEffect = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 300); // Reset effect after animation
    };

    const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


    return (
        <>
            <button
                type="button"
                onClick={() => {
                    handleClickEffect();
                    handleOpen();
                }}
                className={`w-full px-4 py-3 text-center text-gray-100 bg-green-900 border border-transparent dark:border-gray-700 hover:border-green-500 hover:bg-green-700 rounded-xl ${
                    clicked ? (isMobile() ? "animate-bounce" : "ripple-effect") : ""
                }`}
            >
                Buy now
            </button>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
                    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
                        <div className="mb-3">
                            <input
                                type="text"
                                name="name"
                                value={addressInfo.name}
                                onChange={(e) => {
                                    setAddressInfo({
                                        ...addressInfo,
                                        name: e.target.value
                                    })
                                }}
                                placeholder="Enter your name"
                                className="bg-gray-800 px-2 py-2 w-full rounded-md outline-none text-white placeholder-white"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="address"
                                value={addressInfo.address}
                                onChange={(e) => {
                                    setAddressInfo({
                                        ...addressInfo,
                                        address: e.target.value
                                    })
                                }}
                                placeholder="Enter your address"
                                className="bg-gray-800 px-2 py-2 w-full rounded-md outline-none text-white placeholder-white"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                name="pincode"
                                value={addressInfo.pincode}
                                onChange={(e) => {
                                    setAddressInfo({
                                        ...addressInfo,
                                        pincode: e.target.value
                                    })
                                }}
                                placeholder="Enter your pincode"
                                className="bg-gray-800 px-2 py-2 w-full rounded-md outline-none text-white placeholder-white"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="mobileNumber"
                                value={addressInfo.mobileNumber}
                                onChange={(e) => {
                                    setAddressInfo({
                                        ...addressInfo,
                                        mobileNumber: e.target.value
                                    })
                                }}
                                placeholder="Enter your mobile number"
                                className="bg-gray-800 px-2 py-2 w-full rounded-md outline-none text-white placeholder-white"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={handleOpen}
                                className="px-4 py-2 text-white bg-gray-800 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    handleOpen();
                                    buyNowFunction();
                                }}
                                className="px-4 py-2 text-green-900 rounded-lg"
                            >
                                Pay now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BuyNowModal;

