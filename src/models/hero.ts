import mongoose, { Schema, Document } from 'mongoose';

export enum EffectType {
    damage, heal, buff, debuff,
    manaGain, manaDrain, shield, cleanse,
    skipTurn, preventAbilities, preventHighManaAbilities
}

export enum Target {
    none, self, opponent, all
}

export interface IEffectDefinition {
    type: EffectType;
    targetModifier?: Target;
    value?: number;
    duration?: number;
    tickDamage?: number; // damage over time (DoT)
    tickHeal?: number; // heal over time (HoT)
    statModifier?: {
        health?: number;
        mana?: number;
        attackDamage?: number;
        damageReductionPercent?: number;
    };

    preventAbilities?: boolean;
    maxManaCostAllowed?: number;
}

export interface IAbility {
    _id: string;
    name: string;
    description: string;
    manaCost: number;
    target: Target;
    effects: IEffectDefinition[];
}

export enum HeroRarity {
    common, rare, epic, legendary
}

export interface IHero extends Document {
    name: string;
    description: string;
    health: number;
    rarity: HeroRarity;
    abilities: IAbility[];
    version: number;
    createdAt: Date;
    updatedAt: Date;
}

const statModifierSchema: Schema = new Schema({
    health: { type: Number },
    mana: { type: Number },
    attackDamage: { type: Number },
    damageReductionPercent: {type: Number}
});

const IEffectDefinitionSchema: Schema = new Schema({
    type: { type: Number, enum: EffectType, required: true },
    targetModifier: { type: Number, enum: Target },
    value: { type: Number },
    duration: { type: Number },
    tickDamage: { type: Number },
    tickHeal: { type: Number },
    statModifier: statModifierSchema,
    preventAbilities: { type: Boolean },
    maxManaCostAllowed: { type: Number }
});

const AbilitySchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    manaCost: { type: Number, required: true },
    target: { type: Number, enum: Target, required: true },
    effects: [IEffectDefinitionSchema]
});

const HeroSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    health: { type: Number, required: true },
    rarity: { type: Number, enum: HeroRarity, required: true },
    abilities: [AbilitySchema],
    version: { type: Number, default: 1 }
}, {
   timestamps: true 
});

const Hero = mongoose.model<IHero>('Hero', HeroSchema);

export default Hero;
