#!/usr/bin/env node

import {
  StdioNull,
  SpawnOptionsWithStdioTuple,
  StdioPipe,
  spawn,
} from 'child_process'

import es from 'event-stream'
import { pipeline } from 'stream/promises'
import tapMerge from 'tap-merge'
import yargs from 'yargs'

const { argv } = yargs(process.argv.slice(2)).locale('en').option('producer', {
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
await pipeline([
  es.merge(tasks.map(proc => proc.stdout)),
  tapMerge(),
  process.stdout,
])
process.exit(0)
