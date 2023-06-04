#!/usr/bin/env bats

CONTEXT=${TEST_BATS_CONTEXT:-dist}

@test "--producer: no producer given" {
  run $CONTEXT/cli.js
  result="$(echo $output | grep 'Missing required argument: producer' | wc -l)"
  [ "$result" -eq 1 ]
  result="$(echo $output | rev | cut -d ' ' -f 1 | rev | tail -n 1 )"
  [ "$result" != "1..200" ]
}
@test "--producer: 1 producer given" {
  run $CONTEXT/cli.js -p 'yarn ava test/passing.test.js --tap'
  result="$(echo $output | grep 'Missing required argument: producer' | wc -l)"
  [ "$result" -eq 0 ]
  result="$(echo $output | rev | cut -d ' ' -f 1 | rev | tail -n 1 )"
  [ "$result" == "1..200" ]
}
@test "--producer: 2 producers given" {
  run $CONTEXT/cli.js -p 'yarn ava test/skipping.test.js --tap' -p 'yarn ava test/passing.test.js --tap'
  result="$(echo $output | grep 'Missing required argument: producer' | wc -l)"
  [ "$result" -eq 0 ]
  result="$(echo $output | rev | cut -d ' ' -f 1 | rev | tail -n 1 )"
  [ "$result" == "1..400" ]
}
