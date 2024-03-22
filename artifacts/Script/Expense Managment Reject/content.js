
var data  = wfData.objectKey;
await entities.travel_expenses.createQueryBuilder()
    .update()
    .set({"status":"Rejected"})
    .where("Uniqe_id = :Uniqe_id", {Uniqe_id: data})
    .execute();


complete()