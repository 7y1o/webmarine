export class ObjectOperations {

    /** Remove keys in second object from first object */
    public static difference(A, B) {
        return Object.keys(A).reduce((final, key) => {
            if(B.hasOwnProperty(key)) return final;
            else return {
                ...final,
                [key]: A[key]
            };
        }, {});
    }

    /** Add two objects */
    public static add(A, B) {
        return Object.assign({}, A, B);
    }
}