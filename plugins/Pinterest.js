import pkg from 'nayan-media-downloader';
const { pintarest } = pkg;

const handler = async (m, { conn, args }) => {
  if (!args[0]) throw `✳️ Enter the Pinterest link next to the command`;
  if (!args[0].match(/(pinterest\.com\/pin\/|pin\.it\/)/gi)) throw `❌ Link incorrect`;
  m.react('⏳');

  try {
    const url = args[0];
    let data = await pintarest(url);
    const { download, fileName, mimetype } = data;
    
    const caption = `❥ HERE IS YOUR VIDEO \n\n☆ *VIDEO TITLE:* ${fileName}\n\n❥ © GlobalTechInfo`;
    
    await conn.sendFile(m.chat, download, fileName, caption, m, false, { mimetype });
    m.react('✅');
  } catch (error) {
    console.error('Error downloading from Pinterest:', error);
    await m.reply('⚠️ An error occurred while processing the request. Please try again later.');
    m.react('❌');
  }
};

handler.help = ['pinterest <url>'];
handler.tags = ['downloader'];
handler.command = ['pinterest', 'pint'];

export default handler;