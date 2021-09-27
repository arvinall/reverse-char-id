import path from 'path'

import {
  srcDirectory,
  createWatcher,
  checkExtension,
  spawnHere,
  localNpmBinaries
} from './utils.js'

const {
  URL,
  Promise,
  Error,

  process,
  console
} = globalThis

/**
 * Check test files
 *
 * @param {string} fileAddress
 *
 * @returns {boolean}
 */
export const checkExtensionTest = fileAddress => checkExtension(
  fileAddress,
  [['test', 'ts'], ['test', 'js']]
)

export function test (sourceDirectory = srcDirectory, fileAddress) {
  const titles = ['Test']

  let address = sourceDirectory

  if (typeof fileAddress === 'string') {
    titles.push(fileAddress)

    address = path.resolve(
      sourceDirectory,
      path.relative(sourceDirectory, fileAddress)
    )
  }

  return spawnHere(
    titles.join(),
    path.resolve(localNpmBinaries, 'jest'),
    [address]
  )
}

if (process.argv[1] === (new URL(import.meta.url)).pathname) {
  (async () => {
    let lastExitPromise
    let lastChildProcess

    async function testFlow (fileAddress) {
      if (typeof fileAddress === 'string') {
        if (!checkExtensionTest(fileAddress)) return
      }

      if (
        lastChildProcess &&
        lastChildProcess.exitCode === null &&
        !lastChildProcess.killed
      ) lastChildProcess.kill()

      try { await lastExitPromise } catch (error) {}

      lastExitPromise = test(srcDirectory, fileAddress)

      lastExitPromise.catch(error => {
        if (error instanceof Error) console.error(error)
      })

      lastChildProcess = lastExitPromise.childProcess
    }

    testFlow()

    const watcher = createWatcher(srcDirectory)

    await new Promise(resolve => watcher.once('ready', resolve))

    watcher
      .on('add', testFlow)
      .on('change', testFlow)
      .on('unlink', testFlow)
  })()
}
