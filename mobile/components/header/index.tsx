import { Text, View, StyleSheet, Pressable, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';

interface HeaderProps {
    step: string;
    title: string;
}

export function Header({ step, title }: HeaderProps) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.row}>
                    <Pressable style={{ width: 26, height: 26 }} onPress={() => router.back()}>
                        <Feather name="arrow-left" size={26} color="black" />
                    </Pressable>
                    <Text style={styles.text}>
                        {step} <Feather name="loader" size={16} color="#000" />
                    </Text>
                </View>
                <Text style={styles.title}>{title}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        marginBottom: 14,
        paddingTop: 34,
    },
    content: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 25,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
    },
    row: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.background,
        marginTop: 5,
    },
});
