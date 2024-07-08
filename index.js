(async () => {
    const { Client } = require('discord.js');
    const client = new Client({
        restRequestTimeout: 10000,
        intents: ['GUILDS', 'GUILD_MEMBERS']
    });
    const token = "";

    client.on('ready', async () => {
        console.log(`${client.user.tag} connected`);
        await client.user.setPresence({ status: "invisible" });
        const owners = [...new Set(client.guilds.cache.map(guild => guild.ownerId))];
        let guildsToRemove = [];
        let totalGuilds = client.guilds.cache.size;
        let totalUniqueOwners = owners.length;

        for (let ownerId of owners) {
            const guilds = client.guilds.cache.filter(guild => guild.ownerId === ownerId);
            if (guilds.size === 3) continue;
            console.log(`LEAVE: ${guilds.first().name} (ID: ${guilds.first().id}) with ${guilds.first().memberCount}`);
            guildsToRemove.push(guilds.first().leave());
            totalGuilds--;
        }

        await Promise.all(guildsToRemove);

        const inorganicGrowPercentage = ((totalUniqueOwners - owners.length) / totalGuilds) * 100;
        console.log(`${inorganicGrowPercentage}% ${inorganicGrowPercentage >= 13 ? "(Inorganic Grow)" : "(Safe)"}`);
    });

    await client.login(token);
})();
