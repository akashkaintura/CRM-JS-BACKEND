import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from './user-role.enum';

@Schema()
@ObjectType()
export class User extends Document {
    @Field(() => Int)
    id: number;

    @Field()
    @Prop({ required: true })
    name: string;

    @Field()
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string; // Password should not be exposed via GraphQL

    @Field(() => UserRole)
    @Prop({ required: true, enum: UserRole, default: UserRole.EMPLOYEE })
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Exclude password field from the GraphQL schema
UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    },
});
