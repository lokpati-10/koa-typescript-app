import mongoose, { Schema, Document } from 'mongoose'
import { LoginInfo, UserRegisterInfo } from 'types'

const userSignInSchema: Schema = new Schema<UserRegisterInfo>(
  {
    userName: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    primaryContactNumber: {
      type: Number
    },
    secondaryContactNumber: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)

export const userSignInModel = mongoose.model<UserRegisterInfo & Document>('users', userSignInSchema)
