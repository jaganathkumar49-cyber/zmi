import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Lock, MapPin, Phone, User, CheckCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState("delivery"); // delivery, payment, success
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    // Load cart on mount
    React.useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(savedCart);

        const total = savedCart.reduce((sum, item) => {
            const price = Number(item.price.replace(/[^\d]/g, ""));
            return sum + (price * (item.quantity || 1));
        }, 0);

        if (savedCart.length === 0) {
            navigate("/CartList");
        }
    }, [navigate]);

    const total = cart.reduce((sum, item) => {
        const price = Number(item.price.replace(/[^\d]/g, ""));
        return sum + (price * (item.quantity || 1));
    }, 0);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNextStep = () => {
        if (step === "delivery") {
            if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
                toast.error("Please fill all delivery details");
                return;
            }
            setStep("payment");
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!formData.cardNumber || !formData.expiry || !formData.cvv) {
            toast.error("Please fill all payment details");
            return;
        }

        setLoading(true);
        // Simulate payment processing
        setTimeout(() => {
            setLoading(false);
            setStep("success");
            // Clear cart on successful payment
            localStorage.setItem("cart", JSON.stringify([]));
            toast.success("Payment successful! Order confirmed 🎉");
        }, 2000);
    };

    if (step === "success") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
                <div className="max-w-2xl mx-auto space-y-8">
                    <button
                        onClick={() => navigate("/")}
                        className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-slate-100 hover:border-emerald-200 hover:-translate-y-1 transition-all text-emerald-700 font-semibold max-w-max"
                    >
                        <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="hidden md:inline">Back to Home</span>
                    </button>

                    <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-16 shadow-2xl border border-emerald-100">
                        <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-emerald-400 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl">
                            <CheckCircle className="w-16 h-16 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                            Order Confirmed!
                        </h1>
                        <p className="text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Thank you for your purchase. Your order has been confirmed and will be delivered soon.
                        </p>
                        <div className="text-left max-w-md mx-auto bg-emerald-50 rounded-2xl p-8 border border-emerald-200">
                            <h3 className="text-xl font-bold text-emerald-800 mb-4">Order Summary</h3>
                            <div className="space-y-2 text-sm">
                                <p><span className="font-semibold">Total Items:</span> {cart.length}</p>
                                <p><span className="font-semibold">Total Amount:</span> <span className="text-2xl font-bold text-emerald-600">₹{total.toLocaleString()}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/CartList")}
                        className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-slate-100 hover:border-indigo-200 hover:-translate-y-1 transition-all text-slate-700 font-semibold max-w-max"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="hidden md:inline">Back to Cart</span>
                    </button>

                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-4">
                            Checkout
                        </h1>
                        <div className="flex justify-center items-center gap-2 text-sm text-slate-500">
                            <div className={`w-12 h-12 flex items-center justify-center rounded-full font-bold transition-all ${step === "delivery" ? "bg-indigo-500 text-white shadow-lg" : "bg-indigo-100 text-indigo-600"
                                }`}>
                                1
                            </div>
                            <div className="w-16 h-px bg-indigo-200" />
                            <div className={`w-12 h-12 flex items-center justify-center rounded-full font-bold transition-all ${step === "payment" ? "bg-indigo-500 text-white shadow-lg" : step === "delivery" ? "bg-indigo-100 text-indigo-600" : "bg-slate-200 text-slate-400"
                                }`}>
                                2
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>
                        <div className="space-y-4">
                            {cart.map((item) => {
                                const price = Number(item.price.replace(/[^\d]/g, ""));
                                return (
                                    <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                        <img src={item.img} alt={item.name} className="w-16 h-16 object-contain rounded-lg" />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-slate-900 line-clamp-1">{item.name}</h3>
                                            <p className="text-sm text-slate-500">Qty: {item.quantity || 1}</p>
                                        </div>
                                        <div className="text-right font-bold text-indigo-600">
                                            ₹{(price * (item.quantity || 1)).toLocaleString()}
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="pt-4 border-t border-slate-200">
                                <div className="flex justify-between items-center text-2xl font-bold">
                                    <span>Total:</span>
                                    <span className="text-indigo-600 font-mono">₹{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Form */}
                    {step === "delivery" && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <MapPin className="w-7 h-7 text-indigo-600" />
                                Delivery Details
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Full Name
                                    </label>
                                    <input
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-white/50 backdrop-blur-sm transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        Phone Number
                                    </label>
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-white/50 backdrop-blur-sm transition-all"
                                        placeholder="9876543210"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                        Address
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-white/50 backdrop-blur-sm transition-all resize-vertical"
                                        placeholder="Street address, landmark, etc."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                                    <input
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-white/50 backdrop-blur-sm transition-all"
                                        placeholder="Mumbai"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
                                    <input
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                        className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-white/50 backdrop-blur-sm transition-all"
                                        placeholder="400001"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleNextStep}
                                className="mt-8 w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    )}

                    {/* Payment Form */}
                    {step === "payment" && (
                        <form onSubmit={handlePayment} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <CreditCard className="w-7 h-7 text-indigo-600" />
                                Payment Details
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" />
                                        Card Number
                                    </label>
                                    <input
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        maxLength={19}
                                        className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/50 bg-white/60 backdrop-blur-sm text-lg tracking-wider font-mono transition-all"
                                        placeholder="1234 5678 9012 3456"
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                            <Lock className="w-4 h-4" />
                                            Expiry Date
                                        </label>
                                        <input
                                            name="expiry"
                                            value={formData.expiry}
                                            onChange={handleInputChange}
                                            maxLength={5}
                                            className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/50 bg-white/60 backdrop-blur-sm font-mono transition-all"
                                            placeholder="MM/YY"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                            CVV
                                        </label>
                                        <input
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            maxLength={3}
                                            type="password"
                                            className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/50 bg-white/60 backdrop-blur-sm font-mono transition-all"
                                            placeholder="123"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <button
                                    type="button"
                                    onClick={() => setStep("delivery")}
                                    className="flex-1 bg-white/60 backdrop-blur-sm hover:bg-white border-2 border-slate-200 hover:border-indigo-200 text-slate-800 font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    Back to Delivery
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 px-8 rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Pay Now ₹" + total.toLocaleString()
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                theme="colored"
                limit={1}
            />
        </>
    );
};

export default Payment;
