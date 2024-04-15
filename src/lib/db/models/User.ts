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
    dateTimeId:string;
    transcript:string;
    category:string;
    // chatName:string
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
      dateTimeId: { type: String },
      transcript:{type:String},
      category:{type:String},
      // chatName:{Type:String},
      conversations: [
        {
          type: { type: String },
          message: { type: String },
        },
      ],
    },
  ],
});

export const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);