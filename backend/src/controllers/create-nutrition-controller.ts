import { FastifyRequest, FastifyReply } from 'fastify';

import { CreateNutritionService } from '../services/create-nutrition-service';

const service = new CreateNutritionService();

export interface DataProps {
    name: string;
    weight: string;
    height: string;
    age: string;
    gender: string;
    objective: string;
    level: string;
}

class CreateNutritionController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, weight, height, age, gender, objective, level } = request.body as DataProps;

        const create = await service.execute({ name, weight, height, age, gender, objective, level });

        reply.send(create);
    }
}

export { CreateNutritionController };
