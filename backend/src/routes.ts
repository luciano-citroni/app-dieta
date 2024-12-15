import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';

import { CreateNutritionController } from './controllers/create-nutrition-controller';

const controller = new CreateNutritionController();

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/teste', (request: FastifyRequest, reply: FastifyReply) => {
        let responseText =
            '```json\n{\n  "nome": "Luciano",\n  "sexo": "Masculino",\n  "idade": 23,\n  "altura": 1.80,\n  "peso": 73,\n  "objetivo": "Hipertrofia",\n  "refeicoes": [\n    {\n      "horario": "7:00",\n      "nome": "Cafe da manha",\n      "alimentos": [\n        "Aveia (1/2 xicara)",\n        "Leite desnatado (1 xicara)",\n        "Banana (1 unidade)",\n        "Nozes (1 punhado)"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "nome": "Lanche da manha",\n      "alimentos": [\n        "Iogurte desnatado (1 pote)",\n        "Frutas vermelhas (1/2 xicara)"\n      ]\n    },\n    {\n      "horario": "13:00",\n      "nome": "Almoco",\n      "alimentos": [\n        "Arroz integral (1 concha)",\n        "Frango grelhado (150g)",\n        "Salada de folhas verdes (1 prato)",\n        "Feijao (1 concha)"\n      ]\n    },\n    {\n      "horario": "16:00",\n      "nome": "Lanche da tarde",\n      "alimentos": [\n        "Sanduiche natural com peito de peru e queijo branco",\n        "Maça (1 unidade)"\n      ]\n    },\n    {\n      "horario": "19:00",\n      "nome": "Janta",\n      "alimentos": [\n        "Batata doce (1 unidade media)",\n        "Carne magra (150g)",\n        "Brócolis (1 xicara)"\n      ]\n    }\n  ],\n  "suplementos": [\n    "Whey protein",\n    "Creatina",\n    "BCAA"\n  ]\n}\n```\n';

        try {
            //extrair json

            let jsonString = responseText
                .replace(/```\w*\n/g, '')
                .replace(/\n```/g, '')
                .trim();

            let jsonObject = JSON.parse(jsonString);

            reply.send({ data: jsonObject });
        } catch (err) {
            console.log(err);
        }
    });

    //create nutrition

    fastify.post('/create', controller.handle);
}
