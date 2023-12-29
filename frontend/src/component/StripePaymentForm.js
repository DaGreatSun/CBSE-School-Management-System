import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { TEACHER_SALARY_API } from "../utils/api";
import axios from 'axios';
import Payslip from './PaySlip';
import ErrorMessageModal from './ErrorMessageModal';

const StripePaymentForm = ({ isOpen, closeModal, salaryId, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const createPaymentIntent = async () => {
        try {
            const response = await axios.post(`${TEACHER_SALARY_API}/pay/${salaryId}/${amount}`);
            setTeacher(response.data.teacher);
            setPaymentDetails({
                basicPay: response.data.salary.basicPay,
                bonuses: response.data.salary.bonuses,
                deductions: response.data.salary.deductions,
                netPay: response.data.salary.netPay,
                status: 'Pending'
            });
            return response.data;
        } catch (error) {
            console.error('Error creating payment intent:', error);
            setErrorMessage("Failed to process the payment. Please try again later.");
            setErrorModalOpen(true);
            throw error;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        try {
            const paymentIntentData = await createPaymentIntent();
            const result = await stripe.confirmCardPayment(paymentIntentData.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {},
                },
            });

            if (result.error) {
                console.error('Payment error:', result.error.message);
                setErrorMessage(result.error.message);
                setErrorModalOpen(true);
                setPaymentDetails(prevDetails => ({ ...prevDetails, status: 'Failed' }));
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded:', result.paymentIntent);
                    setPaymentSuccess(true);
                    setPaymentDetails(prevDetails => ({ ...prevDetails, status: 'Succeeded' }));
                }
            }
        } catch (error) {
            console.error('Payment failed:', error);
            setErrorMessage("Payment failed. Please try again later.");
            setErrorModalOpen(true);
            setPaymentDetails(prevDetails => ({ ...prevDetails, status: 'Failed' }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box relative">
                {paymentSuccess ? (
                    <Payslip
                        teacher={teacher}
                        paymentDetails={paymentDetails}
                        onClose={closeModal}
                    />
                ) : (
                    <>
                        <label
                            htmlFor="my-modal-3"
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                            onClick={closeModal}>✕</label>
                        <h3 className="text-lg font-bold">Payment (Visa/Master) </h3>
                        <form onSubmit={handleSubmit} className="py-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Card Details</span>
                                </label>
                                <CardElement className="input input-bordered" />
                            </div>
                            <div className="modal-action">
                                <button
                                    type="submit"
                                    disabled={!stripe || loading}
                                    className={`btn btn-primary ${loading ? 'loading' : ''}`}
                                >
                                    {loading ? 'Processing...' : `Pay MYR ${amount}`}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
            <ErrorMessageModal
                isOpen={errorModalOpen}
                closeHandler={() => setErrorModalOpen(false)}
                errorMessage={errorMessage}
            />
        </div>
    );
};

export default StripePaymentForm;
