import React, { useState } from 'react';
import logoImg from '../assets/img3.jpg';

const PaystackPayments = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('python');
  const [paymentMode, setPaymentMode] = useState('full');
  const [transactionId, setTransactionId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  // console.log("Paystack Public Key:", paystackPublicKey);
  const coursePackages = {
    python: 75000,
    webdev: 75000,
    videoediting: 75000,
    graphicsdesign:75000,
    networking:75000,
    userinterfaceanduserexperience:75000,
  };
  // const coursePackages = {
  //   beginner: 75000,
  //   intermediate: 75000,
  //   advanced: 75000,
  // };

  const baseAmount = coursePackages[selectedCourse];
  const selectedAmount = paymentMode === 'full' ? baseAmount : baseAmount / 2;

  const payWithPaystack = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    const amountInKobo = selectedAmount * 100;
    const paystack = window.PaystackPop && window.PaystackPop.setup({
      key: paystackPublicKey,
      email,
      amount: amountInKobo,
      currency: "NGN",
      callback: function (response) {
        console.log("Transaction successful:", response);
        setTransactionId(response.reference);
        setPaymentStatus("success");
      },
      onClose: function () {
        setPaymentStatus("cancelled");
      }
    });

    if (paystack) {
      paystack.openIframe();
    } else {
      console.error("Paystack script not loaded");
    }
  };

  return (
    <div className="min-h-full flex items-center w-full justify-center px-7 mt-24" >
      <div className="bg-white p-8 shadow-xl w-2xl mx-auto rounded-4xl">
        <div className="flex justify-center mb-5">
          <img src={logoImg} alt="Logo" className="w-16 h-16 rounded-full shadow" />
        </div>
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-8">Hanotech cohort1 payment</h2>

        {paymentStatus === "success" ? (
          <div className="text-center bg-orange-400 border border-orange-600 text-white p-3 rounded-lg">
            <p className="font-bold">Payment Successful!</p>
            <p>Transaction ID: {transactionId}</p>
          </div>
        ) : paymentStatus === "cancelled" ? (
          <div className="text-center bg-red-100 border border-red-400 text-red-700 p-3 rounded-lg">
            <p className="font-bold">Payment Cancelled</p>
          </div>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-6 py-4 rounded-full border border-gray-300 mb-3 focus:ring-2 focus:ring-orange-400 outline-none shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-6 py-4  rounded-full border border-gray-300 mb-3 focus:ring-2 focus:ring-orange-400 outline-none shadow-sm"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-6 py-4  rounded-full border border-gray-300 mb-3 focus:ring-2 focus:ring-orange-400 outline-none shadow-sm"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-6 py-4  rounded-full border border-gray-300 mb-3 focus:ring-2 focus:ring-orange-400 outline-none shadow-sm"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <select
              className="w-full px-6 py-4  rounded-full border border-gray-300 mb-3 focus:ring-2 focus:ring-orange-400 outline-none shadow-sm"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
             <option value="python">Python– ₦75,000</option>
             <option value="webdev">Web development- ₦75,000</option>
             <option value="videoediting">Video Editing/Content creation - ₦75,000</option>
             <option value="graphicsdesign">Graphics Design - ₦75,000</option>
              <option value="networking">Networking - ₦75,000</option>
              <option value=" userdnterfaceanduserexperience">UI/UX – ₦75,000</option> 
            </select>
            <select
              className="w-full px-6 py-4  rounded-full border border-gray-300 mb-8 focus:ring-2 focus:ring-orange-400 outline-none shadow-sm"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="full " className='text-red-400'>Full Payment</option>
              <option value="installment">Half Payment</option>
            </select>
            <p className="text-center font-semibold text-gray-800 mb-6">
              Total Amount: ₦{selectedAmount.toLocaleString()}
            </p>
            <button
              onClick={payWithPaystack}
              className="w-full bg-orange-400 hover:bg-orange-700 text-white font-semibold py-4 rounded-full shadow transition"
            >
              Pay ₦{selectedAmount.toLocaleString()}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaystackPayments;


