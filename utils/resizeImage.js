const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid');
const path = require('path')

class ImageResizer {
    constructor(folder) {
        this.folder = folder
    }
    async save(buffer) {
        const filename = ImageResizer.getFileName()
        const filepath = this.getFilePath(filename)

        await sharp(buffer).resize(1024, 1024, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        }).toFile(filepath)
        return filename
    }
    static getFileName() {
        return `${uuidv4()}.png`
    }
    getFilePath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}

module.exports = ImageResizer