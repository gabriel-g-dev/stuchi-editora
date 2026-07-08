const fs = require('fs');
const { Jimp } = require('jimp');

async function fixIcon() {
  try {
    const iconPath = 'assets/img/icon-192x192.png';
    const originalIcon = await Jimp.read(iconPath);
    
    // Backup original
    fs.copyFileSync(iconPath, 'assets/img/icon-192x192_backup.png');

    // Create a new image with a dark background (#0b0b0d or just solid black)
    const newIcon = new Jimp({ width: 192, height: 192, color: '#000000' });
    
    // Composite the original icon over the dark background
    newIcon.composite(originalIcon, 0, 0);

    // Save
    await newIcon.write('assets/img/icon-192x192-dark.png');
    
    console.log('Successfully created dark background icon!');
  } catch (error) {
    console.error('Error fixing icon:', error);
  }
}

fixIcon();
