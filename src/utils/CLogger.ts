/** Logging util */
class CLogger {
    public static show(message: string, type: Logtype) {
        switch (type) {
            case Logtype.INFO: {
                console.log(`${head} INFO: ${message}`);
                break;
            }
            case Logtype.SUCCESS: {
                console.log(`${head} SUCCESS: ${message}`);
                break;
            }
            case Logtype.WARN: {
                console.log(`${head} WARN: ${message}`);
                break;
            }
            case Logtype.ERROR: {
                console.log(`${head} ERROR: ${message}`);
                break;
            }
        }
    }
}

/** Logger types for displaying context messages */
export enum Logtype {
    INFO,
    SUCCESS,
    WARN,
    ERROR
}

// Log heading part
const head: string = '[WMC]';

export default CLogger;