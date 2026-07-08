// src/hooks/useEpf.js
import { useState } from 'react';

export const EPF_STEPS = {
  ENTER_UAN: 1,
  VERIFY_OTP: 2,
  SHOW_DATA: 3,
};

export function useEpf(backendUrl = 'http://localhost:4001') {
  const [uan, setUan] = useState('');
  const [otp, setOtp] = useState('');
  const [currentStep, setCurrentStep] = useState(EPF_STEPS.ENTER_UAN);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [epfData, setEpfData] = useState(null);

  const requestOtp = async (inputUan) => {
    if (!inputUan || inputUan.length !== 12) {
      setErrorMessage('Please enter a valid 12-digit UAN.');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const response = await fetch(`${backendUrl}/member/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uan: inputUan }),
      });
      
      const result = await response.json();
      
      if (result.status === 'SUCCESS') {
        setUan(inputUan);
        setCurrentStep(EPF_STEPS.VERIFY_OTP);
      } else {
        setErrorMessage(result.message || 'Failed to trigger OTP generation.');
      }
    } catch (error) {
      setErrorMessage('Network connection failure while requesting OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (inputOtp) => {
    if (!inputOtp || inputOtp.length < 4) {
      setErrorMessage('Please enter a valid OTP code.');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const response = await fetch(`${backendUrl}/member/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uan, otp: inputOtp }),
      });
      
      const result = await response.json();
      
      if (result.status === 'SUCCESS') {
        setEpfData(result);
        setCurrentStep(EPF_STEPS.SHOW_DATA);
      } else {
        setErrorMessage(result.message || 'Invalid OTP or session token context expired.');
      }
    } catch (error) {
      setErrorMessage('Network error while processing verification parameters.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetFlow = () => {
    setUan('');
    setOtp('');
    setEpfData(null);
    setErrorMessage('');
    setCurrentStep(EPF_STEPS.ENTER_UAN);
  };

  return {
    uan,
    otp,
    currentStep,
    isLoading,
    errorMessage,
    epfData,
    requestOtp,
    verifyOtp,
    resetFlow,
  };
}