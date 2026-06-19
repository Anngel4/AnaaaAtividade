import React, { useState, useCallback } from 'react';

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import db from '../database/database';

export default function TelaTaverna({ navigation }) {

    const [missoes, setMissoes] = useState([]);
    const [xpTotal, setXpTotal] = useState(0);

    function carregarMissoes() {

        const dados = db.getAllSync(
            'SELECT * FROM missoes'
        );

        setMissoes(dados);

        const total = dados.reduce(
            (soma, missao) => soma + missao.xp,
            0
        );

        setXpTotal(total);
    }

    useFocusEffect(
        useCallback(() => {
            carregarMissoes();
        }, [])
    );

    const lidarComToqueLongo = (titulo) => {

        Alert.alert(
            'Missão concluída',
            `Você finalizou sua missão: ${titulo}. XP adquirido!`
        );
    };

    function apagarMissao(id, titulo) {

        Alert.alert(
            'Excluir Missão',
            `Deseja apagar a missão "${titulo}"?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Apagar',
                    style: 'destructive',
                    onPress: () => {
                        try {

                            db.runSync(
                                'DELETE FROM missoes WHERE id = ?',
                                [id]
                            );

                            carregarMissoes();

                            Alert.alert(
                                'Sucesso',
                                'Missão removida.'
                            );

                        } catch (erro) {

                            Alert.alert(
                                'Erro',
                                erro.message
                            );

                        }
                    }
                }
            ]
        );
    }

    return (

        <View style={styles.container}>

            <View style={styles.cardXp}>
                <Text style={styles.textoXpTotal}>
                    𝘟𝘱 𝘵𝘰𝘵𝘢𝘭: {xpTotal}
                </Text>
            </View>

            <Text style={styles.titulo}>
                Quadro de Missões
            </Text>

            <FlatList
                data={missoes}
                keyExtractor={(item) =>
                    item.id.toString()
                }

                renderItem={({ item }) => (

                    <View style={styles.cartaoMissao}>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(
                                    'Pergaminho',
                                    { missaoSelecionada: item }
                                );
                            }}

                            onLongPress={() =>
                                lidarComToqueLongo(item.titulo)
                            }
                        >

                            <Text style={styles.textoMissao}>
                                {item.titulo}
                            </Text>

                            <Text style={styles.textoXp}>
                                XP: {item.xp}
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.botaoApagar}
                            onPress={() =>
                                apagarMissao(
                                    item.id,
                                    item.titulo
                                )
                            }
                        >
                            <Text style={styles.textoBotaoApagar}>
                                🗑 Remove
                            </Text>
                        </TouchableOpacity>

                    </View>

                )}
            />

            <TouchableOpacity
                style={styles.botaoNovaMissao}
                onPress={() =>
                    navigation.navigate('Pergaminho')
                }
            >
                <Text style={styles.textoBotao}>
                    + Nova Missão
                </Text>
            </TouchableOpacity>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f5dc',
        padding: 20
    },

    cardXp: {
        backgroundColor: '#fffbf9',
        padding: 10,
        borderRadius: 30,
        marginBottom: 5,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff5f5'
    },

    textoXpTotal: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#432a22'
    },

    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4a4a4a',
        textAlign: 'center'
    },

    cartaoMissao: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        elevation: 2
    },

    textoMissao: {
        fontSize: 18,
        color: '#000'
    },

    textoXp: {
        fontSize: 14,
        color: '#666',
        marginTop: 5
    },

    botaoApagar: {
        marginTop: 10,
        backgroundColor: '#ba4639',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center'
    },

    textoBotaoApagar: {
        color: '#fff',
        fontWeight: 'bold'
    },

    botaoNovaMissao: {
        backgroundColor: '#8b4513',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },

    textoBotao: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }

});