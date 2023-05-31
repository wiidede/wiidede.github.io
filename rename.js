/* eslint-disable no-console */
import fs from 'node:fs'
import path from 'node:path'

const directoryPath = 'src/pages/posts/python/'

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log(`Error reading directory: ${err}`)
    return
  }

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file)
    const fileContent = fs.readFileSync(filePath, 'utf8')

    const idMatch = fileContent.match(/^id:\s*(\S+)/m)
    if (idMatch) {
      const newFilePath = path.join(directoryPath, `${idMatch[1]}.md`)
      fs.renameSync(filePath, newFilePath)
      console.log(`Renamed ${file} to ${idMatch[1]}.md`)
    }
  })
})
