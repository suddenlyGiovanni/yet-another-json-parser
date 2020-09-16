<!--
- Who
- What
- When
- Where
- Why
- How
-->

# Yet another JSON parser

The dictionary definition of **parse** is:

1. to divide (a sentence) into grammatical parts and identify the parts and their relations to each other
2. to analyze (a string of characters) in order to associate groups of characters with the syntactic units of the underlying grammar.

Where the grammar is the rule of the parsed language/string.

## What

'_Yet another JSON parser_' is a TypeScript program able to parser text against the [JSON Grammar rule].

- It accepts a string of characters that might or might not contain a valid JSON syntax.
- It runs both lexical and syntactic analysis on the given string.
- It then outputs an abstract representation of the string in the form of an Abstract Syntax Tree (AST).

## Why

I think I managed to create a good mental model of how software and hardware interact with each other in order to produce for a given input a specific output. From afar, everything makes sense; each element has its role and an understandable way to interact with the rest of the system. However, as soon as you get closer, the picture became sharper, new details became visible, noise starts to form, and you start losing track of the contours of said element. And this goes on and on as you keep zooming in on your subject. The closer you look, the more you will find yourself surrounded by this arising complexity, the less the overall system will seem to be coherent.

But sometimes it is necessary to hone in on the detail to understand how said element works toward contributing to the system.

This curiosity led me to question how the code that I write day in day out is understood by the computer and then processed. There is no better way to understand something that trying to build it yourself.

So I set myself to build a language parser. I selected JSON for its simple syntax and grammar. TypeScript as the implementation language for its ability to express intent directly in the type system.

Realizing that "the evaluator, which determines the meaning of expressions in a programming language, is just another program" (Hal Abelson and Gerald Sussman, Structure and Interpretation of Computer Programs) had crazy repercussions on how now I think of a programming language.

There are plenty of open-source parsers out there that do the exact same thing that I'm trying to accomplish and more, but they are all written in Javascript. To name a few:

- [acornjs](https://github.com/acornjs)
- [estree](https://github.com/estree/estree)
- [@babel/parser](https://github.com/babel/babel/tree/main/packages/babel-parser)
- eslint/[espree](https://github.com/eslint/espree)
- jquery/[esprima](https://github.com/jquery/esprima)

## Project Status 🚦

[![codecov](https://codecov.io/gh/suddenlyGiovanni/yet-another-json-parser/branch/master/graph/badge.svg)](https://codecov.io/gh/suddenlyGiovanni/yet-another-json-parser)
[![dependencies Status](https://david-dm.org/suddenlyGiovanni/yet-another-json-parser/status.svg)](https://david-dm.org/suddenlyGiovanni/yet-another-json-parser)
[![devDependencies Status](https://david-dm.org/suddenlyGiovanni/yet-another-json-parser/dev-status.svg)](https://david-dm.org/suddenlyGiovanni/yet-another-json-parser?type=dev)

This project is under active development: 🚧 **WIP** 🚧.

It hasn't reached a stable state yet, therefore **it should not be used** in any way or fashion.

## Project Naming

Yes..., the name of this project is really "yet another json parser"! 🤦‍♂️

The name is a reference to [YACC] (Yet Another Compiler-Compiler). I was introduced to YACC by Professor Brailsford's [video series on compilers](https://www.youtube.com/playlist?list=PLzH6n4zXuckoJaMwuI1fhr5n8cJL18hYd) and [parsers](https://www.youtube.com/watch?v=jzpYiuD2ffo) on Computerphile. I found that name so catchy that I have decided to reference it when naming this project.

Is this project in any other way related to what YACC is about? The short answer is no. But both produce a look-ahead left to right (LALR) bottom-up language parser.

## What is YACC then?

Yacc (Yet Another Compiler-Compiler) is a parser generator. It produces only a parser (phrase analyzer).
It accepts the grammar rules written in C.
It outputs a shift-reduce parser in C that executes the C snippets associated with each rule as soon as a rule is recognized.
To get the full syntactic analysis, an external lexical analyzer is required to perform the first tokenization stage (word analysis), which is then followed by the parsing stage.

<!-- ## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. -->

<!-- ### Prerequisites

What things you need to install the software and how to install them

```
Give examples
``` -->

<!-- ### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo -->

<!-- ## Running the tests

Explain how to run the automated tests for this system -->

<!-- ### And coding style tests

Explain what these tests test and why

```
Give an example
``` -->

<!-- ## Deployment

Add additional notes about how to deploy this on a live system -->

## Built With

- [TypeScript] - Language

## Versioning

We use [SemVer] for versioning. For the versions available, see the [tags on this repository].

## Authors

- **Giovanni Ravalico** - _Initial work_ - [@suddenlyGiovanni]

See also the list of [contributors] who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

<!-- ## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc -->

[yacc]: https://en.wikipedia.org/wiki/Yacc
[contributors]: https://github.com/your/project/contributors
[@suddenlygiovanni]: https://github.com/suddenlyGiovanni
[semver]: http://semver.org/
[tags on this repository]: https://github.com/your/project/tags
[typescript]: https://www.typescriptlang.org
[json-data-syntax]: ./json-data-syntax.md
[json grammar rule]: ./json-data-syntax.md

–
