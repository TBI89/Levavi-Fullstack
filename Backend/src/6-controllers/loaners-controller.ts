import express, { Request, Response, NextFunction } from "express";
import loanersService from "../5-services/loaners-service";
import StatusCode from "../3-models/status-code";
import LoanerModel from "../3-models/loaner-model";

// Create router:
const router = express.Router();

// GET (all) http://localhost:4000/api/loaners
router.get("/loaners", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const loaners = await loanersService.getAllLoaners();
        response.json(loaners);
    }
    catch (err: any) {
        next(err);
    }
});

// GET (one) http://localhost:4000/api/loaners/:id
router.get("/loaners/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const loaner = await loanersService.getOneLoaner(id);
        response.json(loaner);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4000/api/loaners/
router.post("/loaners/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const loaner = new LoanerModel(request.body);
        const newLoaner = await loanersService.addLoaner(loaner);
        response.status(StatusCode.Create).json(newLoaner);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:4000/api/loaners/:id
router.put("/loaners/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {// ***FIX***
    try {
        request.body.id = +request.params.id;
        const loaner = new LoanerModel(request.body);
        const updatedLoaner = await loanersService.updateLoaner(loaner);
        response.json(updatedLoaner);
    }
    catch (err: any) {
        next(err);
    }
});

// Delete http://localhost:4000/api/loaners/:id
router.delete("/loaners/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await loanersService.deleteLoaner(id);
        response.sendStatus(StatusCode.NoConcent);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;