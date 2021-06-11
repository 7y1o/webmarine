/// <reference types="cypress"/>

import CLogger, {Logtype} from "../../../src/utils/CLogger";

describe('CLogger', function () {
    it('Info log works properly', function () {
        expect(CLogger.show('Test info output', Logtype.INFO)).to.equal(undefined);
    });
    it('Info log works properly', function () {
        expect(CLogger.show('Test success output', Logtype.SUCCESS)).to.equal(undefined);
    });
    it('Info log works properly', function () {
        expect(CLogger.show('Test warning output', Logtype.WARN)).to.equal(undefined);
    });
    it('Info log works properly', function () {
        expect(CLogger.show('Test error output', Logtype.ERROR)).to.equal(undefined);
    });
});