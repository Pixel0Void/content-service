export const config = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/ability_arena_content_db',
    port: process.env.PORT || 3001
};
