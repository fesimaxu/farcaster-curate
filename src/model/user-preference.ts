import { Schema, model } from "mongoose";

export interface IUserPreference {
    fid: string;
    preference: string[];
  }


  const UserPreferenceSchema = new Schema<IUserPreference>(
    {
      fid: {
        type: String,
        required: true,
        unique: true,
      },
      preference: {
        type: [String],
        required: true,
      },
    },
    { timestamps: true }
  );
  
  const UserPreference = model("UserPreference", UserPreferenceSchema);
  
  export default UserPreference;