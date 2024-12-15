import { Controller } from 'react-hook-form';
import { useState } from 'react';

import { colors } from '@/constants/colors';

import { View, StyleSheet, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface OptionsProps {
    label: string;
    value: string | number;
}

interface SelectProps {
    title: string;
    name: string;
    control: any;
    placeholder?: string;
    error?: string;
    options: OptionsProps[];
}

export function Select({ title, name, control, placeholder, error, options }: SelectProps) {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <Text style={styles.label}>{title}:</Text>
                        <TouchableOpacity style={styles.select} onPress={() => setVisible(true)}>
                            <Text>{value ? options.find((option) => option.value === value)?.label : placeholder}</Text>
                            <Feather name="arrow-down" size={16} color="black" />
                        </TouchableOpacity>

                        <Modal visible={visible} animationType="fade" onRequestClose={() => setVisible(false)} transparent={true}>
                            <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={() => setVisible(false)}>
                                <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                                    <FlatList
                                        contentContainerStyle={{ gap: 6 }}
                                        data={options}
                                        keyExtractor={(item) => item.value.toString()}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                onPress={() => {
                                                    onChange(item.value);
                                                    setVisible(false);
                                                }}
                                            >
                                                <Text style={styles.text}>{item.label}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Modal>
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
    errorText: {
        color: 'red',
        marginTop: 4,
    },
    select: {
        flexDirection: 'row',
        height: 44,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 4,
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0, 0.5)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.white,
        marginHorizontal: 10,
        borderRadius: 8,
        padding: 20,
        minHeight: 350,
    },
    option: {
        paddingVertical: 14,
        backgroundColor: 'rgba(208, 208, 208, 0.40)',
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    text: {
        fontSize: 15,
        color: colors.black,
        fontWeight: 'semibold',
        marginBottom: 8,
    },
});
