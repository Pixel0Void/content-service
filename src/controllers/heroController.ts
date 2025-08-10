import { Request, Response } from 'express';
import Hero, { IHero } from '../models/hero';
import { ObjectId } from 'mongoose';

export const getAllHeroes = async (req: Request, res: Response) => {
    try {
        const heroes = await Hero.find({});
        return res.status(200).json(heroes);
    } catch (error: any) {
        console.error('Error fetching heroes: ', error);
        return res.status(500).json({ message: 'Server error while fetching heroes.', error: error.message });
    }
};

export const getUpdates = async (req: Request, res: Response) => {
    const clientHeroVersions: { id: string, version: number }[] = req.body.heroVersions || [];

    try {
        const updatedHeroes: IHero[] = [];
        const allHeroesInDB = await Hero.find({});
        const dbHeroMap = new Map<string, IHero>();
        allHeroesInDB.forEach(hero => dbHeroMap.set(hero.id, hero));

        for (const dbHero of allHeroesInDB) {
            const clientVersion = clientHeroVersions.find(h => h.id === dbHero.id)?.version;

            if (clientVersion === undefined || dbHero.version !== clientVersion) {
                updatedHeroes.push(dbHero);
            }
        }

        console.log(`Sending ${updatedHeroes.length} updated/new heroes.`);
        return res.status(200).json({ updatedHeroes: updatedHeroes });

    } catch (error: any) {
        console.error('Error fetching hero updates: ', error);
        return res.status(500).json({ message: 'Server error while fetching hero updates.', error: error.message });
    }
};

export const getHeroById = async (req: Request, res: Response) => {
    try {
        const heroId = req.params.id;
        const hero = await Hero.findById(heroId);
        if (!hero) {
            return res.status(404).json({ message: 'Hero not found.' });
        }

        return res.status(200).json(hero);
    } catch (error: any) {
        console.error('Error fetching hero by ID: ', error);
        return res.status(500).json({ message: 'Server error while fetching heroes.', error: error.message });
    }
};

export const insertNewHero = async (req: Request, res: Response) => {
    try {
        const newHeroData: IHero = req.body;
        if (!newHeroData.name || !newHeroData.description || !newHeroData.health || !newHeroData.rarity || !newHeroData.abilities) {
            return res.status(400).json({ message: 'Missing required hero fields' });
        }

        const newHero = new Hero(newHeroData);
        await newHero.save();
        return res.status(201).json(newHero);

    } catch (error: any) {
        console.error('Error adding new hero: ', error);

        if (error.code === 11000) {
            return res.status(409).json({ message: 'Hero with this name already exists.' });
        }

        return res.status(500).json({ message: 'Server error while adding hero.', error: error.message });
    }
};

export const updateHero = async (req: Request, res: Response) => {
    try {
        const heroId = req.params.id;
        const updateData = req.body;

        const hero = await Hero.findById(heroId);
        if (!hero) {
            return res.status(404).json({ message: 'Hero not found.' });
        }

        Object.assign(hero, updateData);
        hero.version = (hero.version || 0) + 1;
        await hero.save();
        return res.status(200).json(hero);

    } catch (error: any) {
        console.error('Error updating hero: ', error);
        return res.status(500).json({ message: 'Server error while updating hero.', error: error.message });
    }
};
