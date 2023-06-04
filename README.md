# @tap-ogg/tap-merge

TAP producer that can merge TAP streams produced by commands given through CLI.

Re-numbers tests and test plans to remove conficts.
The test plan (e.g. `1..5`) line is emitted last.
It was invented to command line usage.

## Installation

Using NPM:

```
npm i @tap-ogg/tap-merge
```

Using yarn:

```
yarn add @tap-ogg/tap-merge
```

## CLI Options

```
      --help      Show help                                            [boolean]
      --version   Show version number                                  [boolean]
  -p, --producer  Executable of TAP stream producer. Could be used more than one
                   time.                                      [array] [required]
```

### Binary aliases

The first CLI command is `tap-merge` or simply `tmerge`.

Please note that original package [tap-merge](https://www.npmjs.com/package/tap-merge) has the same NPM binary name.
In case of binary name conflict you can use the alternative (and shorter name as well) `tmerge`.

### Examples

It can combine tests written in different technologies.
For example, let's mix javascript ([ava]([ava](https://avajs.dev))) and python ([nose](https://nose.readthedocs.io/en/latest/man.html) with [tappy plugin](https://tappy.readthedocs.io/en/latest/producers.html#nose-tap-plugin)) stacks together:

```
tap-merge --producer "ava --tap" --producer "nosetests --with-tap --tap-stream tap.tests.test_rules"
```

It can be a bit shorter:

```
tmerge -p "ava -t" -p "nosetests --with-tap --tap-stream tap.tests.test_rules"
```
