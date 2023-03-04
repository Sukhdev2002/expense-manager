const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    breakfast: "number",
    lunch: "number",
    dinner: "number",
    kiraya: "number",
    healthy_food: "number",
    personal: "number",
    special: "number",
    other: "number",
    description :"string",
    total:"number",
    createDate: "date",
    updatedDate: "date",
    createdBy: "string",
    updatedBy: "string",
  },

  { timestamps: { createDate: "created_at", updatedDate: "updated_at" } ,
   total : { $sum: [ "$breakfast", "$lunch","$dinner","$kiraya","$healthy_food","$personal","$special","$other" ] }

}
);

const Task = mongoose.model("tasks", taskSchema);

module.exports = {
  Task,
};
