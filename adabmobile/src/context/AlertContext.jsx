// context/AlertContext.jsx
import React, { createContext, useContext, useState } from 'react';
import AlertModal from '../components/AlertModal';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alertConfig, setAlertConfig] = useState({
        visible: false,
        title: '',
        message: '',
        onConfirm: () => {},
        onCancel: null,
        confirmText: 'OK',
        cancelText: 'Cancel'
    });

    const showAlert = (config) => {
        setAlertConfig({ ...config, visible: true });
    };

    const hideAlert = () => {
        setAlertConfig((prev) => ({ ...prev, visible: false }));
    };

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            <AlertModal
                {...alertConfig}
                visible={alertConfig.visible}
                onConfirm={() => {
                    alertConfig.onConfirm?.();
                    hideAlert();
                }}
                onCancel={
                    alertConfig.onCancel
                        ? () => {
                              alertConfig.onCancel();
                              hideAlert();
                          }
                        : null
                }
            />
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);
