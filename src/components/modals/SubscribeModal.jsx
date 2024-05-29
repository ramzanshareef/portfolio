/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { IoIosCloseCircleOutline } from "react-icons/io";
import { SubmitButton } from "../SubmitButton";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { sendEmailForOTP, sendEmailForSubscription } from "@/utils/emailer";
import { ToastContainer, toast } from "react-toastify";
import OTPInput from "react-otp-input";
import { useRouter } from "next/navigation";
import { guestSession } from "@/utils/guestSession";

const SubscribeModal = ({ isOpen, onClose, hideOnClose }) => {
    const [state1, sendOTP] = useFormState(sendEmailForOTP, null);
    const [otp, setOtp] = useState('');
    const [state, emailAction] = useFormState(sendEmailForSubscription, null);
    const [otpSent, setOtpSent] = useState(false);
    const [subscriptionAttempted, setSubscriptionAttempted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isOpen === true && otpSent) {
            if (state1?.status !== 200) {
                toast.error(
                    <div className="z-9999">
                        <h1 className="text-lg font-semibold">OTP Failed</h1>
                        <p className="text-sm font-normal">{state1?.message}</p>
                    </div>, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClick: () => {
                        document.getElementById("otpForm").reset();
                        setOtp('');
                    },
                    onClose: () => {
                        document.getElementById("otpForm").reset();
                        setOtp('');
                    },
                });
            } else if (state1?.status === 200) {
                toast.success(
                    <div className="z-9999">
                        <h1 className="text-lg font-semibold">OTP Sent</h1>
                        <p className="text-sm font-normal">Please check your email for the OTP.</p>
                    </div>, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    onClose: () => {
                        document.getElementById("subscribeForm").reset();
                    },
                    onClick: () => {
                        document.getElementById("subscribeForm").reset();
                    },
                });
            }
        }
    }, [state1, otpSent]);

    useEffect(() => {
        if (isOpen === true && subscriptionAttempted) {
            if (state?.status !== 200) {
                toast.error(
                    <div className="z-9999">
                        <h1 className="text-lg font-semibold">Subscription Failed</h1>
                        <p className="text-sm font-normal">{state?.message}</p>
                    </div>, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => {
                        document.getElementById("subscribeForm").reset();
                        document.getElementById("otpForm").reset();
                        setOtp('');
                        onClose();
                    },
                });
            } else if (state?.status === 200) {
                toast.success(
                    <div className="z-9999">
                        <h1 className="text-lg font-semibold">Subscription Successful</h1>
                        <p className="text-sm font-normal">Thank you for subscribing to my website.</p>
                    </div>, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    onClose: () => {
                        document.getElementById("subscribeForm").reset();
                        document.getElementById("otpForm").reset();
                        setOtp('');
                        router.refresh();
                    },
                });
            }
        }
    }, [state, subscriptionAttempted]);

    useEffect(() => {
        if (state1?.status) {
            setOtpSent(true);
        }
    }, [state1?.status]);

    useEffect(() => {
        if (state?.status) {
            setSubscriptionAttempted(true);
        }
    }, [state?.status]);

    return (
        <>
            {(isOpen === true) ?
                <div className="fixed z-9999 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center text-black">
                    <ToastContainer />
                    <div className="w-4/5 lg:w-2/5 mx-auto p-6 bg-white shadow-md rounded-xl overflow-y-auto max-h-screen">
                        <h2 className="text-2xl font-semibold mb-4">
                            {hideOnClose ? <></> :
                                <IoIosCloseCircleOutline
                                    onClick={onClose}
                                    className="cursor-pointer float-right"
                                />}
                        </h2>
                        <div>
                            <form action={sendOTP}
                                id="otpForm"
                                className="flex flex-col gap-2 items-center "
                            >
                                <h2 className="text-2xl font-semibold mb-4">
                                    Subscribe to my website
                                </h2>
                                <div className="flex flex-col gap-y-7">
                                    <div className="mt-2 relative">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Email Address"
                                            required
                                            className="w-full sm:w-60 px-4 py-2 text-sm font-semibold leading-6 text-black bg-slate-50 rounded-md shadow-sm ring-1 ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 peer placeholder-transparent placeholder-slate-600
                                            " />
                                        <label htmlFor="email" className="absolute block left-0 -top-7 peer-placeholder-shown:hidden transition-all
                                        ">Email Address</label>
                                    </div>
                                    <div className="mt-2 relative">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            placeholder="First Name"
                                            required
                                            className="w-full sm:w-60 px-4 py-2 text-sm font-semibold leading-6 text-black bg-slate-50 rounded-md shadow-sm ring-1 ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 peer placeholder-transparent placeholder-slate-600
                                            " />
                                        <label htmlFor="firstName" className="absolute block left-0 -top-7 peer-placeholder-shown:hidden transition-all
                                        ">First Name</label>
                                    </div>
                                    <div className="mt-2 relative">
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            placeholder="Last Name"
                                            required
                                            className="w-full sm:w-60 px-4 py-2 text-sm font-semibold leading-6 text-black bg-slate-50 rounded-md shadow-sm ring-1 ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 peer placeholder-transparent placeholder-slate-600
                                            " />
                                        <label htmlFor="lastName" className="absolute block left-0 -top-7 peer-placeholder-shown:hidden transition-all
                                        ">Last Name</label>
                                    </div>
                                    <SubmitButton
                                        title="Send OTP"
                                        size="fit"
                                    />
                                </div>
                            </form>
                            <div className="flex flex-col gap-y-4 items-center mt-6">
                                <span>
                                    Enter the OTP sent to your email
                                </span>
                                <form action={emailAction}
                                    id="subscribeForm"
                                    className="flex flex-col gap-y-4 items-center"
                                >
                                    <input type="hidden" name="otp"
                                        value={otp}
                                        required
                                    />
                                    <input type="hidden" name="email"
                                        value={state1?.email}
                                    />
                                    <input type="hidden" name="firstName"
                                        value={state1?.firstName}
                                    />
                                    <input type="hidden" name="lastName"
                                        value={state1?.lastName}
                                    />
                                    <OTPInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={4}
                                        inputType="number"
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props) => <input {...props} />}
                                        containerStyle={{ display: 'flex', justifyContent: 'center' }}
                                        inputStyle={{ width: '2.4rem', height: '2.4rem', margin: '0 0.5rem', fontSize: '1.5rem', textAlign: 'center', borderRadius: '4px', border: '1px solid #ccc', padding: '0' }}
                                    />
                                    <SubmitButton
                                        title="Subscribe"
                                        size="fit"
                                    />
                                </form>
                                {hideOnClose === true ?
                                    <button
                                        type="submit"
                                        className="flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600
                disabled:cursor-not-allowed disabled:shadow-none disabled:bg-red-400 disabled:hover:bg-red-400 disabled:focus-visible:outline-red-400 disabled:focus-visible:outline-offset-0 disabled:focus-visible:outline-2"
                                        onClick={async () => {
                                            let guestPassword = prompt("Enter the password to view as guest");
                                            let res = await guestSession(guestPassword);
                                            if (res) {
                                                toast.success(
                                                    <div className="z-9999">
                                                        <h1 className="text-lg font-semibold">Guest Access Granted</h1>
                                                        <p className="text-sm font-normal">You are now viewing the website as a guest.</p>
                                                    </div>, {
                                                    position: "top-right",
                                                    autoClose: 3000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: false,
                                                    draggable: false,
                                                    progress: undefined,
                                                    onClose: () => {
                                                        router.refresh();
                                                    },
                                                    onClick: () => {
                                                        router.refresh();
                                                    },
                                                });
                                            }
                                        }}
                                    >
                                        View as Guest
                                    </button>
                                    : <></>}
                            </div>
                        </div>
                    </div>
                </div>
                :
                <></>
            }
        </>
    )
}

export default SubscribeModal;