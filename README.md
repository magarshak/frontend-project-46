# Diff Tool Project

### Hexlet tests and linter status:
[![Actions Status](https://github.com/magarshak/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/magarshak/frontend-project-46/actions) [![Actions Status](https://github.com/magarshak/frontend-project-46/actions/workflows/node-check.yml/badge.svg)](https://github.com/magarshak/frontend-project-46/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/373d6517bfaea955cdcf/maintainability)](https://codeclimate.com/github/magarshak/frontend-project-46/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/373d6517bfaea955cdcf/test_coverage)](https://codeclimate.com/github/magarshak/frontend-project-46/test_coverage)


## About project
__Diff Tool__ - is a program that compares two files, identifies the differences between them, and displays them to the user. It supports the following file formats: JSON, YAML and YML.

## How to install
Before you start, make sure that:
1. You are using a development-friendly operating system (e.g. Ubuntu, macOS). For Windows owners, I recommend that you set up a Windows Subsystem for Linux (WSL).
2. You know how to start a terminal and can execute commands in it.

If you understand what is written above, you need to execute the following commands:
```sh
$ git clone git@github.com:magarshak/frontend-project-46.git
$ cd frontend-project-46/
$ make install
$ npm link
```
## Usage
```sh
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (choices: "stylish", "plain", "json")
  -h, --help           display help for command
```
## Examples
### Comparison of flat files
#### JSON 
The diff is based on how the files have changed relative to each other, the keys are displayed in alphabetical order.
```sh
gendiff file1.json file2.json

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```
The absence of a plus or minus indicates that the key is in both files and its values are the same. In all other situations, the value of the key is either different, or the key is in only one file. In the example above, the timeout key is in both files but has different values, proxy is only in file1 and verbose is only in file2.

[![asciicast](https://asciinema.org/a/OYCUDNPCjATTZuaffNV6X5EJn.svg)](https://asciinema.org/a/OYCUDNPCjATTZuaffNV6X5EJn)

#### YAML/YML
Similar to the previous one, we now compare flat YAML/YML files.

[![asciicast](https://asciinema.org/a/rEYrGOPgspzaSa7lKtvdfA9ap.svg)](https://asciinema.org/a/rEYrGOPgspzaSa7lKtvdfA9ap)


### Comparison files with nested structures
Diff Tool can be used to compare files with nested structure.
```sh
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
```
For integration with other systems or simply for ease of perception, the diff between files can also be displayed in different ways in different output formats.
For this cases you can use option `-f, --format [type]`

#### Stylish format
The default format. If the user does not specify a particular output format, the result is printed in stylish format.

```sh
gendiff --format stylish file1.json file2.json

{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`
```

[![asciicast](https://asciinema.org/a/5xuUrUS7ZOCtp9dgmN4GV4RtO.svg)](https://asciinema.org/a/5xuUrUS7ZOCtp9dgmN4GV4RtO)

#### Plain format
```sh
gendiff --format plain file1.json file2.json

Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

[![asciicast](https://asciinema.org/a/NVgZUFvZ9ULXaRnKBEqN6TEso.svg)](https://asciinema.org/a/NVgZUFvZ9ULXaRnKBEqN6TEso)

#### JSON format
```sh
gendiff --format json file1.json file2.json

{"type":"root","children":[{"type":"nested","key":"common","children":[{"type":"added","key":"follow","value":false},{"type":"unchanged","key":"setting1","value":"Value 1"},{"type":"removed","key":"setting2","value":200},{"type":"changed","key":"setting3","oldValue":true,"newValue":null},{"type":"added","key":"setting4","value":"blah blah"},{"type":"added","key":"setting5","value":{"key5":"value5"}},{"type":"nested","key":"setting6","children":[{"type":"nested","key":"doge","children":[{"type":"changed","key":"wow","oldValue":"","newValue":"so much"}]},{"type":"unchanged","key":"key","value":"value"},{"type":"added","key":"ops","value":"vops"}]}]},{"type":"nested","key":"group1","children":[{"type":"changed","key":"baz","oldValue":"bas","newValue":"bars"},{"type":"unchanged","key":"foo","value":"bar"},{"type":"changed","key":"nest","oldValue":{"key":"value"},"newValue":"str"}]},{"type":"removed","key":"group2","value":{"abc":12345,"deep":{"id":45}}},{"type":"added","key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500}}]}
```
[![asciicast](https://asciinema.org/a/T59hGKUScsVI5tS6toq0yYAQs.svg)](https://asciinema.org/a/T59hGKUScsVI5tS6toq0yYAQs)