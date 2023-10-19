import { ChildProcessByStdio } from 'child_process'
import { Readable } from 'stream'

export type ProcessArray = ChildProcessByStdio<null, Readable, Readable>[]
