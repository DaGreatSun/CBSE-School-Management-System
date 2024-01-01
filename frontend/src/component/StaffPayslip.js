import React from 'react';
import { jsPDF } from 'jspdf';

const Payslip = ({ staff, paymentDetails, onClose }) => {
    const downloadPayslipAsPDF = () => {
        const pdf = new jsPDF();

        pdf.setFont("helvetica", "normal");

        // Company Info
        pdf.setFontSize(18);
        pdf.text('CBSE Company Sdn Bhd', 20, 30);
        pdf.setFontSize(12);
        pdf.text('PAYSLIP', 20, 40);

        // Employee Info
        pdf.setFontSize(10);
        pdf.text(`NAME: ${staff.name.toUpperCase()}`, 20, 50);
        pdf.text(`NRIC: ${staff.ic}`, 20, 60);
        pdf.text(`POSITION: ${staff.position.toUpperCase()}`, 20, 70);

        // Payment Details
        pdf.setFontSize(11);
        pdf.text(`BASIC PAY: ${paymentDetails.basicPay.toFixed(2)}`, 160, 50, null, null, "right");

         // Bonuses
        pdf.setFontSize(10);
        pdf.text(`BONUS: ${paymentDetails.bonuses.toFixed(2)}`, 160, 60, null, null, "right");

        // Deductions
        pdf.setFontSize(10);
        pdf.text(`DEDUCTION: ${paymentDetails.deductions.toFixed(2)}`, 160, 70, null, null, "right");

        pdf.line(110, 80, 160, 80);

        // Net Pay
        pdf.setFontSize(12);
        pdf.text(`NET PAY: ${paymentDetails.netPay.toFixed(2)}`, 160, 90, null, null, "right");

        // Signatures
        pdf.setFontSize(10);
        pdf.setLineWidth(0.5);
        pdf.line(20, 180, 70, 180);  // Line for "APPROVED BY"
        pdf.text('APPROVED BY:', 20, 175);
        pdf.line(115, 180, 165, 180);  // Line for "RECEIVED BY"
        pdf.text('RECEIVED BY:', 140, 175, null, null, "right");

        // Save the PDF
        pdf.save('payslip.pdf');
    };

    return (
        <div id="payslip" className="payslip-container bg-white shadow rounded-lg p-8 my-4 mx-auto max-w-4xl">
            <div className="company-info mb-6">
                <h1 className="text-3xl font-bold">CBSE Company Sdn Bhd</h1>
                <h2 className="text-xl font-semibold mt-1">PAYSLIP</h2>
            </div>

            <div className="employee-info grid grid-cols-2 mb-6">
                <div>
                    <p className='uppercase'><strong>NAME: </strong>{staff.name} </p>
                    <p className='uppercase'><strong>NRIC: </strong> {staff.ic}</p>
                    <p className='uppercase'><strong>POSITION: </strong> {staff.position}</p>
                </div>
                <div className="text-right">
                    <p><strong>BASIC PAY: </strong> {paymentDetails.basicPay}</p>
                    <p><strong>BONUSES: </strong> {paymentDetails.bonuses}</p>
                    <p><strong>DEDUCTION: </strong> {paymentDetails.deductions}</p>
                    <p className="font-bold mt-2">NET PAY {paymentDetails.netPay}</p>
                </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
                <button className="btn btn-secondary bg-red-500 py-2 px-4" onClick={onClose}>Close</button>
                <button className="btn btn-primary" onClick={downloadPayslipAsPDF}>Download Payslip as PDF</button>
            </div>
        </div>
    );
};

export default Payslip;
