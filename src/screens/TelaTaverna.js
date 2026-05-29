import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function TelaTaverna({ navigation }) {
    const [missoes, setMissoes] = useState([
        { id: '1', titulo: 'Derrotar o bug gigante', xp: 500 },
        { id: '2', titulo: 'Refatorar o Código Legado', xp: 1000 },
    ])

    const lidarComToqueLongo = () => {
        Alert.alert("Missão concluída", `Você finalizou sua missão: ${titulo}. XP Adquirido!`);


    }
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Quadro de missões</Text>
            <FlatList data={missoes} keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.cartaoMissao} onPress={() => {
                        navigation.navigate('Pergaminho', { missaoSelecionada: item })
                    }}
                        onLongPress={() => lidarComToqueLongo(item.titulo)}
                    >

                        <Text style={styles.textoMissao}>{item.titulo}</Text>
                        <Text style={styles.textoXp}>XP: {item.xp}</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.botaoNovaMissao} onPress={() => navigation.navigate('Pergaminho')}>
                <Text style={styles.textoBotao}> + Nova Missão</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fffff0',
    padding: 0
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000'
    },
    cartaoMissao: {
        backgroundColor: '#d6d4d1',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        elevation: 2
    },
    textoBotao:{
        
    }
})

//npm i @react-native-screens --global
//npm i react-native-safe-context
//npm i react-native-gesture-handler
//npm i @react-navigation/native @react-navigation/stack


