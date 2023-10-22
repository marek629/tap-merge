#!/usr/bin/env node
import {spawn as $bbOqc$spawn} from "child_process";
import $bbOqc$eventstream from "event-stream";
import {pipeline as $bbOqc$pipeline} from "stream/promises";
import $bbOqc$tapmerge from "tap-merge";
import $bbOqc$yargs from "yargs";






var $2f9778488711ed67$exports = {};
$2f9778488711ed67$exports = JSON.parse('{"name":"@tap-ogg/tap-merge","type":"module","version":"1.1.0","main":"dist/cli.js","author":"Marek Jędryka","license":"MIT","private":false,"repository":"github:marek629/tap-merge","files":["CHANGELOG.md","dist/*","src/*"],"engines":{"node":">= 12"},"keywords":["test","testing","tap","cli","stream","merging","merge"],"devDependencies":{"@types/node":"^20.2.3","@types/yargs":"^17.0.24","ava":"^5.3.0","bats":"^1.9.0","c8":"^8.0.0","parcel":"^2.9.1","prettier":"^2.8.8","typescript":"^5.0.4"},"dependencies":{"event-stream":"^4.0.1","tap-merge":"^0.3.1","yargs":"^17.7.2"},"bin":{"tap-merge":"dist/cli.js","tmerge":"dist/cli.js"},"scripts":{"prebuild":"prettier --write src/ test/","build":"parcel build src/cli.ts","postbuild":"chmod +x dist/cli.js","watch":"parcel watch src/cli.ts","pretest":"bash -xe tools/pretest.sh","test":"yarn test:integration","test:integration":"bats test/*.bats --timing --trace --print-output-on-failure","precoverage":"rm -rf coverage","coverage":"c8 --check-coverage --lines 0 --statements 0 --functions 0 --branches 80 yarn test"},"ava":{"files":["!**/(massive|passing|skipping).*"]},"c8":{"all":true,"src":"src","exclude":["**/*.test.js"],"reporter":["html","lcov","text-summary"]}}');


const $5b72dc8ee0edfc81$export$5c069c93d2b7493f = (tasks)=>new Promise((resolve)=>{
        let counter = tasks.length;
        const listener = (...args)=>{
            if (--counter === 0) resolve(tasks);
        };
        tasks.forEach((t)=>{
            t.once("finish", listener);
        });
        // fallback checking tasks
        const intervalId = setInterval(function() {
            if (tasks.every((t)=>t.exitCode !== null)) {
                clearInterval(intervalId);
                resolve(tasks);
            }
        }, 500);
    });


const { argv: $9f8d27642e475326$var$argv  } = (0, $bbOqc$yargs)(process.argv.slice(2)).version((0, $2f9778488711ed67$exports.version)).locale("en").option("producer", {
    alias: "p",
    demandOption: true,
    describe: "Executable of TAP stream producer. Could be used more than one time.",
    string: true,
    array: true
});
const { producer: $9f8d27642e475326$var$producer  } = await $9f8d27642e475326$var$argv;
const $9f8d27642e475326$var$spawnOptions = {
    stdio: [
        "ignore",
        "pipe",
        "pipe"
    ],
    shell: true
};
const $9f8d27642e475326$var$tasks = $9f8d27642e475326$var$producer.map((cmd)=>cmd.split(" ")).map(([cmd, ...args])=>(0, $bbOqc$spawn)(cmd, args, $9f8d27642e475326$var$spawnOptions));
try {
    (0, $bbOqc$pipeline)([
        (0, $bbOqc$eventstream).merge($9f8d27642e475326$var$tasks.map((proc)=>proc.stdout)),
        (0, $bbOqc$tapmerge)(),
        process.stdout
    ]).catch((e)=>{
        console.error("@@ tmerge pipeline error occured.", e);
    });
    await (0, $5b72dc8ee0edfc81$export$5c069c93d2b7493f)($9f8d27642e475326$var$tasks);
} catch (e) {
    console.error("@@ tmerge error occured.", e);
    process.exit(2);
} finally{
    process.exit(0);
}


//# sourceMappingURL=cli.js.map
