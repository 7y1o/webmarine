/// <reference types="cypress"/>
import CRenderEngine from "../../../src/render/CRenderEngine";
import {
    ArrayCamera,
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    OrthographicCamera,
    PerspectiveCamera,
    Scene, SphereGeometry,
    StereoCamera
} from "three";
import {CinematicCamera} from "three/examples/jsm/cameras/CinematicCamera";

describe('CRenderEngine:', function () {
    const render = new CRenderEngine();

    describe('constructor()', function () {
        it('Successfully constructed', () => {
            expect(render).instanceof(CRenderEngine);
        })
        describe('Have all needed functions', function () {
            it('prepareRenderAndStart', () => {
                expect(render.prepareRenderAndStart).not.equal(undefined);
            });
            it('start', () => {
                expect(render.start).not.equal(undefined);
            });
            it('camera', () => {
                expect(render.camera).not.equal(undefined);
            });
            it('running', () => {
                expect(render.running).not.equal(undefined);
            });
            it('scene', () => {
                expect(render.scene).not.equal(undefined);
            });
            it('pushTickStep', () => {
                expect(render.pushTickStep).not.equal(undefined);
            });
            it('switchScene', () => {
                expect(render.switchScene).not.equal(undefined);
            });
            it('switchCamera', () => {
                expect(render.switchCamera).not.equal(undefined);
            });
            it('switch', () => {
                expect(render.switch).not.equal(undefined);
            });
        });
    });

    describe('switchCamera()', function () {
        it('Switch to orthographic camera', function () {
            const orCam = new OrthographicCamera(0, 0, 0, 0);
            render.switchCamera(orCam);
            expect(render.camera).instanceof(OrthographicCamera);
        });
        it('Switch to perspective camera', function () {
            const perCam = new PerspectiveCamera();
            render.switchCamera(perCam);
            expect(render.camera).instanceof(PerspectiveCamera);
        });
        it('Switch to array camera', function () {
            const arrCam = new ArrayCamera();
            render.switchCamera(arrCam);
            expect(render.camera).instanceof(ArrayCamera);
        });
        it('Switch to stereo camera', function () {
            const sterCam = new StereoCamera();
            render.switchCamera(sterCam);
            expect(render.camera).instanceof(StereoCamera);
        });
        it('Switch to cinematic camera', function () {
            const cinCam = new CinematicCamera(43, 1, .1, 1000);
            render.switchCamera(cinCam);
            expect(render.camera).instanceof(CinematicCamera);
        });
    });

    describe('switchScene()', function () {
        it('Switch to new scene with cube', function () {
            const ns = new Scene();
            const cube = new Mesh(
                new BoxGeometry(),
                new MeshBasicMaterial()
            );
            ns.add(cube);
            render.switchScene(ns);
            expect(render.scene.children).includes(cube);
        });
    });

    describe('switch()', function () {
        it('Switch only camera', function () {
            const nc = new StereoCamera();
            render.switch({
                camera: nc
            });
            expect(render.camera).instanceof(StereoCamera);
        });
        it('Switch only scene', function () {
            const ns = new Scene();
            const sphere = new Mesh(
                new SphereGeometry(),
                new MeshBasicMaterial()
            );
            ns.add(sphere);
            render.switch({
                scene: ns
            });
            expect(render.scene.children).includes(sphere);
        });
        it('Switch scene and camera', function () {
            const ns = new Scene();
            const cube = new Mesh(
                new BoxGeometry(),
                new MeshBasicMaterial()
            );
            ns.add(cube);
            const nc = new ArrayCamera();
            render.switch({
                camera: nc
            });
            render.switch({
                camera: nc,
                scene: ns
            });
            expect(render.camera).instanceof(ArrayCamera);
            expect(render.scene.children).includes(cube);
        });
        it('Call switch with empty query', function () {
            const lastCam = render.camera;
            render.switch({});
            expect(render.camera).to.equal(lastCam);
        });
    });

    describe('Getter running', function () {
        it('When not rendering equals false', function () {
            expect(render.running).to.equal(false);
        });
    });

    describe('pushTickStep()', function () {
        it('Don\'t throwing errors', function () {
            expect(render.pushTickStep(dt => {})).to.equal(undefined);
        });
    });
});