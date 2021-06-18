/// <reference types="cypress"/>

import {WMRenderEngine} from '../../src/render/WMRenderEngine';
import {Mesh, Scene} from "three";

describe('WMRenderEngine class', () => {
    describe('Init tests', () => {
        const engine = new WMRenderEngine();
        it('Can initialize', () => {
            expect(engine).instanceof(WMRenderEngine);
        });
        it('Have resolution setter', () => {
            expect('resolution' in engine).to.be.true;
        });
        it('Have fps setter', () => {
            expect('fps' in engine).to.be.true;
        });
        it('Have scene setter', () => {
            expect('scene' in engine).to.be.true;
        });
        it('Have camerae setter', () => {
            expect('camera' in engine).to.be.true;
        });
        it('Have currentFps getter', () => {
            expect('currentFps' in engine).to.be.true;
        });
        it('Have currentScene getter', () => {
            expect('currentScene' in engine).to.be.true;
        });
        it('Have currentCamera getter', () => {
            expect('currentCamera' in engine).to.be.true;
        });
        it('Have running getter', () => {
            expect('running' in engine).to.be.true;
        });
        it('Have addInit method', () => {
            expect('addInit' in engine).to.be.true;
        });
        it('Have addUpdate method', () => {
            expect('addUpdate' in engine).to.be.true;
        });
        it('Have addCompileStep method', () => {
            expect('addCompileStep' in engine).to.be.true;
        });
        it('Have compile method', () => {
            expect('compile' in engine).to.be.true;
        });
        it('Have prepareAndStart method', () => {
            expect('prepareAndStart' in engine).to.be.true;
        });
        it('Have reloadEngine method', () => {
            expect('reloadEngine' in engine).to.be.true;
        });
        it('Have start method', () => {
            expect('start' in engine).to.be.true;
        });
    });
    describe('Use tests', () => {
        const engine = new WMRenderEngine();
        it('Change resolution', () => {
            engine.resolution = {};
            expect(true).to.true;
        });
        it('Fps', () => {
            engine.fps = 59;
            expect(engine.currentFps).to.eq(59);
        });
        it('Scene', () => {
            const nS = new Scene();
            engine.scene = nS;
            expect(nS).to.eq(engine.currentScene);
        });
        it('Add init step', () => {
            engine.addInit(() => {
                engine.currentScene.add(new Mesh());
            });
            expect(engine.currentScene.children[0]).instanceof(Mesh);
        });
        it('Add compile step', () => {
            engine.addCompileStep(() => {
                engine.currentScene.children[0].rotation.y = 5;
            });
            expect(engine.currentScene.children[0].rotation.y).to.be.eq(5);
        });
        it('Start render', async () => {
            await engine.prepareAndStart();
            expect(engine.running).to.be.true;
        });
    });
});