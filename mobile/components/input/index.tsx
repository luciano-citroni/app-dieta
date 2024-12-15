import { colors } from '@/constants/colors';
import { View, StyleSheet, Text, TextInput, KeyboardTypeOptions } from 'react-native';

import { Controller } from 'react-hook-form';

interface InputProps {
    title: string;
    name: string;
    control: any;
    placeholder?: string;
    rules?: object;
    error?: string;
    keyboardType?: KeyboardTypeOptions;
}

export function Input({ title, name, control, placeholder, keyboardType = 'default', error, rules }: InputProps) {
    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <Text style={styles.label}>{title}:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={placeholder}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType={keyboardType}
                        />
                    </View>
                )}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        height: 44,
        backgroundColor: colors.white,
        borderRadius: 4,
        paddingHorizontal: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 4,
    },
});
