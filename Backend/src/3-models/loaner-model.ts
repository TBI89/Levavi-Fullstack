import Joi from "joi";
import { ValidationError } from "./error-model";

class LoanerModel {

    // Model properties:
    public id: number;
    public israeliId: string;
    public firstName: string;
    public lastName: string;
    public cityId: number;
    public street: string;
    public phone: string;

    // Copy constructor:
    public constructor(loaner: LoanerModel) {
        this.id = loaner.id;
        this.israeliId = loaner.israeliId;
        this.firstName = loaner.firstName;
        this.lastName = loaner.lastName;
        this.cityId = loaner.cityId;
        this.street = loaner.street;
        this.phone = loaner.phone;
    }

    // Joi validation schema:
    private static validationSchema = Joi.object({
        id: Joi.number().optional().positive().integer(),
        israeliId: Joi.string().required().min(5).max(10),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(30),
        cityId: Joi.number().required().positive().max(10).integer(),
        street: Joi.string().required().min(3).max(20),
        phone: Joi.string().required().min(9).max(15)
    });

    // Validate props:
    public validate(): void {
        const result = LoanerModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message); // Throw if not valid.
    }
}

export default LoanerModel;