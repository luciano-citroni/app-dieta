import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { colors } from '@/constants/colors';

import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Header } from '@/components/header';
import { Select } from '@/components/input/select';

import { useDataStore } from '@/store/user';

const scheme = z.object({
    gender: z.string().min(1, { message: 'O sexo é obrigatiório' }),
    objective: z.string().min(1, { message: 'O objetivo é obrigatiório' }),
    level: z.string().min(1, { message: 'Selecione seu level' }),
});

type FormData = z.infer<typeof scheme>;

export default function Create() {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(scheme),
    });

    const setPageTwo = useDataStore((state) => state.setPageTwo);

    const genderOptions = [
        { label: 'Masculino', value: 'masculino' },
        { label: 'Feminino', value: 'feminino' },
    ];

    const levelOptions = [
        { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
        { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
        { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
        { label: 'Altamente ativo (exercícios 5 a 7 vezes na semana)', value: 'Altamente ativo (exercícios 5 a 7 vezes na semana)' },
    ];

    const objectiveOptions = [
        { label: 'Emagrecer', value: 'Emagrecer' },
        { label: 'Hipertrofia', value: 'Hipertrofia' },
        { label: 'Hipertrofia + Definição', value: 'Hipertrofia + Definição' },
        { label: 'Definição', value: 'Definição' },
    ];

    function handleCreate(data: FormData) {
        setPageTwo({
            gender: data.gender,
            level: data.level,
            objective: data.objective,
        });

        console.log(data);
    }

    return (
        <View style={styles.container}>
            <Header step="Passo 2" title="Finalizando Dieta" />

            <ScrollView style={styles.content}>
                <Select
                    title="Sexo"
                    control={control}
                    name="gender"
                    placeholder="Selecione o seu sexo"
                    error={errors.gender?.message}
                    options={genderOptions}
                />
                <Select
                    title="Nível de atividade física"
                    control={control}
                    name="level"
                    placeholder="Selecione o nível de atividade física"
                    error={errors.level?.message}
                    options={levelOptions}
                />

                <Select
                    title="Objetivo"
                    control={control}
                    name="objective"
                    placeholder="Selecione o seu objetivo"
                    error={errors.objective?.message}
                    options={objectiveOptions}
                />

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
