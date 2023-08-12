import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import LoanerModel from "../3-models/loaner-model";
import { ResourceNotFoundError } from "../3-models/error-model";

// Get all loaners:
async function getAllLoaners(): Promise<LoanerModel[]> {

    const sql = `SELECT
    loanerId as id,
    israeliId,
    firstName,
    lastName,
    cityName as city,
    street,
    phone
    FROM loaners l
    JOIN cities c ON l.cityId = c.cityId`;

    const loaners = await dal.execute(sql);
    return loaners;
}

// Get one loaner:
async function getOneLoaner(id: number): Promise<LoanerModel> {

    const sql = `SELECT 
    loanerId as id,
    israeliId,
    firstName,
    lastName,
    cityName as city,
    street,
    phone
    FROM loaners l
    JOIN cities c ON l.cityId = c.cityId
    WHERE loanerId = ${id}`;

    const loaners = await dal.execute(sql);
    const loaner = loaners[0];
    if(!loaner) throw new ResourceNotFoundError(id);
    return loaner;
}

// Add loaner:
async function addLoaner(loaner: LoanerModel): Promise<LoanerModel> {

    loaner.validate();
    
    const sql = `INSERT INTO loaners(israeliId, firstName, lastName, cityId, street, phone)
    VALUES('${loaner.israeliId}', '${loaner.firstName}', '${loaner.lastName}', '${loaner.cityId}', '${loaner.street}', '${loaner.phone}')`;

    const info: OkPacket = await dal.execute(sql);
    loaner.id = info.insertId; // Generate unique id.
    const addedLoaner = await getOneLoaner(loaner.id); // Fetch the cityName for the new loaner.
    return addedLoaner;
}

// Update loaner:
async function updateLoaner(loaner: LoanerModel): Promise<LoanerModel> {

    loaner.validate();

    const sql = `UPDATE loaners SET 
   israeliId = '${loaner.israeliId}',
   firstName = '${loaner.firstName}',
   lastName = '${loaner.lastName}',
   cityId = '${loaner.cityId}',
   street = '${loaner.street}',
   phone = '${loaner.phone}'
   WHERE loanerId = ${loaner.id}`;

    const info: OkPacket = await dal.execute(sql);
    if(info.affectedRows === 0) throw new ResourceNotFoundError(loaner.id);
    const updatedLoaner = await getOneLoaner(loaner.id); // Fetch the cityName for the updated loaner.
    return updatedLoaner;
}

// Delete loaner:
async function deleteLoaner(id: number): Promise<void> {

    const sql = `DELETE FROM loaners WHERE loanerId = ${id}`;
    const info: OkPacket = await dal.execute(sql);
    if(info.affectedRows === 0) throw new ResourceNotFoundError(id);
}

export default {
    getAllLoaners,
    getOneLoaner,
    addLoaner,
    updateLoaner,
    deleteLoaner
};