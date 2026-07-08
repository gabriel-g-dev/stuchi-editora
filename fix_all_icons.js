const fs = require('fs');
const { Jimp } = require('jimp');

async function fixIcons() {
  const icons = [
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192x192.png', size: 192 },
    { name: 'icon-512x512.png', size: 512 }
  ];

  for (const icon of icons) {
    try {
      const iconPath = `assets/img/${icon.name}`;
      
      // If the backup doesn't exist, we haven't processed this yet, so create backup
      const backupPath = `assets/img/${icon.name}_backup.png`;
      if (!fs.existsSync(backupPath)) {
        if(fs.existsSync(iconPath)) {
           fs.copyFileSync(iconPath, backupPath);
        } else {
           continue;
        }
      }

      // Read from the original backup to avoid double-processing
      const originalIcon = await Jimp.read(backupPath);
      
      // Create a new image with a dark background (#0b0b0d)
      const newIcon = new Jimp({ width: icon.size, height: icon.size, color: '#0b0b0d' });
      
      // Resize original to fit if necessary
      originalIcon.resize({ w: icon.size, h: icon.size });
      
      // Composite the original icon over the dark background
      newIcon.composite(originalIcon, 0, 0);

      // Overwrite the original file with the new dark one
      await newIcon.write(iconPath);
      
      console.log(`Successfully fixed ${icon.name}!`);
    } catch (error) {
      console.error(`Error fixing ${icon.name}:`, error);
    }
  }
}

fixIcons();
