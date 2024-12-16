import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';

import { useDataStore } from '@/store/user';

import { api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { colors } from '@/constants/colors';

import { Diet } from '@/types/diet';
import { Link, router } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';

interface ResponseData {
    data: Diet;
}

export default function Nutrition() {
    const user = useDataStore((state) => state.user);

    const { data, isFetching, error } = useQuery({
        queryKey: ['nutrition'],
        queryFn: async () => {
            try {
                if (!user) throw new Error('Faild load nutrition');

                const response = await api.post<ResponseData>('/create', {
                    name: user.name,
                    weight: user.weight,
                    height: user.height,
                    age: user.age,
                    gender: user.gender,
                    objective: user.objective,
                    level: user.level,
                });

                return response.data.data;
            } catch (err) {
                console.log(err);
            }
        },
    });

    if (isFetching) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Estamos gerando sua dieta</Text>
                <Text style={styles.loadingText}>Consultando AI...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Falha ao gerar dieta</Text>
                <Link href="/">
                    <Text style={styles.loadingText}>Tente novamente</Text>
                </Link>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.contentHeader}>
                    <Text style={styles.title}>Minha Dieta</Text>
                    <Pressable style={styles.buttonShare}>
                        <Text style={styles.buttonShareText}>Compartilhar</Text>
                    </Pressable>
                </View>
            </View>

            <View style={{ paddingHorizontal: 16, flex: 1 }}>
                {data && Object.keys(data).length > 0 && (
                    <>
                        <Text style={styles.name}>Nome: {data.nome}</Text>
                        <Text style={styles.objective}>Foco: {data.objetivo}</Text>
                        <Text style={styles.label}>Refeições:</Text>

                        <ScrollView>
                            <View style={styles.foods}>
                                {data.refeicoes.map((refeicao) => (
                                    <View style={styles.food} key={refeicao.nome}>
                                        <View style={styles.foodHeader}>
                                            <Text style={styles.foodName}>{refeicao.nome}</Text>
                                            <View style={{ width: 18, height: 18 }}>
                                                <Ionicons name="restaurant" size={18} color={'black'} />
                                            </View>
                                        </View>

                                        <View style={styles.foodContent}>
                                            <View style={{ width: 14, height: 14 }}>
                                                <Feather name="clock" size={14} color={'black'} />
                                            </View>
                                            <Text>Horário: {refeicao.horario}</Text>
                                        </View>

                                        <Text style={styles.foodText}>Alimentos:</Text>

                                        <View style={styles.foodContainerItem}>
                                            {refeicao.alimentos.map((alimento) => (
                                                <Text key={alimento} style={styles.foodItem}>
                                                    {alimento}
                                                </Text>
                                            ))}
                                        </View>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.supplements}>
                                <Text style={styles.foodName}>Dicas de Suplementos:</Text>
                                {data.suplementos.map((suplemento) => (
                                    <Text style={[styles.foodItem, { fontWeight: 'semibold' }]} key={suplemento}>
                                        {suplemento}
                                    </Text>
                                ))}
                            </View>

                            <Pressable style={styles.button} onPress={() => router.replace('/')}>
                                <Text style={styles.buttonText}>Gerar nova dieta</Text>
                            </Pressable>
                        </ScrollView>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: colors.white,
        marginBottom: 4,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    containerHeader: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        paddingTop: 50,
        paddingBottom: 20,
        marginBottom: 16,
    },
    contentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 28,
        color: colors.background,
        fontWeight: 'bold',
    },
    buttonShare: {
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 4,
    },
    buttonShareText: {
        color: colors.white,
        fontWeight: 'semibold',
    },
    name: {
        fontSize: 20,
        color: colors.white,
        fontWeight: 'bold',
    },
    objective: {
        marginTop: 5,
        color: colors.white,
        fontSize: 16,
        marginBottom: 24,
    },
    label: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    foods: {
        backgroundColor: colors.white,
        padding: 14,
        borderRadius: 8,
        marginTop: 8,
        gap: 8,
    },
    food: {
        backgroundColor: 'rgba(208,208,208, 0.4)',
        padding: 8,
        borderRadius: 4,
    },
    foodHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    foodName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    foodContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    foodText: {
        fontSize: 16,
        marginTop: 14,
    },
    foodItem: {
        marginTop: 10,
    },
    foodContainerItem: {
        paddingVertical: 5,
        paddingHorizontal: 3,
    },
    supplements: {
        backgroundColor: colors.white,
        marginTop: 14,
        marginBottom: 14,
        padding: 14,
        borderRadius: 8,
    },
    button: {
        backgroundColor: colors.blue,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 24,
        marginTop: 10,
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
    },
});
