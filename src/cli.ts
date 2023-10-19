#!/usr/bin/env node

import {
  StdioNull,
  SpawnOptionsWithStdioTuple,
  StdioPipe,
  spawn,
} from 'child_process'
import { pipeline } from 'stream/promises'

import es from 'event-stream'
import tapMerge from 'tap-merge'
import yargs from 'yargs'

import { version } from '../package.json'

import { wait } from './wait'

const { argv } = yargs(process.argv.slice(2))
  .version(version)
  .locale('en')
  .option('producer', {
    alias: 'p',
    demandOption: true,
    describe:
      'Executable of TAP stream producer. Could be used more than one time.',
    string: true,
    array: true,
  })
const { producer } = await argv

const spawnOptions: SpawnOptionsWithStdioTuple<
  StdioNull,
  StdioPipe,
  StdioPipe
> = {
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: true,
}
const tasks = producer
  .map(cmd => cmd.split(' '))
  .map(([cmd, ...args]) => spawn(cmd, args, spawnOptions))

try {
  pipeline([
    es.merge(tasks.map(proc => proc.stdout)),
    tapMerge(),
    process.stdout,
  ]).catch(e => {
    console.error('@@ tmerge pipeline error occured.', e)
  })
  await wait(tasks)
} catch (e) {
  console.error('@@ tmerge error occured.', e)
  process.exit(2)
} finally {
  process.exit(0)
}
