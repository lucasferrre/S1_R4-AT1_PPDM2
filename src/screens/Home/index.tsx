import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export default function HomeScreen() {
    const [isSending, setIsSending] = useState(false);

    const sendNotification = async () => {
        setIsSending(true);

        try {

            const { status: currentStatus } = await Notifications.getPermissionsAsync();
            const { status } =
                currentStatus === "granted"
                    ? { status: currentStatus }
                    : await Notifications.requestPermissionsAsync();

            if (status !== "granted") {
                Alert.alert(
                    "Permissão necessária",
                    "Permita o envio de notificações nas configurações do dispositivo."
                );
                return;
            }

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Opa!E aí como cé tá?",
                    body: "Esta é uma notificação do seu aplicativo. É um prazer te ver por aqui!",
                },
                trigger: null, 
            });
        } catch (error) {
            console.error("Não foi possível enviar a notificação:", error);
            Alert.alert("Erro", "Não foi possível exibir a notificação.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Teste Notificações</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    disabled={isSending}
                    style={[styles.button, isSending && styles.buttonDisabled]}
                    onPress={sendNotification}
                >
                    <Text style={styles.buttonText}>
                        {isSending ? "Enviando..." : "Enviar"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#27455d",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "700",
        marginBottom: 24,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3a7480",
        borderRadius: 12,
        minHeight: 52,
        paddingHorizontal: 24,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});
