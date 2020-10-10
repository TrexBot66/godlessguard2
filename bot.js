const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Gokalp 7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

// STRİGA BU ARADA ADAMDIR YA KANKA BEN VİDEOLARINA LİKE ATIYORUM BENCE ÇOK İYİ VİDEOLARI LİKE FALAN AT YORUMDA YAPALM







//---------------------------------SAĞ-TIK-BAN---------------------------------\\


client.on("guildBanAdd", async function(guild, user) {
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());
  const yetkili = await guild.members.get(entry.executor.id);
setTimeout(async () =>{
    let logs = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'});
    if(logs.entries.first().executor.bot) return;
    
      guild.members.get(logs.entries.first().executor.id).removeRoles(guild.members.get(logs.entries.first().executor.id).roles) 
     setTimeout(()=>{ guild.members.get(logs.entries.first().executor.id).addRole("763077536006668309")/// VERİLECEK CEZALI ROL İD
    },3000)
const strigalog = guild.channels.find(c=> c.id ==="763077960239546368") // MSJ GDCK KANL ID 
const striga = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(`<@${yetkili.id}> ${user} Adlı Kullanıcıya Sağ Tık Ban Attığı İçin Rollerini Aldım Ve <@763077536006668309> Rolünü Verdim.`) // sadece cezalı rol idsini yapıştırın onun dışında < > @ & karakterlerine karışmayın.
.setFooter('Developer Trexhia')
strigalog.send(striga)
guild.owner.send(`Godless Güvenliği | ** <@${yetkili.id}> İsimili Yetkili <@${user.id}>** Adlı Kişiyi Banladı Ve Yetkilerini Aldım.`)
},2000)
})


//---------------------------------SAĞ-TIK-BAN---------------------------------\\
















//---------------------------------SAĞ-TIK-KICK---------------------------------\\      SAĞ TIK KİCKİ HALLEDEMEDİM TEK GECEDE EN FAZLA BU KADAR OLUYOR


client.on("guildMemberRemove", async function(member) {
  let guild = member.guild;
  const entry = await guild.fetchAuditLogs({ type: "MEMBER_KICK" }).then(audit => audit.entries.first());
     const yetkili = entry.executor
    const bunlardakral = guild.members.get(`${yetkili.id}`)
  setTimeout(async () => { // S T G 
    let logs = await guild.fetchAuditLogs({ type: "MEMBER_KICK" });
    if (logs.entries.first().executor.bot) return;
    if (logs.entries.first().target.id !== member.id) return;
 
    if (bunlardakral.id === (`675400144937680898`)) return; // godles
    if (bunlardakral.id === (`458327367467663360`)) return; // ben
    if (bunlardakral.id === (`747162403556425728`)) return; // zelal
    if (bunlardakral.id === (``)) return; // ben
    bunlardakral.kick(yetkili) // ------------------ YETKİLİ KİCK ATARSA KİCK YER. ------------------- DÜZELTTİĞİM ZAMAN DUYURU OLARAK GEÇERİM BURAYADA EKLERİM.--------------\\

    const strigalog = guild.channels.find(c => c.id === "763079115611308042"); // log kanal id
    if (!strigalog) return guild.owner.send(`<@${yetkili.id}> <@${member.user.id}> adlı kullanıcıyı sunucudan attığı için sunucudan uzaklaştırıldı!`);
 strigalog.send(`<@${yetkili.id}>, <@${member.user.id}> adlı kullanıcıyı sunucudan attığı için sunucudan uzaklaştırıldı!`);  }, 2000);
});

//---------------------------------SAĞ-TIK-KICK---------------------------------\\          TOPLASAN 3 SAAT SÜRDÜYSE 2:30 KICKE GİTTİ MAX BU KB VALLA
















//---------------------------------ROL-SILINME-ENGEL---------------------------------\\


client.on("roleDelete", async (role) => { 
  const logs = await role.guild.fetchAuditLogs({ type: 'ROLE_DELETE' }).then(audit => audit.entries.first())
  const deleter = await role.guild.members.get(logs.executor.id);
  if(deleter.id == "675400144937680898") return; //ROL SİLMESİNE İZİN VERİLEN İNSANLARIN İDLERİ (KOLAYLIK OLSUN DİYE İDSİNİ YAZDIKTAN SONRA ALTAKİNİ YAPABİLİRSİN)
  if(deleter.id == "458327367467663360") return; // ben ID
  if(deleter.id == "747162403556425728") return; // zelal ID
  if(deleter.id == "") return; // VAY BENİM DEVREM NASILSIN ENİŞTE ID 
  let mention = role.mentionable;
  let hoist = role.hoist;
  let color = role.hexColor;
  let name = role.name;
  let perms = role.permissions;
  let position = role.position;
     const strigalog = role.guild.channels.find(c=> c.id ==="763079895588536373") // MESAJ ATICAĞI KANAL ID'Sİ
const striga = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(`**<@${deleter.id}> ${role.name}** Adlı Rol Silindi Ben Terkar Oluşturdum Ve Tüm Yetkileri Alınıp <@&763077536006668309> Rolü Verildi.`)
strigalog.send(striga)
  role.guild.owner.send(`**<@${deleter.id}> Yetkili  ${role.name}** Adlı Rol Silindi Ben Terkar Oluşturdum Ve Tüm Yetkileri Alınıp <@&763077536006668309> Rolü Verildi.`)
       let roles = role.guild.members.get(deleter.id).roles.array()
                    try {
                         role.guild.members.get(deleter.id).removeRoles(roles)
                                                                             
                         }
              catch(err) {
                          console.log(err)
                         } 
    setTimeout(function(){
                         role.guild.members.get(deleter.id).addRole("763077536006668309") //CEZALI ROLÜ IDSİ
                         role.client.channels.get(`763079895588536373`).send(); // YİNE KANAL IDSİ LAN BEN BU SİSTEMİ NASIL YAPTIM AQ
                         }, 1500);
  role.guild.createRole({
    name: name,
    color: color,
    hoist: hoist,
    position: position,
    permissions: perms,
    mentionable: mention
  })
})


//---------------------------------ROL-SILINME-ENGEL---------------------------------\\















//---------------------------------ROL-OLUŞTURMA-ENGEL---------------------------------\\


 client.on('roleCreate', async (role) => {
 
    const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
    const yetkili = await role.guild.members.get(entry.executor.id);
    const eskihali = role.permissions;
          console.log(eskihali)
  if(yetkili.id == "675400144937680898") return; //ROL SİLMESİNE İZİN VERİLEN İNSANLARIN İDLERİ (KOLAYLIK OLSUN DİYE İDSİNİ YAZDIKTAN SONRA ALTAKİNİ YAPABİLİRSİN)
  if(yetkili.id == "458327367467663360") return; // ben ID
  if(yetkili.id == "747162403556425728") return; // zelal ID
  if(yetkili.id == "") return; // VAY BENİM DEVREM NASILSIN ENİŞTE ID  
   
  
             let strigalog = new Discord.RichEmbed()
             .setColor("BLACK")
             .setDescription(`<@${yetkili.id}> Yetkili **${role.name}** Adlı rolü ekledi ve sahip olduğu tüm rolleri alarak, kendisine <@&763077536006668309> rolünü verdim.`)
             .setTimestamp()
             let roles = role.guild.members.get(yetkili.id).roles.array()
                    try {
                         role.guild.members.get(yetkili.id).removeRoles(roles)
                                                                             
                         }
              catch(err) {
                          console.log(err)
                         } 
    setTimeout(function(){
                         role.guild.members.get(yetkili.id).addRole("763077536006668309")// CEZALI ROL ID
                         role.client.channels.get(`763079895588536373`).send(strigalog); // MESAJIN GİDİCEĞİ KANALIN IDSI
                         }, 1500); //

                  });


//---------------------------------ROL-OLUŞTURMA-ENGEL---------------------------------\\















//---------------------------------KANAL-SILINME-ENGEL---------------------------------\\ 


client.on('channelDelete', async (channel) => {
 
 const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
 const yetkili = await channel.guild.members.get(entry.executor.id); //
  if(yetkili.id == "675400144937680898") return; //KANAL SİLMESİNE İZİN VERİLEN İNSANLARIN İDLERİ (KOLAYLIK OLSUN DİYE İDSİNİ YAZDIKTAN SONRA ALTAKİNİ YAPABİLİRSİN)
  if(yetkili.id == "458327367467663360") return; // Striga ID
  if(yetkili.id == "747162403556425728") return; // Hikmet ID
  if(yetkili.id == "") return; // VAY BENİM DEVREM NASILSIN ENİŞTE ID  


                                                                                                  


                                                                                
 let strigalog = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`<@${yetkili.id}> İsimli Yetkili ${channel.name} Adlı Kanalı Sildi Ve Rollerini Alıp <@&CEZALI ROL ID> Rolünü Verdim.`)
.setTimestamp()
 let roles = channel.guild.members.get(yetkili.id).roles.array()
 try {
channel.guild.members.get(yetkili.id).removeRoles(roles)//
                                                                           
  }
 catch(err) {
 console.log(err)
 } 
 setTimeout(function(){
      channel.guild.members.get(yetkili.id).addRole("763077536006668309") // CEZALI ROL IDSİ
      channel.client.channels.get(`763080701733634048`).send(strigalog); // MESAJIN GİRDİCEĞİ KANAL IDSİ
               }, 1500);

                                                                               
                                                                                     
     });


//---------------------------------KANAL-SILINME-ENGEL---------------------------------\\
















//---------------------------------KANAL-OLUŞTURMA-ENGEL---------------------------------\\ 


client.on('channelCreate', async (channel) => {
 
 const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
 const yetkili = await channel.guild.members.get(entry.executor.id); //
  if(yetkili.id == "675400144937680898") return; //KANAL SİLMESİNE İZİN VERİLEN İNSANLARIN İDLERİ (KOLAYLIK OLSUN DİYE İDSİNİ YAZDIKTAN SONRA ALTAKİNİ YAPABİLİRSİN)
  if(yetkili.id == "458327367467663360") return; // Striga ID
  if(yetkili.id == "747162403556425728") return; // Hikmet ID
  if(yetkili.id == "") return; // VAY BENİM DEVREM NASILSIN ENİŞTE ID  


                                                                                                  


                                                                                
 let strigalog = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`<@${yetkili.id}> İsimli Yetkili ${channel.name} Adlı Kanalı Sildi Ve Rollerini Alıp <@&763077536006668309> Rolünü Verdim.`)
.setTimestamp()
 let roles = channel.guild.members.get(yetkili.id).roles.array()
 try {
channel.guild.members.get(yetkili.id).removeRoles(roles)//
                                                                           
  }
 catch(err) {
 console.log(err)
 } 
 setTimeout(function(){
      channel.guild.members.get(yetkili.id).addRole("763077536006668309") // CEZALI ROL IDSİ
      channel.client.channels.get(`763080701733634048`).send(strigalog); // MESAJIN GİRDİCEĞİ KANAL IDSİ
               }, 1500);

                                                                               
                                                                                     
     });


//---------------------------------KANAL-OLUŞTURMA-ENGEL---------------------------------\\
















//---------------------------------------BOT-KORUMA-------------------------------------\\


client.on('guildMemberAdd', (member) => {
    const guild = member.guild;


 let sChannel = member.guild.channels.find(c => c.name === 'bot-koruma') // KANAL İSMİ

    if(member.user.bot !==true){

    } 
    else {
    if(!sChannel){
      member.guild.owner.send(`**<a:tik:759096778665754635> Godless Bot Koruma koruma sistemi**
Sunucuya Bot Geldi Banladım !
Banlanan Bot: **${member.user.tag}**`)
      .then(() => console.log(`yasaklandı ${member.displayName}`))
    .catch(console.error);
       member.ban(member) 
    } else {
    sChannel.send(`**<a:tik:759096778665754635> Godless Bot koruma sistemi**
Sunucuya bot çekildi banladım !
Banlanan Bot: **${member.user.tag}**`)
    .then(() => console.log(`yasaklandı ${member.displayName}`))
    .catch(console.error);
       member.ban(member) 
    }
  }  
  });


//---------------------------------------BOT-KORUMA-------------------------------------\\




client.on('ready', ()=>{
client.channels.get('763091297548107797').join()
})