import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { colors } from '@/constants/colors';

import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Header } from '@/components/header';
import { Input } from '@/components/input';
import { router } from 'expo-router';

import { useDataStore } from '@/store/user';

const scheme = z.object({
    name: z.string().min(1, { message: 'O nome é obrigatiório' }),
    weight: z.string().min(1, { message: 'O peso é obrigatiório' }),
    age: z.string().min(1, { message: 'A idade é obrigatiório' }),
    height: z.string().min(1, { message: 'A altura é obrigatiório' }),
});

type FormData = z.infer<typeof scheme>;

export default function Step() {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(scheme),
    });

    const setPageOne = useDataStore((state) => state.setPageOne);

    function handleCreate(data: FormData) {
        setPageOne({
            name: data.name,
            age: data.age,
            height: data.height,
            weight: data.weight,
        });

        router.push('/create');
    }

    return (
        <View style={styles.container}>
            <Header step="Passo 1" title="Vamos começar" />
            <ScrollView style={styles.content}>
                <Input title="Nome" control={control} name="name" placeholder="Digite seu nome" error={errors.name?.message} />

                <Input title="Seu peso atual" control={control} name="weight" placeholder="Ex: 75" error={errors.weight?.message} keyboardType="numeric" />

                <Input
                    title="Sua altura atual"
                    control={control}
                    name="height"
                    placeholder="Ex: 1.80"
                    error={errors.height?.message}
                    keyboardType="number-pad"
                />

                <Input title="Sua Idade" control={control} name="age" placeholder="Ex: 23" error={errors.age?.message} keyboardType="numeric" />

                <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    button: {
        backgroundColor: colors.blue,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white,
    },
});
