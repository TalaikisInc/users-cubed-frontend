import { join } from 'path'
import * as nsfwjs from 'nsfwjs'

export default async (img) => {
  const model = await nsfwjs.load(join(__dirname, 'model'))
  const predictions = await model.classify(join(__dirname, './public', img))
  return predictions
}
