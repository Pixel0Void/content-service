import Hero, { EffectType, HeroRarity, Target } from "../models/hero"

export const insertSampleData = async function ensureSampleHeroData() {
    const heroCount = await Hero.countDocuments();
    if (heroCount === 0) {
        console.log('No heroes found. Adding sample data...');

        const aegis = new Hero({
            name: "Aegis, The Forest Guardian",
            description: "A stalwart defender who protects allies with unwavering resolve.",
            health: 100,
            rarity: HeroRarity.common,
            abilities: [
                {
                    name: "Nature's Embrace",
                    description: "Heals 20 HP.",
                    manaCost: 3,
                    target: Target.self,
                    effects: [
                        { type: EffectType.heal, value: 20 }
                    ]
                },
                {
                    name: "Thorn Shield",
                    description: "50% Damage Reduction for next turn.",
                    manaCost: 4,
                    target: Target.self,
                    effects: [
                        {
                            type: EffectType.shield,
                            duration: 1,
                            statModifier: {
                                damageReductionPercent: 50,
                            }
                        }
                    ]
                },
                {
                    name: "Root Bind",
                    description: "Opponent cannot use abilities next turn.",
                    manaCost: 5,
                    target: Target.opponent,
                    effects: [
                        {
                            type: EffectType.debuff,
                            duration: 1,
                            preventAbilities: true
                        }
                    ]
                },
                {
                    name: "Spirit of the Grove",
                    description: "Deals 25 Damage to both heroes simultaneously.",
                    manaCost: 6,
                    target: Target.all,
                    effects: [
                        { type: EffectType.damage, value: 25 }
                    ]
                }
            ]
        });
        await aegis.save();

        const flamecaller = new Hero({
            name: "Ignis, the Flamecaller",
            description: "Ignis, the Flamecaller description",
            health: 90,
            rarity: HeroRarity.epic,
            abilities: [
                {
                    name: "Fireball",
                    description: "Deals 25 damage to opponent.",
                    manaCost: 3,
                    target: Target.opponent,
                    effects: [
                        { type: EffectType.damage, value: 25 }
                    ]
                },
                {
                    name: "Ignite",
                    description: "Deals 10 damager per turn for 2 turns to opponent.",
                    manaCost: 4,
                    target: Target.opponent,
                    effects: [
                        { type: EffectType.debuff, duration: 2, tickDamage: 10 }
                    ]
                },
                {
                    name: "Mana Burn",
                    description: "Reduces opponent's Mana by 2.",
                    manaCost: 2,
                    target: Target.opponent,
                    effects: [
                        { type: EffectType.manaDrain, value: 2 }
                    ]
                },
                {
                    name: "Pyroblast",
                    description: "Deals 60 damage to opponent.",
                    manaCost: 8,
                    target: Target.opponent,
                    effects: [
                        { type: EffectType.damage, value: 60 }
                    ]
                }
            ]
        });
        await flamecaller.save();

        const swiftblade = new Hero({
            name: "Zephyr, the Swiftblade",
            description: "Zephyr, the Swiftblade description",
            health: 95,
            rarity: HeroRarity.legendary,
            abilities: [
                {
                    name: "Quick Strike",
                    description: "Deals 15 damage to opponent.",
                    manaCost: 2,
                    target: Target.opponent,
                    effects: [
                        { type: EffectType.damage, value: 15 }
                    ]
                },
                {
                    name: "Dodge",
                    description: "75% damage reduction for next turn.",
                    manaCost: 3,
                    target: Target.self,
                    effects: [
                        {
                            type: EffectType.shield,
                            duration: 1,
                            statModifier: {
                                damageReductionPercent: 75,
                            }
                        }
                    ]
                },
                {
                    name: "Blade Fury",
                    description: "Total 24 damage in 3 hits to opponent.",
                    manaCost: 5,
                    target: Target.opponent,
                    effects: [
                        { type: EffectType.damage, value: 8 },
                        { type: EffectType.damage, value: 8 },
                        { type: EffectType.damage, value: 8 }
                    ]
                },
                {
                    name: "Sudden Lunge",
                    description: "Deals 50 damage to opponent, takes 15 damage to self",
                    manaCost: 7,
                    target: Target.opponent,
                    effects: [
                        { type: EffectType.damage, value: 50 },
                        { type: EffectType.damage, value: 15, targetModifier: Target.self }
                    ]
                }
            ]
        });
        await swiftblade.save();

        const arcaneWeaver = new Hero({
            name: "Moirai, the Arcane Weaver",
            description: "Moirai, the Arcane Weaver description",
            health: 90,
            rarity: HeroRarity.rare,
            abilities: [
                {
                    name: "Mana Infusion",
                    description: "Gain 2 additional mana for current/next turn.",
                    manaCost: 1,
                    target: Target.self,
                    effects: [
                        { type: EffectType.manaGain, value: 2 }
                    ]
                },
                {
                    name: "Temporal Shift",
                    description: "Skipps opponent's next turn.",
                    manaCost: 6,
                    target: Target.opponent,
                    effects: [
                        { type: EffectType.skipTurn, duration: 1 }
                    ]
                },
                {
                    name: "Arcane Bolt",
                    description: "Deals 20 damage to opponent.",
                    manaCost: 3,
                    target: Target.opponent,
                    effects: [
                        { type: EffectType.damage, value: 20 }
                    ]
                },
                {
                    name: "Ethereal Bind",
                    description: "Opponent cannot use abilities with mana cost > 4 next turn.",
                    manaCost: 4,
                    target: Target.opponent,
                    effects: [
                        {
                            type: EffectType.debuff,
                            duration: 1,
                            maxManaCostAllowed: 4
                        }
                    ]
                }
            ]
        });
        await arcaneWeaver.save();

        console.log('Sample data added.');
    } else {
        console.log('Heroes already exist. Skipping sample data.');
    }
}
