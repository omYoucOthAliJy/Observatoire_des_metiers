import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";




@Schema({
    timestamps: true
})

export class User{

    @Prop()
    name: string;

    @Prop()
    last_name: string;

    @Prop()
    birthday: string;

    @Prop()
    formation: string;

    @Prop()
    date_diplome: string;

    @Prop()
    description: string;

}

export const UserSchema = SchemaFactory.createForClass(User)