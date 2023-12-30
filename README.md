# Advent of Code 2023

With Typescript and Remeda, trying FP style as much as I can. My sample and input data in `fixtures`, bring your own by building and overwriting `build/fixtures` directory.

## Run exercise N

Transpile on the fly, hot-reloading:

`npm run dev -- <n>`

Some exercises require TS compilation first (like 5, because of worker pool), so build first:

`npm run build`

And then run JS exercise:

`npm start -- <1..25>`
