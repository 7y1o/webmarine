import chalk from "chalk";

/** Logging util */
export default class CLogger {
    public static show(message: string, type: Logtype) {
        switch (type) {
            case Logtype.INFO: {
                console.log(`${head} ${chalk.blueBright('INFO')}: ${message}`);
                break;
            }
            case Logtype.SUCCESS: {
                console.log(`${head} ${chalk.green('SUCCESS')}: ${message}`);
                break;
            }
            case Logtype.WARN: {
                console.log(`${head} ${chalk.yellow('WARN')}: ${message}`);
                break;
            }
            case Logtype.ERROR: {
                console.log(`${head} ${chalk.red('ERROR')}: ${message}`);
                break;
            }
        }
    }
}

export enum Logtype {
    INFO,
    SUCCESS,
    WARN,
    ERROR
}

const head: string = chalk.blue('[WMC]');