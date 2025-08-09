import { Request, Response } from 'express';
import Hero from '../models/hero';

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
    
};

export const updateHero = async (req: Request, res: Response) => {
    
};
