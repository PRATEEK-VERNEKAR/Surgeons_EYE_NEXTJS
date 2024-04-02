// import mongoose, { Document, Model, Schema } from 'mongoose';

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
// }

// const userSchema: Schema<IUser> = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// export const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);


import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  chats: {
    dateTimeId: String;
    transcript:String;
    conversations: {
      type: string;
      message: string;
    }[];
  }[];
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  chats: [
    {
      dateTimeId: { type: String, required: true },
      transcript:{type:String,requied:true},
      conversations: [
        {
          type: { type: String, required: true },
          message: { type: String, required: true },
        },
      ],
    },
  ],
});

export const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);