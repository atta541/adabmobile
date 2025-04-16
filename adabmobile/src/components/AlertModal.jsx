import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AlertModal = ({
    visible,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "OK",
    cancelText = "Cancel"
}) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        {onCancel && (
                            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                                <Text style={styles.cancelText}>{cancelText}</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                            <Text style={styles.confirmText}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    modal: {
        margin: 30,
        backgroundColor: '#111', // deep black
        borderRadius: 12,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#ff0000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ff4d4d',
        marginBottom: 10,
        textAlign: 'center'
    },
    message: {
        fontSize: 16,
        color: '#eee',
        textAlign: 'center',
        marginBottom: 25
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'stretch'
    },
    cancelButton: {
        marginRight: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: '#ff4d4d',
        borderWidth: 1,
        borderRadius: 6
    },
    confirmButton: {
        backgroundColor: '#ff1a1a',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    cancelText: {
        fontSize: 16,
        color: '#ccc'
    },
    confirmText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    }
});

export default AlertModal;
