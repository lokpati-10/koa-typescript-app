import nconf from 'nconf'

nconf.env().argv()

export function getConfig(name: string) {
    return nconf.get(name)
}